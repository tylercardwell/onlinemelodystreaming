import {
  loginOptions,
  LoginPayload,
  LoginResponse,
} from '@common/auth/auth-queries';
import {useMutation} from '@tanstack/react-query';
import {
  getBootstrapData,
  setBootstrapData,
} from '@ui/bootstrap-data/bootstrap-data-store';
import {useCallback} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '../../http/errors/on-form-query-error';
import {useNavigate} from '../../ui/navigation/use-navigate';
import {useAuth} from '../use-auth';

export function useLogin(form: UseFormReturn<LoginPayload>) {
  const handleSuccess = useHandleLoginSuccess();
  return useMutation({
    ...loginOptions(),
    onSuccess: response => {
      if (!response.two_factor) {
        handleSuccess(response as LoginResponse);
      }
    },
    onError: r => onFormQueryError(r, form),
  });
}

export function useHandleLoginSuccess() {
  const navigate = useNavigate();
  const {getRedirectUri} = useAuth();

  return useCallback(
    (response: LoginResponse) => {
      let redirectUri = response.url?.intended ?? getRedirectUri();
      if (redirectUri.includes('/oauth/')) {
        window.location.href = redirectUri;
      } else {
        // A normal document request always contains bootstrap data. Do not
        // replace the currently valid store with an incomplete login response,
        // otherwise providers that depend on settings will crash after login.
        if (!hasSettingsBootstrapData(response.bootstrapData)) {
          window.location.assign(redirectUri);
          return;
        }
        setBootstrapData(response.bootstrapData);
        // get redirect uri after setting bootstrap data so it includes the new url from bootstrap data
        redirectUri = response.url?.intended ?? getRedirectUri();
        const relativeRedirectUri = redirectUri.replace(
          getBootstrapData().settings.base_url,
          '',
        );
        navigate(relativeRedirectUri, {replace: true});
      }
    },
    [navigate, getRedirectUri],
  );
}

function hasSettingsBootstrapData(data: unknown): data is string {
  if (typeof data !== 'string') {
    return false;
  }

  try {
    const decoded = JSON.parse(data);
    return Boolean(decoded && typeof decoded === 'object' && decoded.settings);
  } catch {
    return false;
  }
}
