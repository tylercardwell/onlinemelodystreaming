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

type Props = {index: number};
const prefixFor = (index: number) => `client.landingPage.sections.${index}` as const;

function IntroFields({index}: Props) {
  const prefix = prefixFor(index);
  return <><HookForm.Field name={`${prefix}.eyebrow`}><Field.Label><Trans message="Eyebrow" /></Field.Label><Input /></HookForm.Field><HookForm.Field name={`${prefix}.title`}><Field.Label><Trans message="Title" /></Field.Label><Input /></HookForm.Field><HookForm.Field name={`${prefix}.description`}><Field.Label><Trans message="Description" /></Field.Label><Textarea rows={4} /></HookForm.Field></>;
}

function Buttons({index}: Props) {
  const prefix = prefixFor(index);
  const buttons = useFieldArray<AdminSettings>({name: `${prefix}.buttons` as never});
  return <><Field.Separator /><Field.Title><Trans message="Buttons" /></Field.Title>{buttons.fields.map((button, buttonIndex) => <div key={button.id} className="rounded-lg border p-3"><MenuItemForm formPathPrefix={`${prefix}.buttons.${buttonIndex}`} /><Button type="button" variant="ghost" color="danger" size="sm" className="mt-2" onClick={() => buttons.remove(buttonIndex)}><MinusIcon /><Trans message="Remove button" /></Button></div>)}<Button type="button" variant="outline" color="primary" size="sm" onClick={() => buttons.append({variant: 'flat', color: 'primary'})}><PlusIcon /><Trans message="Add button" /></Button></>;
}

export function DiscoveryHeroSettings({index}: Props) {
  const prefix = prefixFor(index);
  const covers = useFieldArray<AdminSettings>({name: `${prefix}.covers` as never});
  return <Field.Group><IntroFields index={index} /><Field.Separator /><Field.Title><Trans message="Album covers" /></Field.Title>{covers.fields.map((cover, coverIndex) => <div key={cover.id} className="rounded-lg border p-3"><HookForm.Field name={`${prefix}.covers.${coverIndex}.src`}><Field.Label><Trans message="Cover image URL" /></Field.Label><Input /></HookForm.Field><HookForm.Field name={`${prefix}.covers.${coverIndex}.alt`}><Field.Label><Trans message="Alt text" /></Field.Label><Input /></HookForm.Field><Button type="button" variant="ghost" color="danger" size="sm" className="mt-2" onClick={() => covers.remove(coverIndex)}><MinusIcon /><Trans message="Remove cover" /></Button></div>)}<Button type="button" variant="outline" color="primary" size="sm" onClick={() => covers.append({})}><PlusIcon /><Trans message="Add cover" /></Button><Buttons index={index} /></Field.Group>;
}

export function EditorialDiscoverySettings({index}: Props) {
  const prefix = prefixFor(index);
  return <Field.Group><IntroFields index={index} /><Field.Separator /><LandingPageImageSelector formPrefix={prefix} label={<Trans message="Background image" />} /><Buttons index={index} /></Field.Group>;
}

export function DiscoveryBenefitsSettings({index}: Props) {
  const prefix = prefixFor(index);
  const benefits = useFieldArray<AdminSettings>({name: `${prefix}.benefits` as never});
  return <Field.Group><IntroFields index={index} /><Field.Separator /><Field.Title><Trans message="Benefits" /></Field.Title>{benefits.fields.map((benefit, benefitIndex) => <div key={benefit.id} className="rounded-lg border p-3"><HookForm.Field name={`${prefix}.benefits.${benefitIndex}.title`}><Field.Label><Trans message="Title" /></Field.Label><Input /></HookForm.Field><HookForm.Field name={`${prefix}.benefits.${benefitIndex}.description`}><Field.Label><Trans message="Description" /></Field.Label><Textarea rows={3} /></HookForm.Field><LandingPageImageSelector formPrefix={`${prefix}.benefits.${benefitIndex}`} label={<Trans message="Background image" />} /><Button type="button" variant="ghost" color="danger" size="sm" className="mt-2" onClick={() => benefits.remove(benefitIndex)}><MinusIcon /><Trans message="Remove benefit" /></Button></div>)}<Button type="button" variant="outline" color="primary" size="sm" onClick={() => benefits.append({})}><PlusIcon /><Trans message="Add benefit" /></Button></Field.Group>;
}

export function CatalogCtaSettings({index}: Props) {
  const prefix = prefixFor(index);
  return <Field.Group><IntroFields index={index} /><Field.Separator /><LandingPageImageSelector formPrefix={prefix} label={<Trans message="Background image" />} /><Buttons index={index} /></Field.Group>;
}
