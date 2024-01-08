/* eslint-disable */
// @ts-nocheck
import { useCreateNoteMutation, useUpdateNoteMutation } from '@/data/blog'
import { useMeQuery } from '@/data/users'
import { Note } from '@/types/blog'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

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
import { useState } from 'react'
import Image from 'next/image'

type FormValues = {
  id: number
  title: string
  content: string
  createdBy: number
  is_approved: boolean
  slug?: string
  image?: string
  categoryId?: any
  autor: string
}

type IProps = {
  initialValues?: Note | null
}

export default function CreateOrUpdateNoteForm({ initialValues }: IProps) {
  const { categories, loading } = useCategoryQuery({
    limit: 5,
    page: 1,
  })

  const router = useRouter()
  const { data } = useMeQuery()

  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
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

  const [content, setContent] = useState(
    initialValues?.content ? initialValues?.content : ''
  )

  const handleChange = (value: any) => {
    setContent(value)
    // Actualiza el valor del campo 'content' en el formulario
    setValue('content', value)
    setErrorContent('')
  }

  const { mutate: updateNote, isLoading: updating } = useUpdateNoteMutation()
  const { mutate: createNote, isLoading: creating } = useCreateNoteMutation()
  const [erorSelect, setErrorSelect] = useState<string>('')
  const [erorContent, setErrorContent] = useState<string>()

  const onSubmit = async (values: FormValues) => {
    const { title, content, image, categoryId, autor } = values

    if (categoryId === undefined) {
      setErrorSelect('La categoria es requerida')
      if (!content) {
        setErrorContent('El contenido es requerido')
      } else {
        setErrorContent('')
      }
    } else {
      setErrorSelect('')
      const input = {
        title,
        content: initialValues?.content ? initialValues.content : content,
        slug: slugglify(title),
        image: image?.toString() ?? initialValues?.image ?? '',
        createdBy: initialValues?.createdBy ?? data!.id, // Add userID admin here
        categoryId: categoryId.id ?? initialValues?.categoryId ?? 1,
        autor,
      }

      try {
        if (!initialValues) {
          createNote({
            ...input,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            id: '',
            is_approved: false,
          })
        } else {
          const input2 = {
            title,
            content: initialValues?.content ? initialValues.content : content,
            slug: slugglify(title),
            image: image?.toString() ?? initialValues?.image ?? '',
            //updatedAt: new Date().toISOString(),
            categoryId: categoryId.id ?? initialValues?.categoryId ?? 1,
            autor,
          }
          updateNote({
            id: initialValues?.id.toString() ?? '0',
            ...input2,
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
          title="Imagen"
          details={imageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
          {initialValues?.image && (
            <Image
              src={initialValues?.image}
              alt="Videoteca Image"
              width={100}
              height={100}
            />
          )}
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
          <Input
            {...register('autor')}
            label="Autor"
            variant="outline"
            className="mb-5"
            error={errors?.autor?.message}
          />
          {/* <TextArea
            label="Contenido"
            {...register('content')}
            variant="outline"
            className="mb-5"
            error={errors?.content?.message}
          /> */}

          <div className="mt-5">
            <h2 className="text-sm font-bold text-gray-600">Sinopsis</h2>
            <ReactQuill theme="snow" value={content} onChange={handleChange} />
          </div>
          <div className="mb-5 mt-1 text-[12px] text-red-500">
            {erorContent}
          </div>

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
            <div className="mb-5 mt-1 text-[12px] text-red-500">
              {erorSelect}
            </div>
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
