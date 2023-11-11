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

  return (
    <div>
      <div className="my-5 flex flex-wrap justify-center border-b border-dashed border-border-base pb-8 sm:my-8">
        <Card className="flex w-full justify-center sm:w-8/12 md:w-2/3">
          {initialValues?.image && (
            <Image
              src={initialValues?.image}
              alt="Category Image"
              width={500}
              height={500}
            />
          )}
        </Card>
      </div>
      <div className="my-5 flex flex-wrap justify-center border-b border-dashed border-border-base pb-8 sm:my-8">
        <Card className=" w-full  sm:w-8/12 md:w-2/3">
          <div className="flex-col">
            <h2 className="mb-2 text-left text-2xl font-bold text-purple-900">
              Titulo del blog
            </h2>
            <p className="text-justify text-lg text-stone-800">
              {initialValues?.title}
            </p>

            <h2 className="mb-2 text-left text-2xl font-bold text-purple-900">
              Categoría del blog
            </h2>
            <p className="text-justify text-lg text-stone-800">
              {initialValues?.category?.name}
            </p>

            <h2 className="mb-2 text-2xl font-bold text-purple-900">
              Sinopsis
            </h2>
            <p className="text-justify text-lg text-stone-800">
              {initialValues?.content}
            </p>
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
      </div>
    </div>
  )
}
