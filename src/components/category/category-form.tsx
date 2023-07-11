import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateCategoryMutation } from '@/data/category'
import TextArea from '../ui/text-area'
import Label from '../ui/label'
import FileInput from '../ui/file-input'
import { slugglify } from '@/utils/slugglify'
import SwitchInput from '../ui/switch-input copy'
import { CreateCategoryInput } from '@/types/category'

type FormValues = {
  title: string
  slug: string
  content: string
  image?: string | null
  is_approved: boolean
}
const CategoryForm = ({ defaultValues }: { defaultValues?: any }) => {
  const {
    mutate: createCategory,
    isLoading: creating,
    error,
  } = useCreateCategoryMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues,
  })

  async function onSubmit(values: FormValues) {
    const body: any = {
      name: values.title,
      title: values.title,
      slug: slugglify(values.title),
      content: values.content,
      image: values.image,
      is_approved: values.is_approved,
    }
    createCategory(body)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imágen"
          details={'Sube una imágen para la categoría.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Categoría"
          details="Esta categoría podrá ser utilizada para clasificar los articulos de tu blog."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Título"
            {...register('title')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.title?.message?.toString()}
          />
          <TextArea
            label="Contenido"
            className="mb-4"
            variant="outline"
            {...register('content')}
            error={errors.content?.message?.toString()}
          />

          <div className="flex items-center gap-x-4">
            <SwitchInput name="is_approved" control={control} />
            <Label className="mb-0">Publicar</Label>
          </div>
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

export default CategoryForm
