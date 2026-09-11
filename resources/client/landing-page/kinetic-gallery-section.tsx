import {Buttons} from '@common/ui/landing-page/hero/shared';
import {LandingPageContext} from '@common/ui/landing-page/landing-page-context';
import {
  LandingPageButtonConfig,
  LandingPageImageConfig,
} from '@common/ui/landing-page/landing-page-config';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {Trans} from '@ui/i18n/trans';
import {cn} from '@ui/utils/cn';
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';

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
  description?: string;
  image?: LandingPageImageConfig;
};

export function KineticGallerySection({config}: {config: KineticGalleryConfig}) {
  const {heroSearchBarSlot} = useContext(LandingPageContext);
  const SearchBarCmp = heroSearchBarSlot ?? null;
  const slides = config.cards?.filter(card => card.image?.src) ?? [];
  const [activeSlide, setActiveSlide] = useState(0);
  const active = slides[activeSlide];

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) {
    return (
      <section className="bg-background px-6 py-24 text-center text-muted-foreground">
        <Trans message="Add carousel artwork to this section." />
      </section>
    );
  }

  return (
    <section className="bg-background px-0 py-0 text-white sm:px-3 sm:py-8">
      <Navbar.Root className="relative z-10 mx-auto max-w-[1440px] border-b border-white/10 bg-black text-white dark:bg-black">
        <Navbar.Logo color="light" url="/" />
        <Navbar.Menu position="landing-page-navbar" />
        <Navbar.Content className="ml-auto">
          <Navbar.AuthContent />
        </Navbar.Content>
      </Navbar.Root>
      <div className="relative isolate mx-auto min-h-150 max-w-[1440px] overflow-hidden bg-card sm:min-h-175">
        {slides.map((slide, index) => (
          <img
            key={slide.image!.src}
            src={slide.image!.src}
            alt=""
            className={cn(
              'absolute inset-0 size-full object-cover transition-all duration-1000 ease-out',
              index === activeSlide
                ? 'scale-100 opacity-100'
                : 'scale-105 opacity-0',
            )}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/45 to-black/5" />
        <div className="relative flex min-h-150 max-w-2xl flex-col justify-end px-6 pb-18 pt-16 sm:min-h-175 sm:px-12 sm:pb-24 sm:pt-20">
          {config.eyebrow ? (
            <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
              <Trans message={config.eyebrow} />
            </p>
          ) : null}
          <h2 className="mt-3 text-5xl font-black tracking-[-0.07em] text-balance uppercase sm:text-7xl">
            <Trans message={active.title || config.title || ''} />
          </h2>
          <p className="mt-5 max-w-md text-base font-medium text-white/85 sm:text-lg">
            <Trans message={active.description || config.description || ''} />
          </p>
          {SearchBarCmp ? (
            <div className="light mt-7 max-w-xl text-muted-foreground">
              <SearchBarCmp background="bg-white/95" config={config as any} />
            </div>
          ) : null}
          <Buttons buttons={config.buttons ?? []} className="mt-8 flex-wrap gap-3" />
          <div className="mt-9 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={cn(
                  'size-2.5 rounded-full border border-white transition',
                  index === activeSlide ? 'bg-white' : 'bg-transparent',
                )}
              />
            ))}
          </div>
        </div>
        {slides.length > 1 ? (
          <div className="absolute right-5 bottom-5 flex gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() =>
                setActiveSlide((activeSlide + slides.length - 1) % slides.length)
              }
              className="rounded-full bg-black/35 p-2.5 backdrop-blur transition hover:bg-black/60"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
              className="rounded-full bg-black/35 p-2.5 backdrop-blur transition hover:bg-black/60"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
