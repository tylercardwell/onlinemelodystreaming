import {LocaleSwitcher} from '@common/locale-switcher/locale-switcher';
import {useCustomMenu} from '@common/menus/use-custom-menu';
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import {Trans} from '@ui/i18n/trans';
import {useSettings} from '@ui/settings/use-settings';
import clsx from 'clsx';
import {UnstyledCustomMenuItem} from '../../menus/custom-menu';

interface Props {
  className?: string;
  padding?: string;
}

export function Footer({className, padding}: Props) {
  const year = new Date().getFullYear();
  const {branding} = useSettings();
  return (
    <footer
      className={clsx(
        'text-sm',
        padding ? padding : 'pt-13.5 pb-7 md:pb-13.5',
        className,
      )}
    >
      <Menus />
      <div className="text-muted-foreground items-center justify-between gap-7.5 text-center md:flex md:text-left">
        <Trans
          message="Copyright © :year :name, All Rights Reserved"
          values={{year, name: branding.site_name}}
        />
        <div>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}

function Menus() {
  const primaryMenu = useCustomMenu('footer');
  const secondaryMenu = useCustomMenu('footer-secondary');

  if (!primaryMenu && !secondaryMenu) return null;

  return (
    <div className="mb-3.5 items-center justify-between gap-7.5 overflow-x-auto border-b pb-3.5 md:flex">
      {primaryMenu && (
        <div className="text-primary flex items-center gap-3">
          {primaryMenu.items.map(item => (
            <UnstyledCustomMenuItem
              key={item.id}
              item={item}
              className="hover:underline"
            />
          ))}
        </div>
      )}
      {secondaryMenu && (
        <div className="text-muted-foreground flex items-center gap-5 [&_svg:not([class*='size-'])]:size-4">
          {secondaryMenu.items.map(item => {
            const icon =
              typeof item.icon === 'string' ? (
                <SocialIcon icon={item.icon} />
              ) : null;
            return (
              <UnstyledCustomMenuItem key={item.id} item={item} icon={icon} />
            );
          })}
        </div>
      )}
    </div>
  );
}

function SocialIcon({icon}: {icon: string}) {
  switch (icon) {
    case 'facebook':
      return <SiFacebook />;
    case 'twitter':
      return <SiX />;
    case 'instagram':
      return <SiInstagram />;
    case 'youtube':
      return <SiYoutube />;
    default:
      return null;
  }
}
