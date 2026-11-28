/* 「网络与访问」分组：本机端口、Peach 代理、访问密码与已登录的设备、访问口令、HTTPS 证书、公网入口。 */
import { useState, type FormEvent } from 'react';

import { SettingsRow } from '@/components/application/settings/settings-rows';
import { Button } from '@/components/base/buttons/button';

import { apiSend } from '../../api';
import { serverLabel } from '../../core/server-text';
import type { ConfigurationGroupProps, PeachProxyState } from '../bundle';
import { Note } from '../components/note';
import { AccessSettings } from './access-settings';
import { ApiTokenSettings } from './api-token-settings';
import { CertificateTrust } from './certificate-trust';
import { ConfigurationContents } from './configuration-contents';
import { DeviceSessions } from './device-sessions';
import { PortSettings } from './port-settings';
import { ProxyAddressField, ProxyModeSelect } from './peach-proxy-fields';
import { TunnelSettings } from './tunnel-settings';
import { ErrorText, Footer, Rows, Section, Stack } from './section';
import { busyProps, useAction } from './use-action';
import { t } from '../../i18n';
import { useFieldValidation } from './field-validation';

export function NetworkSettings({ data, receipt, issues }: ConfigurationGroupProps) {
  /* 远程访问要求先设访问密码：访问方式跟着密码卡的保存结果走，关掉密码时服务端也会顺手停掉隧道。 */
  const [access, setAccess] = useState(data.access);
  const tunnelBlocked = access?.mode === 'open' || access?.mode === 'locked';
  return (
    <>
      {issues}
      <ConfigurationContents entries={[
        (Boolean(data.network) || (data.editable && data.port_editable !== false && !data.section_errors?.media_sources))
          && { id: 'network-addresses', label: t('settings:accessUrls.title'), content: <PortSettings data={data} receipt={receipt} /> },
        data.access && { id: 'network-access', label: t('settings:accessPassword.title'),
          content: <AccessSettings initial={data.access} receipt={receipt} onSaved={setAccess} /> },
        access && (access.mode === 'password' || access.mode === 'legacy')
          && { id: 'network-devices', label: t('settings:signedInDevices.title'),
            content: <DeviceSessions revision={access.revision} receipt={receipt} /> },
        access && data.api_token && { id: 'network-api-token', label: t('settings:accessToken.title'),
          content: <ApiTokenSettings initial={data.api_token} mode={access.mode} receipt={receipt} /> },
        data.certificate && { id: 'network-certificate', label: t('settings:certificateTrust.title'), content: <CertificateTrust initial={data.certificate} /> },
        data.tunnel && { id: 'network-tunnel', label: t('settings:remoteAccess.title'),
          content: <TunnelSettings revision={data.revision} initial={data.tunnel} receipt={receipt} blocked={tunnelBlocked} /> },
        data.peach_proxy && { id: 'peachProxy', label: t('settings:peachProxy.title'), content: <PeachProxy initial={data.peach_proxy} receipt={receipt} /> },
      ]} />
    </>
  );
}

export function PeachProxy({ initial, receipt }: { initial: PeachProxyState; receipt(message: string): void }) {
  const [saved, setSaved] = useState(initial);
  const [mode, setMode] = useState(initial.mode);
  const [address, setAddress] = useState('');
  const action = useAction();
  const validation = useFieldValidation<'peachProxyAddress'>();
  const addressError = () => {
    if (mode !== 'proxy' || (!address && saved.proxy_saved)) return '';
    const value = address.trim();
    const authority = /^(?:https?|socks5h?):\/\/([^/?#\s]+)\/?$/i.exec(value)?.[1];
    if (authority && /:\d+$/.test(authority)) {
      try {
        if (new URL(value).hostname && Number(authority.split(':').at(-1)) > 0) return '';
      } catch { /* 地址或端口无法解析。 */ }
    }
    return serverLabel('errors.peachProxy.addressInvalid', '');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validation.check(event.currentTarget, { peachProxyAddress: addressError() })) return;
    void action.run('save', (signal) => apiSend<PeachProxyState>('/api/configuration/peach-proxy', { mode, proxy: address }, 'POST', signal),
      (next) => { setSaved(next); setAddress(''); receipt(t('settings:shared.settingsSaved')); });
  };

  return (
    <Section guide="proxy" title={t('settings:peachProxy.title')} onSubmit={submit}>
      <Rows>
        <SettingsRow label={t('settings:peachProxy.mode')} description={t('settings:peachProxy.modeHelp')}>
          <ProxyModeSelect mode={mode} onChange={value => { setMode(value); validation.clear(); }} />
        </SettingsRow>
      </Rows>
      {mode === 'proxy' || saved.needs_selection || action.error ? (
        <Stack divided>
          {mode === 'proxy'
            ? <ProxyAddressField id="peachProxyAddress" value={address} saved={saved.proxy_saved}
                error={validation.errors.peachProxyAddress}
                onBlur={() => { if (address) validation.update('peachProxyAddress', addressError()); }}
                onChange={value => { setAddress(value); validation.update('peachProxyAddress'); }} />
            : null}
          {saved.needs_selection ? <Note tone="warning" title={t('settings:peachProxy.chooseMode')}>{t('settings:peachProxy.modeConflict')}</Note> : null}
          {action.error ? <ErrorText>{action.error}</ErrorText> : null}
        </Stack>
      ) : null}
      <Footer>
        <Button type="submit" {...busyProps(action.busy === 'save')}>{t('settings:shared.saveSettings')}</Button>
      </Footer>
    </Section>
  );
}
