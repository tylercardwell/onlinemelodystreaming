import {Buttons} from '@common/ui/landing-page/hero/shared';
import {
  LandingPageButtonConfig,
  LandingPageImageConfig,
} from '@common/ui/landing-page/landing-page-config';
import {Trans} from '@ui/i18n/trans';
import {cn} from '@ui/utils/cn';

export type KineticGalleryConfig = {
  name: 'kinetic-gallery';
  eyebrow?: string;
  title?: string;
  description?: string;
  buttons?: LandingPageButtonConfig[];
  cards?: KineticGalleryCard[];
};

type KineticGalleryCard = {
  title?: string;
  image?: LandingPageImageConfig;
};

export function KineticGallerySection({config}: {config: KineticGalleryConfig}) {
  const cards = config.cards?.filter(card => card.image?.src) ?? [];

  return (
    <section className="overflow-hidden bg-background py-20 text-foreground sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="max-w-xl">
          {config.eyebrow ? (
            <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
              <Trans message={config.eyebrow} />
            </p>
          ) : null}
          {config.title ? (
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-balance sm:text-7xl">
              <Trans message={config.title} />
            </h2>
          ) : null}
          {config.description ? (
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
              <Trans message={config.description} />
            </p>
          ) : null}
          <Buttons
            buttons={config.buttons ?? []}
            className="mt-9 flex-wrap gap-3"
          />
        </div>

        <div className="relative mx-auto flex size-75 items-center justify-center sm:size-120 lg:size-145">
          <div className="absolute inset-[18%] rounded-full bg-primary/15 blur-3xl" />
          <div className="relative size-full [--orbit-radius:6.5rem] motion-safe:animate-[spin_32s_linear_infinite] motion-reduce:animate-none sm:[--orbit-radius:10rem] lg:[--orbit-radius:13rem]">
            {cards.map((card, index) => {
              const angle = (360 / cards.length) * index;
              return (
                <div
                  key={`${card.image?.src}-${index}`}
                  className="absolute top-1/2 left-1/2 w-23 -translate-x-1/2 -translate-y-1/2 sm:w-34 lg:w-40"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * var(--orbit-radius)))`,
                  }}
                >
                  <div className="motion-safe:animate-[spin_32s_linear_infinite_reverse] motion-reduce:animate-none">
                    <img
                      src={card.image!.src}
                      alt={card.title || ''}
                      className="aspect-square w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/15"
                    />
                    {card.title ? (
                      <p className="mt-2 truncate text-center text-xs font-medium text-muted-foreground">
                        <Trans message={card.title} />
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={cn(
              'relative flex size-29 items-center justify-center rounded-full bg-card text-center text-sm font-semibold shadow-2xl ring-1 ring-border sm:size-43',
              !cards.length && 'text-muted-foreground',
            )}
          >
            {cards.length ? <Trans message="Play what moves you" /> : <Trans message="Add gallery artwork" />}
          </div>
        </div>
      </div>
    </section>
  );
}
