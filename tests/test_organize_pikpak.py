"""PikPak 直连整理：目录证据、提交状态映射、路径边界与通道装配。"""
import unittest
from pathlib import PureWindowsPath
from types import SimpleNamespace
from unittest.mock import Mock, patch

from peach.downloads import DownloadError
from peach.organize_clouddrive import ACCEPTED, REJECTED, PikPakDav, PikPakPaths
from peach.push_discovery import CloudPrefix
from peach import organize_pikpak

MAPPING = PikPakPaths('P:\\Library', '/Movies')


class FakeClient:
    """树里的每个节点是 PikPak 文件条目（`id`/`name`/`kind`/`size`）。"""

    def __init__(self, tree):
        self.tree = tree
        self.calls = []

    def _children(self, parent_id):
        self.calls.append(('children', parent_id))
        return list(self.tree.get(parent_id, ()))

    def rename_file(self, file_id, name):
        self.calls.append(('rename', file_id, name))
        return {}

    def batch_move(self, ids, to_parent_id):
        self.calls.append(('move', tuple(ids), to_parent_id))
        return {}

    def create_folder(self, parent_id, name):
        self.calls.append(('mkdir', parent_id, name))
        return {'id': 'created'}


def tree():
    return {
        '': [{'id': 'f-movies', 'name': 'Movies', 'kind': 'drive#folder', 'size': 0}],
        'f-movies': [
            {'id': 'f-old', 'name': 'old', 'kind': 'drive#folder', 'size': 0},
            {'id': 'f-new', 'name': 'new', 'kind': 'drive#folder', 'size': 0},
            {'id': 'x-cover', 'name': 'cover.jpg', 'kind': 'drive#file', 'size': '12'}],
        'f-old': [{'id': 'x-film', 'name': 'film.mp4', 'kind': 'drive#file', 'size': '20'}],
        'f-new': [],
    }


class Listing(unittest.TestCase):
    def test_media_root_children_carry_ids_for_submission(self):
        rows = organize_pikpak._api_listing(FakeClient(tree()), 'P:\\Library', MAPPING)
        self.assertEqual(rows, [
            dict(path='P:\\Library\\old', size=0, directory=True, id='f-old'),
            dict(path='P:\\Library\\new', size=0, directory=True, id='f-new'),
            dict(path='P:\\Library\\cover.jpg', size=12, directory=False, id='x-cover')])

    def test_nested_listing_walks_the_ancestor_chain(self):
        rows = organize_pikpak._api_listing(FakeClient(tree()), 'P:\\Library\\old', MAPPING)
        self.assertEqual(rows, [dict(path='P:\\Library\\old\\film.mp4', size=20, directory=False, id='x-film')])

    def test_multisegment_remote_resolves_the_media_root_folder(self):
        client = FakeClient({
            '': [{'id': 'f-account', 'name': 'My cloud', 'kind': 'drive#folder', 'size': 0}],
            'f-account': [{'id': 'f-movies', 'name': 'Movies', 'kind': 'drive#folder', 'size': 0}],
            'f-movies': [{'id': 'x-a', 'name': 'a.mp4', 'kind': 'drive#file', 'size': 1}]})
        mapping = PikPakPaths('P:\\Library', '/My cloud/Movies')
        rows = organize_pikpak._api_listing(client, 'P:\\Library', mapping)
        self.assertEqual(rows, [dict(path='P:\\Library\\a.mp4', size=1, directory=False, id='x-a')])

    def test_invalid_member_names_sizes_and_duplicates_are_rejected(self):
        for item in ({'id': 'x', 'name': 'a/b', 'kind': 'drive#file'},
                     {'id': 'x', 'name': 'a:b', 'kind': 'drive#file'},
                     {'id': 'x', 'name': '..', 'kind': 'drive#file'},
                     {'id': 'x', 'name': 'a\x00b', 'kind': 'drive#file'},
                     {'id': 'x', 'name': '', 'kind': 'drive#file'},
                     {'id': 'x', 'name': 'a.mp4', 'kind': 'drive#file', 'size': 'oops'},
                     {'id': 'x', 'name': 'a.mp4', 'kind': 'drive#file', 'size': '-1'},
                     {'id': '', 'name': 'a.mp4', 'kind': 'drive#file'}):
            with self.subTest(item=item), self.assertRaises(ValueError):
                organize_pikpak._api_listing(
                    FakeClient({'': [{'id': 'f', 'name': 'Movies', 'kind': 'drive#folder'}],
                                'f': [item]}), 'P:\\Library', MAPPING)
        with self.assertRaises(ValueError):
            organize_pikpak._api_listing(
                FakeClient({'': [{'id': 'f', 'name': 'Movies', 'kind': 'drive#folder'}],
                            'f': [{'id': 'a', 'name': 'x.mp4', 'kind': 'drive#file'},
                                  {'id': 'b', 'name': 'X.MP4', 'kind': 'drive#file'}]}),
                'P:\\Library', MAPPING)

    def test_missing_directory_and_depth_budget(self):
        with self.assertRaises(FileNotFoundError):
            organize_pikpak._api_listing(FakeClient({'': []}), 'P:\\Library', MAPPING)
        with self.assertRaises(FileNotFoundError):
            organize_pikpak._api_listing(FakeClient(tree()), 'P:\\Library\\absent', MAPPING)
        deep = 'P:\\Library' + ''.join(f'\\d{i}' for i in range(33))
        with self.assertRaises(ValueError):
            organize_pikpak._api_listing(FakeClient(tree()), deep, MAPPING)


class Submissions(unittest.TestCase):
    def setUp(self):
        self.client = FakeClient(tree())

    def test_rename_is_same_parent_only_and_maps_status(self):
        for source, target in (('P:\\Library\\old\\film.mp4', 'P:\\Library\\new\\film.mp4'),
                               ('P:\\Library\\old\\film.mp4', 'P:\\Library')):
            with self.subTest(target=target), self.assertRaises(ValueError):
                organize_pikpak._rename_remote(self.client, source, target, MAPPING)
        self.assertEqual(organize_pikpak._rename_remote(
            self.client, 'P:\\Library\\old\\film.mp4', 'P:\\Library\\old\\title.mp4', MAPPING), ACCEPTED)
        self.assertEqual(self.client.calls, [('children', ''), ('children', 'f-movies'),
                                             ('children', 'f-old'), ('rename', 'x-film', 'title.mp4')])

    def test_rename_maps_deterministic_rejection_and_missing_answer(self):
        for failure, expected in (('rejected', REJECTED), ('invalid_link', REJECTED),
                                  ('quota', REJECTED), ('network', None), ('config', None)):
            client = Mock()
            client._children.side_effect = lambda parent_id: list(tree().get(parent_id, ()))
            client.rename_file.side_effect = DownloadError(failure, 'refused')
            with self.subTest(failure=failure):
                self.assertEqual(organize_pikpak._rename_remote(
                    client, 'P:\\Library\\old\\film.mp4', 'P:\\Library\\old\\title.mp4', MAPPING), expected)

    def test_move_keeps_name_changes_parent_and_maps_status(self):
        for source, target in (('P:\\Library\\old\\film.mp4', 'P:\\Library\\new\\title.mp4'),
                               ('P:\\Library\\old\\film.mp4', 'P:\\Library\\old\\film.mp4'),
                               ('P:\\Library\\old\\film.mp4', 'P:\\Library')):
            with self.subTest(target=target), self.assertRaises(ValueError):
                organize_pikpak._move_remote(self.client, source, target, MAPPING)
        self.assertEqual(organize_pikpak._move_remote(
            self.client, 'P:\\Library\\old\\film.mp4', 'P:\\Library\\new\\film.mp4', MAPPING), ACCEPTED)
        self.assertIn(('move', ('x-film',), 'f-new'), self.client.calls)

    def test_move_maps_deterministic_rejection_and_missing_answer(self):
        for failure, expected in (('rejected', REJECTED), ('network', None), ('config', None)):
            client = Mock()
            client._children.side_effect = lambda parent_id: list(tree().get(parent_id, ()))
            client.batch_move.side_effect = DownloadError(failure, 'refused')
            with self.subTest(failure=failure):
                self.assertEqual(organize_pikpak._move_remote(
                    client, 'P:\\Library\\old\\film.mp4', 'P:\\Library\\new\\film.mp4', MAPPING), expected)

    def test_mkdir_resolves_parent_and_reports_os_error(self):
        organize_pikpak._mkdir(self.client, MAPPING, 'P:\\Library\\sub')
        organize_pikpak._mkdir(self.client, MAPPING, 'P:\\Library\\old\\sub')
        self.assertEqual([call for call in self.client.calls if call[0] == 'mkdir'],
                         [('mkdir', 'f-movies', 'sub'), ('mkdir', 'f-old', 'sub')])
        client = Mock()
        client._children.return_value = [{'id': 'f-movies', 'name': 'Movies', 'kind': 'drive#folder'}]
        client.create_folder.side_effect = DownloadError('network', 'offline')
        with self.assertRaises(OSError):
            organize_pikpak._mkdir(client, MAPPING, 'P:\\Library\\sub')


class MkdirInjection(unittest.TestCase):
    def test_ensure_parent_uses_the_injected_mkdir(self):
        mkdir = Mock()
        dav = PikPakDav(None, MAPPING, Mock(), listing=Mock(return_value=[]), rename=Mock(),
                        move_remote=Mock(), mkdir=mkdir)
        dav.ensure_parent('P:\\Library\\a\\b\\c.mp4')
        self.assertEqual([call.args[0] for call in mkdir.call_args_list],
                         ['P:\\Library\\a', 'P:\\Library\\a\\b'])


class Channel(unittest.TestCase):
    def test_requires_pikpak_login(self):
        with patch.object(organize_pikpak, 'PushDiscoverySettings') as settings, \
                patch.object(organize_pikpak, 'CredentialStore') as credentials:
            settings.return_value.load.return_value = SimpleNamespace(prefixes=(
                CloudPrefix('/Movies', 'P:\\Library'),))
            credentials.return_value.load.return_value = None
            with self.assertRaises(ValueError):
                with organize_pikpak.pikpak_renames('P:\\Library\\a.mp4', {'pikpak': ('P:\\Library',)}):
                    pass

    def test_direct_transport_is_wired_and_registered(self):
        roots = {'pikpak': ('P:\\Library',)}
        with patch.object(organize_pikpak, 'PushDiscoverySettings') as settings, \
                patch.object(organize_pikpak, 'CredentialStore') as credentials, \
                patch.object(organize_pikpak, 'PikPakClient') as client_class, \
                patch.object(organize_pikpak.organize, 'verified_renames') as verified:
            settings.return_value.load.return_value = SimpleNamespace(prefixes=(
                SimpleNamespace(root='P:\\Library', prefix='/Movies'),))
            credentials.return_value.load.return_value = SimpleNamespace(
                values={'refresh_token': 'r', 'access_token': 'a'})
            client = FakeClient(tree())
            client_class.return_value.__enter__.return_value = client
            with organize_pikpak.pikpak_renames('P:\\Library\\cover.jpg', roots) as dav:
                verified.assert_called_once()
                self.assertEqual(verified.call_args.args[0], 'pikpak')
                self.assertEqual(verified.call_args.args[1], dav.move)
                self.assertEqual(organize_pikpak._rename_remote(
                    client, 'P:\\Library\\old\\film.mp4', 'P:\\Library\\old\\title.mp4', dav.mapping),
                    ACCEPTED)
            self.assertTrue(any(call[0] == 'rename' for call in client.calls))
            self.assertEqual(client_class.call_args.args[0]['refresh_token'], 'r')


if __name__ == '__main__':
    unittest.main()
