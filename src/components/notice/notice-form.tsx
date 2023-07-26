import Description from '../ui/description'
import { Notice, StoreNoticeInput, StoreStatus } from '@/types'
import { useModalAction } from '../ui/modal/modal.context'
import { DatePicker } from '@/components/ui/date-picker'

import { Controller, useForm } from 'react-hook-form'
import Card from '../common/card'
import ValidationError from '../ui/form-validation-error'
import Input from '../ui/input'
import TextArea from '../ui/text-area'
import SelectInput from '../ui/select-input'
import Label from '../ui/label'
import { useEnviromentQuery } from '@/data/enviroment'
import Button from '../ui/button'
import {
  useCreateStoreNoticeMutation,
  useUpdateStoreNoticeMutation,
} from '@/data/store-notice'

type Props = {
  initialValues?: Notice
}

const priorityType = [
  { name: 'Alta', value: StoreStatus.HIGHT },
  { name: 'Media', value: StoreStatus.MEDIUM },
  { name: 'Baja', value: StoreStatus.LOW },
]

export default function CreateOrUpdateNoticeForm({ initialValues }: Props) {
  const { openModal } = useModalAction()
  const { enviroments, loading } = useEnviromentQuery({
    limit: 15,
    page: 1,
    search: '',
  })
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Notice>({
    defaultValues: {
      notice: initialValues?.notice ?? '',
      description: initialValues?.description ?? '',
      priority: initialValues?.priority ?? StoreStatus.HIGHT,
      // effectiveFrom convert string to format required by datepicker
      effectiveFrom: initialValues?.effectiveFrom
        ? new Date(initialValues?.effectiveFrom)
        : new Date(),
      // expiredAt convert string to format required by datepicker
      expiredAt: initialValues?.expiredAt
        ? new Date(initialValues?.expiredAt)
        : new Date(),
    },
  })

  const [effectiveFrom, expiredAt] = watch(['effectiveFrom', 'expiredAt'])

  const { mutate: create, isLoading: creating } = useCreateStoreNoticeMutation()
  const { mutate: update, isLoading: updating } = useUpdateStoreNoticeMutation()

  function convertDate(date: string) {
    return new Date(date).toISOString().slice(0, -5)
  }
  function onSubmit(data: any) {
    const body: any = {
      description: data.description,
      effectiveFrom: convertDate(data.effectiveFrom!),
      expiredAt: convertDate(data.expiredAt!),
      notice: data.notice,
      priority: data.priority.value,
      environmentId: data.environmentId.id,
      type: 'General',
    }

    if (initialValues) {
      update({
        ...initialValues,
        ...body,
      })
    } else {
      create(body)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={'Avisos'}
          details={`${
            initialValues
              ? 'Editar avisos de ambiente'
              : 'Crear avisos de ambiente'
          } Este aviso se mostrará en la página de inicio de la app.`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Label>Prioridad</Label>
            <SelectInput
              name="priority"
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.value}
              control={control}
              options={priorityType}
            />
            <ValidationError message={errors.priority?.message} />
          </div>
          <Input
            label={`Título*`}
            {...register('notice')}
            error={errors.notice?.message ?? ''}
            variant="outline"
            className="mb-5"
            disabled={false}
          />

          <div className="relative">
            <TextArea
              label={`Descripción*`}
              {...register('description')}
              error={errors.description?.message ?? ''}
              variant="outline"
              className="mb-5"
            />
          </div>

          <div className="mb-4 flex flex-col sm:flex-row">
            <div className="mb-5 w-full p-0 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>{`Fecha de activación *`}</Label>

              <Controller
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
                    className="flex h-12 w-full appearance-none items-center rounded-md px-4 text-sm text-heading transition duration-300 ease-in-out focus:border-accent focus:outline-none"
                  />
                )}
              />
              <ValidationError message={errors.effectiveFrom?.message ?? ''} />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Label>{`Fecha de desactivación *`}</Label>

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
                    className="flex h-12 w-full appearance-none items-center rounded-md px-4 text-sm text-heading transition duration-300 ease-in-out focus:border-accent focus:outline-none"
                  />
                )}
              />
              <ValidationError message={errors.expiredAt?.message ?? ''} />
            </div>
          </div>
          <div className="mb-0">
            <Label>{'Ambientes'}</Label>
            <SelectInput
              name="environmentId"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={enviroments ?? []}
            />

            <ValidationError message={errors.type?.message} />
          </div>
        </Card>
      </div>

      <div className="mb-4 text-end sm:mb-8">
        <Button disabled={loading || creating} loading={loading || updating}>
          {initialValues ? 'Editar aviso' : 'Crear aviso'}
        </Button>
      </div>
    </form>
  )
}
