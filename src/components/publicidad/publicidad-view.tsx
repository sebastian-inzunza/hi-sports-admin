import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { format } from 'date-fns'

import { useRouter } from 'next/router'
import FileInput from '../ui/file-input'
import Image from 'next/image'
import { CreatePublicidadInput } from '@/types/publicidad'
import { useState } from 'react'

const VideotecaForm = ({ defaultValues }: { defaultValues?: any }) => {
  const router = useRouter()

  return (
    <div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imágen"
          details={'Imagen de publicidad.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="flex w-full justify-center sm:w-8/12 md:w-2/3">
          {defaultValues?.image && (
            <Image
              src={defaultValues?.image}
              alt="Publicidad Image"
              width={100}
              height={100}
            />
          )}
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Publicidad"
          details="Información de la publicidad."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Ruta del patrocinador"
            value={defaultValues.url}
            type="text"
            variant="outline"
            className="mb-4"
            disabled={true}
          />

          <Input
            label="Marca / Empresa"
            type="text"
            value={defaultValues.company}
            variant="outline"
            className="mb-4"
            disabled={true}
          />

          <Input
            label="Fecha de creación"
            type="text"
            value={format(
              new Date(defaultValues.createdAt),
              'yyyy-MM-dd HH:mm:ss'
            )}
            variant="outline"
            className="mb-4"
            disabled={true}
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
      </div>
    </div>
  )
}

export default VideotecaForm
