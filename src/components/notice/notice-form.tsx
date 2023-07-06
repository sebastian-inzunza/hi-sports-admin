import { useTranslation } from 'react-i18next'
import Description from '../ui/description'
import { Notice, StoreStatus } from '@/types'
import { useModalAction } from '../ui/modal/modal.context'
import { DatePicker } from '@/components/ui/date-picker'

import { Controller, useForm } from 'react-hook-form'
import Card from '../common/card'
import ValidationError from '../ui/form-validation-error'
import Input from '../ui/input'
import TextArea from '../ui/text-area'
import SelectInput from '../ui/select-input'
import Label from '../ui/label'

type Props = {
  initialValues?: Notice
}

const priorityType = [
  { name: 'High', value: StoreStatus.HIGHT },
  { name: 'Medium', value: StoreStatus.MEDIUM },
  { name: 'Low', value: StoreStatus.LOW },
]

export default function CreateOrUpdateNoticeForm({ initialValues }: Props) {
  const { t } = useTranslation()
  const { openModal } = useModalAction()
  let noticeTypes: any = []

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Notice>({
    defaultValues: initialValues ?? {
      priority: StoreStatus.HIGHT,
      creator: 'ADMIN',
      notice: '',
      description: '',
      effectiveFrom: '',
      expiredAt: '',
      type: 'STORE',
      is_approved: false,
      environmentId: 1,
    },
  })

  const [effectiveFrom, expiredAt] = watch(['effectiveFrom', 'expiredAt'])
  // effectiveForm change date forma

  return (
    <form>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description') ?? ''}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:store-notice-form-info-help-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Label>{t('form:input-label-priority')}</Label>
            <SelectInput
              name="priority"
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.value}
              control={control}
              options={priorityType}
            />
            <ValidationError
              //@ts-ignore
              message={t(errors.priority?.message!)}
            />
          </div>
          <Input
            label={`${t('form:input-title')}*`}
            {...register('notice')}
            error={errors.notice?.message ?? ''}
            variant="outline"
            className="mb-5"
            disabled={false}
          />

          <div className="relative">
            <TextArea
              label={`${t('form:input-label-description')}*`}
              {...register('description')}
              error={errors.description?.message ?? ''}
              variant="outline"
              className="mb-5"
            />
          </div>

          <div className="mb-4 flex flex-col sm:flex-row">
            <div className="mb-5 w-full p-0 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>{`${t('form:store-notice-active-from')}*`}</Label>

              {/* <Controller
                control={control}
                name="effectiveFrom"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsStart
                    minDate={new Date()}
                    maxDate={expiredAt}
                    startDate={effectiveFrom}
                    endDate={expiredAt}
                    className="border border-border-base"
                  />
                )}
              /> */}
              <ValidationError message={errors.effectiveFrom?.message ?? ''} />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Label>{`${t('form:store-notice-expire-at')}*`}</Label>

              <Controller
                control={control}
                name="expiredAt"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsEnd
                    startDate={effectiveFrom}
                    endDate={expiredAt}
                    minDate={effectiveFrom}
                    className="border border-border-base"
                  />
                )}
              />
              <ValidationError message={errors.expiredAt?.message ?? ''} />
            </div>
          </div>
          <>
            <div className="mb-0">
              <Label>{t('form:input-label-type')}</Label>
              <SelectInput
                name="type"
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.value}
                options={noticeTypes}
                defaultValue={noticeTypes[0]}
              />

              <ValidationError //@ts-ignore
                message={t(errors.type?.message)}
              />
            </div>
            {/* {noticeType &&
              (noticeType == StoreNoticeType.specific_vendor ||
                noticeType == StoreNoticeType.specific_shop) && (
                <NoticeReceivedByInput
                  className="mt-5"
                  control={control}
                  setValue={setValue}
                  //@ts-ignore
                  error={t(errors.received_by?.message!)}
                />
              )} */}
          </>
        </Card>
      </div>
    </form>
  )
}
