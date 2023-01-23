/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form'

import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import Description from '@/components/ui/description'
import Card from '@/components/common/card'
import Label from '@/components/ui/label'
import TextArea from '@/components/ui/text-area'
import { getIcon } from '@/utils/get-icon'
import * as socialIcons from '@/components/icons/social'
// import CopyContent from '@/components/ui/copy-content'
import { siteSettings } from '@/settings/site.settings'
import FileInput from '../ui/file-input'
import GooglePlacesAutocomplete from '../form/google-places-autocomplete'
import { CreateSettings, Settings } from '@/types/settings'
import { useSettingsMutation } from '@/data/settings'

const socialIcon = [
  {
    value: 'FacebookIcon',
    label: 'Facebook',
  },
  {
    value: 'InstagramIcon',
    label: 'Instagram',
  },
  {
    value: 'TwitterIcon',
    label: 'Twitter',
  },
  {
    value: 'YouTubeIcon',
    label: 'Youtube',
  },
]

export const updatedIcons = socialIcon.map((item: any) => {
  item.label = (
    <div className="flex items-center text-body space-s-4">
      <span className="flex h-4 w-4 items-center justify-center">
        {getIcon({
          iconList: socialIcons,
          iconName: item.value,
          className: 'w-4 h-4',
        })}
      </span>
      <span>{item.label}</span>
    </div>
  )
  return item
})

type Props = {
  settings?: Settings
}
export default function SettingsForm({ settings }: Props) {
  const { mutate: updateSwttingsMutation, isLoading: loading } =
    useSettingsMutation()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateSettings | Settings>(
    settings ? { defaultValues: settings } : {}
  )
  const logoInformation = (
    <span>
      {'Tamaño recomendado'} &nbsp;
      <span className="font-bold">
        {siteSettings.logo.width}x{siteSettings.logo.height} {'px'}
      </span>
    </span>
  )

  async function onSubmit(value: CreateSettings | Settings) {
    updateSwttingsMutation({
      id: settings?.id || 0,
      ...value,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={'Logo'}
          details={logoInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput {...register('logo')} control={control} />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={'Información'}
          details={'Podrás encontrar toda la información de tu empresa aquí.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={'Nombre del sitio'}
            variant="outline"
            className="mb-5"
            {...register('siteName')}
            error={errors.siteName?.message}
          />
          <Input
            label={'Descripción del sitio'}
            variant="outline"
            className="mb-5"
            {...register('siteSubtitle')}
            error={errors.siteSubtitle?.message}
          />

          <div className="mb-5">
            <Label>Dirección</Label>
            <Controller
              control={control}
              {...register('location')}
              render={({ field: { onChange } }) => (
                <GooglePlacesAutocomplete
                  onChange={onChange}
                  // data={''}
                  disabled={false}
                />
              )}
            />
          </div>

          <div className="mb-5">
            {/* Two Columns */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label={'Teléfono'}
                {...register('contactNumber')}
                error={errors.contactNumber?.message}
              />
              <Input label={'Website'} {...register('website')} />
            </div>
          </div>

          <div className="mb-5 mt-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label={'Facebook'}
                {...register('facebookUrl')}
                error={errors.facebookUrl?.message}
              />
              <Input
                label={'Instagram'}
                {...register('instagramUrl')}
                error={errors.instagramUrl?.message}
              />
              <Input
                label={'Twitter'}
                {...register('twitterUrl')}
                error={errors.twitterUrl?.message}
              />
              <Input
                label={'Youtube'}
                {...register('youtubeUrl')}
                error={errors.youtubeUrl?.message}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="SEO"
          details={'Podrás encontrar toda la información de SEO aquí.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={'Meta Title'}
            {...register('metaTitle')}
            error={errors.metaTitle?.message}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={'Meta Description'}
            variant="outline"
            className="mb-5"
            {...register('metaDescription')}
            error={errors.metaDescription?.message}
          />
          <Input
            label={'Meta Tags'}
            variant="outline"
            className="mb-5"
            {...register('metaTags')}
            error={errors.metaTags?.message}
          />
          <Input
            label={'Canonical URL'}
            variant="outline"
            className="mb-5"
            {...register('canonicalUrl')}
            error={errors.canonicalUrl?.message}
          />
          <Input
            label={'Og Title'}
            variant="outline"
            className="mb-5"
            {...register('ogTitle')}
            error={errors.ogTitle?.message}
          />
          <TextArea
            label={'Og Description'}
            variant="outline"
            className="mb-5"
            {...register('ogDescription')}
            error={errors.ogDescription?.message}
          />
          <div className="mb-5">
            <Label>Image</Label>
            <FileInput name="ogImage" control={control} />
          </div>
          <Input
            label={'Card'}
            variant="outline"
            className="mb-5"
            placeholder="one of summary, summary_large_image, app, or player"
            {...register('twitterCardType')}
          />
        </Card>
      </div>
      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading} type="submit">
          Guardar
        </Button>
      </div>
    </form>
  )
}
