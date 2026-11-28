import tempfile
import unittest
from pathlib import Path

from peach import desktop_alerts


class DesktopAlertsTests(unittest.TestCase):
    def test_fault_is_reported_once_per_continuous_episode(self):
        now = 0.0
        monitor = desktop_alerts.FaultMonitor(clock=lambda: now)
        self.assertEqual(monitor.observe({"service"}, allowed=True), ())
        now = desktop_alerts.FAULT_DELAY
        self.assertEqual(monitor.observe({"service"}, allowed=True), ("service",))
        self.assertEqual(monitor.observe({"service"}, allowed=True), ())
        self.assertEqual(monitor.observe(set(), allowed=True), ())
        self.assertEqual(monitor.observe({"service"}, allowed=True), ())
        now += desktop_alerts.FAULT_DELAY
        self.assertEqual(monitor.observe({"service"}, allowed=True), ("service",))

    def test_startup_warning_consumes_current_faults(self):
        monitor = desktop_alerts.FaultMonitor()
        monitor.remember({"service", "database"})
        self.assertEqual(monitor.observe({"service", "database"}, allowed=True), ())
        self.assertEqual(monitor.observe({"mounts"}, allowed=False), ())

    def test_desktop_preference_round_trip(self):
        with tempfile.TemporaryDirectory() as directory:
            state = Path(directory)
            self.assertTrue(desktop_alerts.enabled(state))
            desktop_alerts.save(state, False)
            self.assertFalse(desktop_alerts.enabled(state))
            desktop_alerts.save(state, True)
            self.assertTrue(desktop_alerts.enabled(state))
