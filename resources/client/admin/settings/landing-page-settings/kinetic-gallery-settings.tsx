import {LandingPageImageSelector} from '@common/admin/settings/landing-page-settings/landing-page-image-selector';
import {MenuItemForm} from '@common/admin/menus/menu-item-form';
import {AdminSettings} from '@common/admin/settings/admin-settings';
import {Button} from '@shadcn/button/button';
import {Field} from '@shadcn/forms/field';
import {HookForm} from '@shadcn/forms/form/hook-form';
import {Input} from '@shadcn/forms/input/input';
import {Textarea} from '@shadcn/forms/textarea/textarea';
import {Trans} from '@ui/i18n/trans';
import {MinusIcon, PlusIcon} from 'lucide-react';
import {useFieldArray} from 'react-hook-form';

export function KineticGallerySettings({index}: {index: number}) {
  const prefix = `client.landingPage.sections.${index}` as const;
  const cards = useFieldArray<AdminSettings>({
    name: `${prefix}.cards` as never,
  });
  const buttons = useFieldArray<AdminSettings>({
    name: `${prefix}.buttons` as never,
  });

  return (
    <Field.Group>
      <HookForm.Field name={`${prefix}.eyebrow`}>
        <Field.Label><Trans message="Eyebrow" /></Field.Label>
        <Input />
      </HookForm.Field>
      <HookForm.Field name={`${prefix}.title`}>
        <Field.Label><Trans message="Title" /></Field.Label>
        <Input />
      </HookForm.Field>
      <HookForm.Field name={`${prefix}.description`}>
        <Field.Label><Trans message="Description" /></Field.Label>
        <Textarea rows={4} />
      </HookForm.Field>

      <Field.Separator />
      <Field.Title><Trans message="Rotating artwork" /></Field.Title>
      {cards.fields.map((card, cardIndex) => (
        <div key={card.id} className="rounded-lg border p-3">
          <HookForm.Field name={`${prefix}.cards.${cardIndex}.title`}>
            <Field.Label><Trans message="Artwork title" /></Field.Label>
            <Input />
          </HookForm.Field>
          <div className="mt-3">
            <LandingPageImageSelector
              formPrefix={`${prefix}.cards.${cardIndex}`}
              label={<Trans message="Artwork image" />}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            color="danger"
            size="sm"
            className="mt-2"
            onClick={() => cards.remove(cardIndex)}
          >
            <MinusIcon />
            <Trans message="Remove artwork" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        color="primary"
        size="sm"
        className="w-max"
        onClick={() => cards.append({})}
      >
        <PlusIcon />
        <Trans message="Add artwork" />
      </Button>

      <Field.Separator />
      <Field.Title><Trans message="Buttons" /></Field.Title>
      {buttons.fields.map((button, buttonIndex) => (
        <div key={button.id} className="rounded-lg border p-3">
          <MenuItemForm formPathPrefix={`${prefix}.buttons.${buttonIndex}`} />
          <Button
            type="button"
            variant="ghost"
            color="danger"
            size="sm"
            className="mt-2"
            onClick={() => buttons.remove(buttonIndex)}
          >
            <MinusIcon />
            <Trans message="Remove button" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        color="primary"
        size="sm"
        className="w-max"
        onClick={() => buttons.append({variant: 'default', color: 'primary'})}
      >
        <PlusIcon />
        <Trans message="Add button" />
      </Button>
    </Field.Group>
  );
}
