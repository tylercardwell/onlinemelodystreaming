import {Accordion} from '@shadcn/accordion/accordion';
import {Trans} from '@ui/i18n/trans';
import {cn} from '@ui/utils/cn';

export type LandingPageFaqConfig = {
  name: 'faq';
  title?: string;
  badge?: string;
  description?: string;
  variant?: 'separated' | 'bordered' | 'default';
  mutedBg?: boolean;
  questions?: {
    question: string;
    answer: string;
  }[];
};

type LandingPageFaqProps = {
  config: LandingPageFaqConfig;
};
export function LandingPageFaq({config}: LandingPageFaqProps) {
  return (
    <div
      className={cn(
        'py-24 sm:py-32',
        config.mutedBg && 'bg-muted/55 dark:bg-card',
      )}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {config.badge ? (
            <p className="text-base/7 font-semibold text-primary">
              <Trans message={config.badge} />
            </p>
          ) : null}
          {config.title ? (
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-pretty text-foreground sm:text-5xl sm:leading-[1.06]">
              <Trans message={config.title} />
            </h2>
          ) : null}
          {config.description ? (
            <p className="mt-6 text-lg/8 text-muted-foreground">
              <Trans message={config.description} />
            </p>
          ) : null}
        </div>
        {config.questions?.length ? (
          <Accordion variant={config.variant} className="mt-14 overflow-hidden rounded-2xl border border-border/70 bg-background/50 px-2 shadow-sm sm:mt-16">
            {config.questions.map((item, index) => (
              <Accordion.Item key={item.question} value={`${index}`}>
                <Accordion.Trigger className="p-5 text-base font-semibold transition-colors hover:text-primary">
                  <Trans message={item.question} />
                </Accordion.Trigger>
                <Accordion.Content className="px-5 pb-5 text-base text-muted-foreground">
                  <Trans message={item.answer} />
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : null}
      </div>
    </div>
  );
}
