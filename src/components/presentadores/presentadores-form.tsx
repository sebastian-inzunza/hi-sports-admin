import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import {
  useCreatePresentadorMutation,
  useUpdatePresentadorMutation,
} from '@/data/presentador'
import { useRouter } from 'next/router'

import TextArea from '../ui/text-area'
import Label from '../ui/label'
import FileInput from '../ui/file-input'
import { slugglify } from '@/utils/slugglify'
import SwitchInput from '../ui/switch-input copy'
import { CreatePresentadorInput } from '@/types/presentador'
import Image from 'next/image'
import { useState } from 'react'

const PresentadorForm = ({ defaultValues }: { defaultValues?: any }) => {
  console.log('===== PresentadorForm =====')
  console.log('defaultValues', defaultValues)
  console.log('===== PresentadorForm =====')

  const router = useRouter()

  const { mutate: createPresentador, isLoading: creating } =
    useCreatePresentadorMutation()
  const { mutate: updatePresentador, isLoading: updating } =
    useUpdatePresentadorMutation()

  const [error, setError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreatePresentadorInput>({
    defaultValues: defaultValues ?? {
      url: '',
      name: '',
      image: '',
    },
  })

  async function onSubmit(values: CreatePresentadorInput) {
    const body: any = {
      url: values.url,
      name: values.name,
      image: values.image,
    }
    // createPresentador(body)
    if (values.name && values.url && values.image) {
      if (!defaultValues) {
        createPresentador(body)
      } else {
        updatePresentador({
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
          title="Información"
          details="Esta sección es para colocar el nombre del presentador y su redireccionamiento, ya que podrá ser presionado el presentador."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre del presentador"
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={error}
          />

          <Input
            label="Ruta del presentador"
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
          {defaultValues ? 'Actualizar Presentador' : 'Crear Presentador'}
        </Button>
      </div>
    </form>
  )
}

export default PresentadorForm
