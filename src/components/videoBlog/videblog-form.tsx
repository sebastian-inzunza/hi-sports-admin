import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import {
  useCreateViodeoBlogMutation,
  useUpdateVideoBlogMutation,
} from '@/data/videoBlog'
import { useRouter } from 'next/router'
import FileInput from '../ui/file-input'
import Image from 'next/image'
import { CreateViodeoBlogInput } from '@/types/videoBlog'
import TextArea from '../ui/text-area'
import { slugglify } from '@/utils/slugglify'
import { useState } from 'react'

const VideoBlogForm = ({ defaultValues }: { defaultValues?: any }) => {
  const router = useRouter()

  const { mutate: createVideoBlog, isLoading: creating } =
    useCreateViodeoBlogMutation()
  const { mutate: updateVideoBlog, isLoading: updating } =
    useUpdateVideoBlogMutation()
  const [error, setError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateViodeoBlogInput>({
    defaultValues: defaultValues ?? {},
  })

  async function onSubmit(values: CreateViodeoBlogInput) {
    if (values.content && values.title && values.url && values.image) {
      const body: any = {
        url: values.url,
        image: values.image,
        content: values.content,
        title: values.title,
        slug: slugglify(values.title),
      }

      if (!defaultValues) {
        createVideoBlog(body)
      } else {
        console.log('lo nuevo', body)
        updateVideoBlog({
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
          title="Video Blog"
          details="Esta sección es para subir la ruta del video, el cual se mostrará al abrir la imagen"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Titulo"
            {...register('title')}
            type="text"
            variant="outline"
            className="mb-4"
            error={error}
          />
          <Input
            label="Ruta Video"
            {...register('url')}
            type="text"
            variant="outline"
            className="mb-4"
            error={error}
          />
          <TextArea
            label="Contenido"
            {...register('content')}
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
          {defaultValues ? 'Actualizar Videoblog' : 'Crear VideoBLog'}
        </Button>
      </div>
    </form>
  )
}

export default VideoBlogForm
