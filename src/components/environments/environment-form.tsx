import { useState } from 'react'
import { Environment, EnvironmentInput } from '@/types'
import Description from '../ui/description'
import Card from '../common/card'
import Input from '../ui/input'
import Button from '../ui/button'
import FileInput from '../ui/file-input'
import { useForm } from 'react-hook-form'
import { useCreateEnvMutation, useUpdateEnvMutation } from '@/data/enviroment'
import TextArea from '../ui/text-area'

type Props = {
  initialValues?: Environment
}

export default function CreateOrUpdateEnvironment({ initialValues }: Props) {
  const { mutate: create, isLoading: creating } = useCreateEnvMutation()
  const { mutate: update, isLoading: updating } = useUpdateEnvMutation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EnvironmentInput>({
    shouldUnregister: true,
    // resolver: yupResolver(environmentValidationSchema),
    ...(Boolean(initialValues) && {
      defaultValues: {
        ...initialValues,
      },
    }),
  })

  const onSubmit = async (values: EnvironmentInput) => {
    if (initialValues) {
      update({
        ...initialValues,
        ...values,
      })
    } else {
      create(values)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imágen"
          details={
            'Te recomendamos utilizar una imagen con las siguientes medidas: 1024x1024 px'
          }
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="logo" control={control} multiple={false} />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={'Información del entorno'}
          details={`${
            initialValues ? 'Editar' : 'Crear'
          } el entorno de tu aplicación, puedes crear varios entornos para tu aplicación y así poder cambiar el logo, colores y descripción de tu aplicación`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full flex-col sm:w-8/12 md:w-2/3">
          <Input
            label={`Nombre del entorno *`}
            {...register('name')}
            variant="outline"
            className="mb-5"
            disabled={false}
            error={errors.name?.message}
          />

          <TextArea
            label={`Descripción del entorno *`}
            {...register('description')}
            variant="outline"
            className="mb-5"
            disabled={false}
            error={errors.description?.message}
          />

          {/* Create two columns */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-2">
            <div className="col-span-2 flex md:col-span-1">
              <div>
                <div className="flex flex-col items-center justify-between">
                  <Input
                    label={`Color primario *`}
                    {...register('primaryColor')}
                    className="mb-5"
                    type="color"
                    variant="outline"
                    disabled={false}
                    error={errors.primaryColor?.message}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 flex justify-center md:col-span-1">
              <div>
                <Input
                  label={`Color secundario *`}
                  {...register('secondaryColor')}
                  variant="outline"
                  className="mb-5"
                  disabled={false}
                  type="color"
                  error={errors.secondaryColor?.message}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-4 text-end sm:mb-8">
        <Button
          type="submit"
          disabled={creating || updating}
          loading={creating || updating}
        >
          {initialValues ? 'Actualizar Entorno' : 'Crear Entorno'}
        </Button>
      </div>
    </form>
  )
}
