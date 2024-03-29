import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/data/category'
import TextArea from '../ui/text-area'
import Label from '../ui/label'
import FileInput from '../ui/file-input'
import { slugglify } from '@/utils/slugglify'
import SwitchInput from '../ui/switch-input copy'
import { CreateCategoryInput } from '@/types/category'
import Image from 'next/image'
import { useState } from 'react'

const CategoryForm = ({ defaultValues }: { defaultValues?: any }) => {
  console.log('===== CategoryForm =====')
  console.log('defaultValues', defaultValues)
  console.log('===== CategoryForm =====')
  const { mutate: createCategory, isLoading: creating } =
    useCreateCategoryMutation()
  const { mutate: updateCategory, isLoading: updating } =
    useUpdateCategoryMutation()

  const [error, setError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateCategoryInput>({
    defaultValues: defaultValues ?? {
      id: '',
      name: '',
      content: '',
      image: '',
      is_approved: false,
    },
  })

  async function onSubmit(values: CreateCategoryInput) {
    if (values.image === '') {
      values.image = defaultValues.image
    }
    if (values.name && values.image) {
      const body: any = {
        name: values.name,
        slug: slugglify(values.name),
        thumbnail: values.image,
        image: values.image,
        is_approved: values.is_approved,
      }
      if (!defaultValues) {
        createCategory(body)
      } else {
        updateCategory({
          id: defaultValues?.id.toString(),
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
          title="Imagen"
          details={'Sube una Imagen para la categoría.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          {/* <FileInput name="image" control={control} multiple={false} />
          {defaultValues?.image && (
            <Image
              src={defaultValues?.image}
              alt="Category Image"
              width={100}
              height={100}
            />
          )} */}
          <div className="flex items-center">
            {defaultValues?.image && (
              <div className="flex w-1/4 flex-col justify-center">
                <span className="text-stone-600">Imagen Actual </span>
                <Image
                  src={defaultValues?.image}
                  alt="Videoteca Image"
                  width={100}
                  height={40}
                />
              </div>
            )}

            <div className="w-full">
              <FileInput name="image" control={control} multiple={false} />
            </div>
          </div>
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
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={error}
          />

          <div className="flex items-center gap-x-4">
            {/* <SwitchInput name="is_approved" control={control} />
            <Label className="mb-0">Publicar</Label> */}
          </div>
        </Card>
      </div>
      <div className="mb-4 text-end sm:mb-8">
        <Button disabled={creating} loading={creating}>
          {defaultValues ? 'Actualizar Categoría' : 'Crear Categoría'}
        </Button>
      </div>
    </form>
  )
}

export default CategoryForm
