/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import Description from '@/components/ui/description'
import Card from '@/components/common/card'
import Label from '@/components/ui/label'
import TextArea from '@/components/ui/text-area'
import { getIcon } from '@/utils/get-icon'
import * as socialIcons from '@/components/icons/social'
import CopyContent from '@/components/ui/copy-content'
import { siteSettings } from '@/settings/site.settings'

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

// TODO: Split Settings
export default function SettingsForm() {
  const logoInformation = (
    <span>
      {'Logo'} <br />
      {'1024x1024'} &nbsp;
      <span className="font-bold">
        {siteSettings.logo.width}x{siteSettings.logo.height} {'px'}
      </span>
    </span>
  )

  return (
    <form method="POST">
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={'Logo'}
          details={logoInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          {/* <FileInput name="logo" control={control} multiple={false} /> */}
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
            name={''}
          />
          <Input
            label={'Subtítulo'}
            error={'Subtitle'}
            variant="outline"
            className="mb-5"
            name={''}
          />

          <div className="mb-5">
            <Label>Moneda</Label>
            {/* <SelectInput
              name="currency"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.code}
              options={CURRENCY}
              disabled={isNotDefaultSettingsPage}
            /> */}
            {/* <ValidationError message={t(errors.currency?.message)} /> */}
          </div>
          <Input
            label={'Amount'}
            type="number"
            error={'Min order amount'}
            variant="outline"
            className="mb-5"
            name={'minimum-order-amount'}
          />
          <Input
            label={`currency to wallet ratio`}
            type="number"
            error={'Wallet currency ratio'}
            variant="outline"
            className="mb-5"
            name={'wallet-currency-ratio'}
          />
          <Input
            label={`Signup points`}
            type="number"
            error={'Signup points'}
            variant="outline"
            className="mb-5"
            name={'signup-points'}
          />

          <Input
            label={`Maximum question limit`}
            type="number"
            error={'Maximum question limit'}
            variant="outline"
            className="mb-5"
            name={'maximum-question-limit'}
          />

          <div className="mb-5">
            <div className="flex items-center gap-x-4">
              {/* <SwitchInput
                name="useOtp"
                control={control}
                disabled={isNotDefaultSettingsPage}
              /> */}
              <Label className="mb-0">OTP</Label>
            </div>
          </div>

          <div className="mb-5">
            <Label>Taxes</Label>
            {/* <SelectInput
              name="taxClass"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={taxClasses!}
              disabled={isNotDefaultSettingsPage}
            /> */}
          </div>
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={'Pagos'}
          details="Podrás encontrar toda la información de pagos aquí."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <div className="flex items-center gap-x-4">
              {/* <SwitchInput
                name="useCashOnDelivery"
                control={control}
                disabled={isNotDefaultSettingsPage}
              /> */}
            </div>
          </div>

          <div className="mb-5">
            <Label>Seleccion de forma de pago</Label>
            {/* <SelectInput
              name="paymentGateway"
              control={control}
              getOptionLabel={(option: any) => option.title}
              getOptionValue={(option: any) => option.name}
              options={PAYMENT_GATEWAY}
              disabled={isNotDefaultSettingsPage}
            /> */}
          </div>

          <div className="mb-0">
            <CopyContent
              label={'Webhook'}
              variant="outline"
              value={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/webhooks`}
              name="webhook"
            />
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
            name="seo.metaTitle"
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={'Meta Description'}
            variant="outline"
            className="mb-5"
            name="seo.metaDescription"
          />
          <Input
            label={'Meta Tags'}
            variant="outline"
            className="mb-5"
            name="seo.metaTags"
          />
          <Input
            label={'Canonical URL'}
            variant="outline"
            className="mb-5"
            name="seo.canonicalUrl"
          />
          <Input
            label={'oG TITLE'}
            variant="outline"
            className="mb-5"
            name="seo.ogTitle"
          />
          <TextArea
            label={'Description'}
            variant="outline"
            className="mb-5"
            name="seo.ogDescription"
          />
          <div className="mb-5">
            <Label>Image</Label>
            {/* <FileInput name="seo.ogImage" control={control} multiple={false} /> */}
          </div>
          <Input
            label={'Twitter'}
            variant="outline"
            className="mb-5"
            placeholder="your twitter username (exp: @username)"
            name="seo.twitterUsername"
          />
          <Input
            label={'Card'}
            variant="outline"
            className="mb-5"
            placeholder="one of summary, summary_large_image, app, or player"
            name="seo.twitterCardType"
          />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={'Delivery Schedule'}
          details={'Podrás encontrar toda la información de delivery aquí.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
        />
      </div>

      <div className="mb-4 text-end">
        <Button>Guardar</Button>
      </div>
    </form>
  )
}
