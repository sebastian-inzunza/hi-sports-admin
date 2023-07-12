import { useState } from 'react'
import { Environment } from '@/types'
import Description from '../ui/description'
import { HexColorPicker } from 'react-colorful'
import Card from '../common/card'
import Input from '../ui/input'
import Button from '../ui/button'
import FileInput from '../ui/file-input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { environmentValidationSchema } from './environment-validation-schema'

type Props = {
  initialValues?: Environment
}
type FormValues = {
  id?: number
  name: string
  logo: string
  active: boolean
  primaryColor: string
  secondaryColor: string
}
export default function CreateOrUpdateEnvironment({ initialValues }: Props) {
  const [primaryColor, setPrimaryColor] = useState('#aabbcc')
  const [secondaryColor, setSecondaryColor] = useState('#1c2e41')
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(environmentValidationSchema),
    ...(Boolean(initialValues) && {
      defaultValues: {
        ...initialValues,
      },
    }),
  })
  return (
    <form noValidate>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imágen"
          details={
            'Te recomendamos utilizar una imagen con las siguientes medidas: 1024x1024 px'
          }
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={'Entornos'}
          details={`${
            initialValues ? 'Editar Entorno' : 'Crear Entorno'
          } El entorno que crearás se podrá asignar a los usuarios y así identificarlos.`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full flex-col sm:w-8/12 md:w-2/3">
          <Input
            label={`Nombre del entorno *`}
            {...register('name')}
            variant="outline"
            className="mb-5"
            disabled={false}
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
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-4 text-end sm:mb-8">
        <Button>
          {initialValues ? 'Actualizar Entorno' : 'Crear Entorno'}
        </Button>
      </div>
    </form>
  )
}
