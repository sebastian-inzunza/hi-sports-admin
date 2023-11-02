import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import {
  useCreatePublicidadMutation,
  useUpdatePublicidadMutation,
} from '@/data/publicidad'
import { useRouter } from 'next/router'
import FileInput from '../ui/file-input'
import Image from 'next/image'
import { CreatePublicidadInput } from '@/types/publicidad'
import { useState } from 'react'

const VideotecaForm = ({ defaultValues }: { defaultValues?: any }) => {
  console.log('===== VideotecaForm =====')
  console.log('defaultValues', defaultValues)
  console.log('===== VideotecaForm =====')

  const router = useRouter()
  const [error, setError] = useState<string>('')

  const { mutate: createPublicidad, isLoading: creating } =
    useCreatePublicidadMutation()
  const { mutate: updatePublicidad, isLoading: updating } =
    useUpdatePublicidadMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreatePublicidadInput>({
    defaultValues: defaultValues ?? {
      url: '',
      image: '',
    },
  })

  async function onSubmit(values: CreatePublicidadInput) {
    if (values.url && values.image) {
      const body: any = {
        url: values.url,
        image: values.image,
      }

      if (!defaultValues) {
        createPublicidad(body)
      } else {
        updatePublicidad({
          id: defaultValues?.id.toString() ?? '0',
          ...body,
        })
      }
    } else {
      setError('Son obligatorios los campos')
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imágen"
          details={'Sube una imágen de publicidad.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
          {defaultValues?.image && (
            <Image
              src={defaultValues?.image}
              alt="Publicidad Image"
              width={100}
              height={100}
            />
          )}
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Publicidad"
          details="Esta sección es para subir la publicidad que aparece a los dalos y  abajo"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Ruta del patrocinador"
            {...register('url')}
            type="text"
            variant="outline"
            className="mb-4"
            error={error}
          />
        </Card>
      </div>
      <div className="mb-4 text-end sm:mb-8">
        {defaultValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            Atrás
          </Button>
        )}
        <Button disabled={creating} loading={creating}>
          {defaultValues ? 'Actualizar publicidad' : 'Crear publicidad'}
        </Button>
      </div>
    </form>
  )
}

export default VideotecaForm
