import {ConfigIconWithBg} from '@common/ui/landing-page/config-icon';
import {Trans} from '@ui/i18n/trans';
import {IconTree} from '@ui/icons/create-svg-icon';
import {cn} from '@ui/utils/cn';

export type FeaturesGridConfig = {
  name: 'features-grid';
  title?: string;
  badge?: string;
  description?: string;
  maxColumns?: number;
  iconsOnTop?: boolean;
  mutedBg?: boolean;
  features?: {
    title: string;
    description: string;
    icon?: string | IconTree[];
  }[];
};

type FeaturesGridProps = {
  config: FeaturesGridConfig;
};
export default function FeaturesGrid({config}: FeaturesGridProps) {
  return (
    <div
      className={cn(
        'py-24 sm:py-32',
        config.mutedBg && 'bg-muted/55 dark:bg-card',
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {config.badge ? (
            <p className="text-base/7 font-semibold text-primary">
              <Trans message={config.badge} />
            </p>
          ) : null}
          {config.title ? (
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-pretty text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              <Trans message={config.title} />
            </h2>
          ) : null}
          {config.description ? (
            <p className="mt-5 text-lg/8 text-muted-foreground">
              <Trans message={config.description} />
            </p>
          ) : null}
        </div>
        <div
          className={cn(
            'mx-auto mt-14 sm:mt-18 lg:mt-20',
            `${config.maxColumns}` === '2' && 'max-w-2xl lg:max-w-4xl',
          )}
        >
          <dl
            className={cn(
              'mx-auto grid max-w-xl grid-cols-1 gap-4 sm:max-w-none sm:grid-cols-2 lg:gap-5',
              getColumnsClassName(config.maxColumns),
            )}
          >
            {config.features?.map((feature, index) => (
              <div
                key={feature.title}
                className={cn(
                  'group flex min-h-52 gap-x-6 gap-y-4 rounded-2xl border border-border/70 bg-background/70 p-6 shadow-sm shadow-primary/5 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:p-7',
                  config.iconsOnTop && 'flex-col items-center text-center',
                  index === 0 && `${config.maxColumns}` === '3' && 'sm:col-span-2 lg:col-span-3 lg:min-h-48 lg:flex-row lg:items-center lg:text-left',
                )}
              >
                {feature.icon ? <ConfigIconWithBg icon={feature.icon} /> : null}
                <div
                  className={cn(
                    'flex-auto',
                  config.iconsOnTop && 'text-center',
                  )}
                >
                  <dt className="text-lg/7 font-semibold tracking-[-0.02em] text-foreground">
                    <Trans message={feature.title} />
                  </dt>
                  <dd className="mt-2 text-base/7 text-muted-foreground">
                    <Trans message={feature.description} />
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function getColumnsClassName(maxColumns?: number | string): string {
  switch (`${maxColumns}`) {
    case '4':
      return 'lg:grid-cols-4';
    case '3':
      return 'lg:grid-cols-3';
    default:
      return 'lg:grid-cols-2'; // default to 2 columns
  }
}
