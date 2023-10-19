import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { useCreateViodeotecaMutation } from '@/data/videoteca'
import TextArea from '../ui/text-area'
import Label from '../ui/label'
import FileInput from '../ui/file-input'
import { slugglify } from '@/utils/slugglify'
import SwitchInput from '../ui/switch-input copy'
import { CreateCategoryInput } from '@/types/category'
import Image from 'next/image'
import { CreateViodetaInput } from '@/types/videoteca'

const VideotecaForm = ({ defaultValues }: { defaultValues?: any }) => {
  console.log('===== VideotecaForm =====')
  console.log('defaultValues', defaultValues)
  console.log('===== VideotecaForm =====')

  const { mutate: createVideoteca, isLoading: creating } =
    useCreateViodeotecaMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateViodetaInput>({
    defaultValues: defaultValues ?? {
      source: '',
      image: '',
    },
  })

  async function onSubmit(values: CreateViodetaInput) {
    const body: any = {
      source: values.source,
      thumbnail: values.image,
      image: values.image,
    }
    createVideoteca(body)
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
            {...register('source')}
            type="text"
            variant="outline"
            className="mb-4"
            // error={errors.name?.message?.toString()}
          />
        </Card>
      </div>
      <div className="mb-4 text-end sm:mb-8">
        <Button disabled={creating} loading={creating}>
          Crear
        </Button>
      </div>
    </form>
  )
}

export default VideotecaForm
