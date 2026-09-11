import {
  ChannelSectionSettings,
  RollingChannelSectionSettings,
} from '@app/admin/settings/landing-page-settings/channel-section-settings';
import {KineticGallerySettings} from '@app/admin/settings/landing-page-settings/kinetic-gallery-settings';
import {Component as CommonLandingPageSettings} from '@common/admin/settings/landing-page-settings/landing-page-settings';
import {
  LandingPageSettingsContext,
  LandingPageSettingsContextValue,
} from '@common/admin/settings/landing-page-settings/landing-page-settings-context';
import {FormSwitch} from '@ui/forms/toggle/switch';
import {Trans} from '@ui/i18n/trans';

const contextValue: LandingPageSettingsContextValue = {
  customSections: {
    channel: {
      label: <Trans message="Channel" />,
      component: ChannelSectionSettings,
    },
    'rolling-channel': {
      label: <Trans message="Rolling channel" />,
      component: RollingChannelSectionSettings,
    },
    'kinetic-gallery': {
      label: <Trans message="Kinetic gallery" />,
      component: KineticGallerySettings,
    },
  },
  heroSettings: HeroSettings,
};

export function Component() {
  return (
    <LandingPageSettingsContext.Provider value={contextValue}>
      <CommonLandingPageSettings />
    </LandingPageSettingsContext.Provider>
  );
}

type HeroSettingsProps = {
  formPrefix: string;
};
function HeroSettings({formPrefix}: HeroSettingsProps) {
  return (
    <div className="mt-3">
      <FormSwitch name={`${formPrefix}.showSearchBarSlot`}>
        <Trans message="Show search bar" />
      </FormSwitch>
    </div>
  );
}
