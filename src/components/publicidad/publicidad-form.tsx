import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import {
  useCreatePublicidadMutation,
  useUpdatePublicidadMutation,
  usePublicidadQuery,
} from '@/data/publicidad'
import { useRouter } from 'next/router'
import FileInput from '../ui/file-input'
import Image from 'next/image'
import { CreatePublicidadInput } from '@/types/publicidad'
import { useState } from 'react'
import Select from '../ui/select/select'

const VideotecaForm = ({ defaultValues }: { defaultValues?: any }) => {
  console.log('===== VideotecaForm =====')
  console.log('defaultValues', defaultValues)
  console.log('===== VideotecaForm =====')

  const router = useRouter()
  const [error, setError] = useState<string>('')

  let selectEnable: { label: string; value: string }[] = []

  const { publicidad, loading, paginatorInfo } = usePublicidadQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  if (publicidad) {
    // Inicializa selectEnable como un array vacío

    publicidad.forEach((element) => {
      // Agrega cada elemento al array selectEnable
      selectEnable.push({
        label: element.company,
        value: element.company,
      })
    })
  }

  const publicityOptions = [
    {
      label: 'Lateral',
      value: 'Lateral',
    },
    {
      label: 'Bottom',
      value: 'Bottom',
    },
    {
      label: 'Modal',
      value: 'Modal',
    },
  ].filter(
    (option) =>
      !selectEnable.some((selected) => selected.value === option.value)
  )
  const [selectedOption, setSelectedOption] = useState<any>(null)

  const { mutate: createPublicidad, isLoading: creating } =
    useCreatePublicidadMutation()
  const { mutate: updatePublicidad, isLoading: updating } =
    useUpdatePublicidadMutation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<CreatePublicidadInput>({
    defaultValues: defaultValues ?? {
      url: '',
      image: '',
      company: '',
    },
  })

  async function onSubmit(values: CreatePublicidadInput) {
    if (values.image === '') {
      values.image = defaultValues?.image
    }

    if (values.url && values.image) {
      const body: any = {
        url: values.url,
        image: values.image,
        company: values.company,
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
          title="Imagen"
          details={'Sube una Imagen de publicidad.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          {/* <FileInput name="image" control={control} multiple={false} />
          {defaultValues?.image && (
            <Image
              src={defaultValues?.image}
              alt="Publicidad Image"
              width={100}
              height={100}
            />
          )} */}

          <div className="flex items-center">
            {defaultValues?.image && (
              <div className="flex w-1/4 flex-col justify-center">
                <span className="text-stone-600">Imagen Actual </span>

                <img
                  src={defaultValues?.image}
                  alt="Imagen blog"
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
          title="Publicidad"
          details="Esta sección es para subir la publicidad que aparece.
          Recuerda que solo debe existir una de cada una."
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

          <Input
            label="Orientación de publicidad"
            {...register('company')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
          />

          <Select
            isDisabled={publicityOptions.length === 0 ? true : false}
            options={publicityOptions}
            getOptionLabel={(option: any) => option?.label}
            getOptionValue={(option: any) => option?.value}
            placeholder="Orientación de la publicidad"
            isClearable={true}
            onChange={(selectedOption) => {
              setValue('company', selectedOption?.value)
              setSelectedOption(selectedOption)
            }}
            noOptionsMessage={() => 'No hay opciones disponibles'}
          />
          {/* <Input
            label="Orientación de publicidad"
            {...register('company')}
            type="text"
            variant="outline"
            className="mb-4"
            error={error}
          /> */}
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
