import { useCreateNoteMutation, useUpdateNoteMutation } from '@/data/blog'
import { useMeQuery } from '@/data/users'
import { Note } from '@/types/blog'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import FileInput from '../ui/file-input'
import Input from '../ui/input'
import TextArea from '../ui/text-area'
import { noteValidationSchema } from './note-validation-schema'
import { slugglify } from '@/utils/slugglify'
import { useCategoryQuery } from '@/data/category'
import Label from '../ui/label'
import SelectInput from '../ui/select-input'
import { getErrorMessage } from '@/utils/form-error'

type FormValues = {
  id: number
  title: string
  content: string
  createdBy: number
  is_approved: boolean
  slug?: string
  image?: string
  categoryId?: any
}

type IProps = {
  initialValues?: Note | null
}

export default function CreateOrUpdateNoteForm({ initialValues }: IProps) {
  const { categories, loading } = useCategoryQuery({
    limit: 25,
    page: 1,
  })

  const router = useRouter()
  const { data } = useMeQuery()

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(noteValidationSchema),
    ...(Boolean(initialValues) && {
      defaultValues: {
        ...initialValues,
      },
    }),
  })

  const { mutate: updateNote, isLoading: updating } = useUpdateNoteMutation()
  const { mutate: createNote, isLoading: creating } = useCreateNoteMutation()

  const onSubmit = async (values: FormValues) => {
    const { title, content, image, categoryId } = values
    const input = {
      title,
      content,
      slug: slugglify(title),
      image: image?.toString() ?? initialValues?.image ?? '',
      createdBy: initialValues?.createdBy ?? data!.id, // Add userID admin here
      categoryId: categoryId.id ?? initialValues?.categoryId ?? 1,
    }

    try {
      if (!initialValues) {
        createNote({
          ...input,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      } else {
        updateNote({
          id: initialValues?.id.toString() ?? '0',
          ...input,
        })
      }
    } catch (error) {
      const serverErrors = getErrorMessage(error)
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        })
      })
    }
  }

  const imageInformation = (
    <span>
      Carga la imagen de la nota desde aquí <br />
      La dimensión de la imagen se recomienda sea de &nbsp;
      <span className="font-bold">1024x1024 px</span>
    </span>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imágen"
          details={imageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Nota"
          details="Detalla la información de la nota"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            {...register('title')}
            label="Titulo"
            variant="outline"
            className="mb-5"
            error={errors?.title?.message}
          />

          <TextArea
            label="Contenido"
            {...register('content')}
            variant="outline"
            className="mb-5"
            error={errors?.content?.message}
          />

          <div className="mb-0">
            <Label>Categoría</Label>
            <SelectInput
              name="categoryId"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              placeholder="Selecciona una categoría"
              options={categories ?? []}
              isLoading={loading}
            />
          </div>
        </Card>
      </div>
      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            Atrás
          </Button>
        )}
        <Button loading={updating || creating} disabled={updating || creating}>
          {initialValues ? 'Actualizar Nota' : 'Crear Nota'}
        </Button>
      </div>
    </form>
  )
}
