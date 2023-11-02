import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import {
  useCreateViodeotecaMutation,
  useUpdateVideotecaMutation,
} from '@/data/videoteca'
import { useRouter } from 'next/router'
import FileInput from '../ui/file-input'
import Image from 'next/image'
import { CreateViodetaInput } from '@/types/videoteca'
import { useState } from 'react'

const VideotecaForm = ({ defaultValues }: { defaultValues?: any }) => {
  console.log('===== VideotecaForm =====')
  console.log('defaultValues', defaultValues)
  console.log('===== VideotecaForm =====')

  const router = useRouter()
  const [error, setError] = useState<string>('')

  const { mutate: createVideoteca, isLoading: creating } =
    useCreateViodeotecaMutation()
  const { mutate: updateVideoteca, isLoading: updating } =
    useUpdateVideotecaMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateViodetaInput>({
    defaultValues: defaultValues ?? {
      url: '',
      image: '',
    },
  })

  async function onSubmit(values: CreateViodetaInput) {
    if (values.url && values.image) {
      const body: any = {
        url: values.url,
        image: values.image,
      }

      if (!defaultValues) {
        createVideoteca(body)
      } else {
        updateVideoteca({
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
          details={'Sube una imágen para los videos en vivo.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
          {defaultValues?.image && (
            <Image
              src={defaultValues?.image}
              alt="Videoteca Image"
              width={100}
              height={100}
            />
          )}
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Videoteca"
          details="Esta sección es para subir los video en vivo del carousel"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Ruta Video"
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
          {defaultValues ? 'Actualizar Banner' : 'Crear Banner'}
        </Button>
      </div>
    </form>
  )
}

export default VideotecaForm
