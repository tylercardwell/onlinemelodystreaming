import {
  ChannelSectionSettings,
  RollingChannelSectionSettings,
} from '@app/admin/settings/landing-page-settings/channel-section-settings';
import {KineticGallerySettings} from '@app/admin/settings/landing-page-settings/kinetic-gallery-settings';
import {CatalogCtaSettings, DiscoveryBenefitsSettings, DiscoveryHeroSettings, EditorialDiscoverySettings} from '@app/admin/settings/landing-page-settings/music-discovery-settings';
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
    'discovery-hero': {
      label: <Trans message="Discovery hero" />,
      component: DiscoveryHeroSettings,
    },
    'editorial-discovery': {
      label: <Trans message="Editorial discovery" />,
      component: EditorialDiscoverySettings,
    },
    'discovery-benefits': {
      label: <Trans message="Discovery benefits" />,
      component: DiscoveryBenefitsSettings,
    },
    'catalog-cta': {
      label: <Trans message="Catalog call to action" />,
      component: CatalogCtaSettings,
    },
    'catalog-rail': {
      label: <Trans message="Catalog rail" />,
      component: RollingChannelSectionSettings,
    },
    'catalog-grid': {
      label: <Trans message="Catalog grid" />,
      component: ChannelSectionSettings,
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
