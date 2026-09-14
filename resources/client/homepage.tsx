import {Component as LandingPage} from '@app/landing-page/landing-page';
import {WebPlayerLayout} from '@app/web-player/layout/web-player-layout';
import {useSettingsPreviewMode} from '@common/admin/settings/preview/use-settings-preview-mode';
import {AuthRoute} from '@common/auth/guards/auth-route';

export function Component() {
  const {isInsideSettingsPreview, settingsEditorParams} =
    useSettingsPreviewMode();

  // admin settings builder still needs to be able to preview the marketing
  // landing page template, even though it's no longer used as the live homepage
  if (
    isInsideSettingsPreview &&
    settingsEditorParams.forceHomepage === 'landing'
  ) {
    return <LandingPage />;
  }

  return (
    <AuthRoute requireLogin={false} permission="music.view">
      <WebPlayerLayout />
    </AuthRoute>
  );
}
