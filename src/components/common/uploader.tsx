import { UploadIcon } from '@/components/icons/upload-icon'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Attachment } from '@/types'
import { CloseIcon } from '@/components/icons/close-icon'
import Loader from '@/components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import { useUploadMutation } from '@/data/upload'
import Image from 'next/image'
import { zipPlaceholder } from '@/utils/placeholders'

const getPreviewImage = (value: any) => {
  let images: any[] = []
  if (value) {
    images = Array.isArray(value) ? value : [{ ...value }]
  }
  return images
}
export default function Uploader({
  onChange,
  value,
  multiple,
  acceptFile,
  helperText,
}: any) {
  const { t } = useTranslation()
  const [image, setImage] = useState<string>('')
  const { mutate: upload, isLoading: loading } = useUploadMutation()
  const [error, setError] = useState<string | null>(null)
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 1 && !multiple) {
        setError(t('text-multiple-files'))
        return
      }
      const formData = new FormData()
      acceptedFiles.forEach((file: any) => {
        formData.append('file', file)
      })
      try {
        upload(formData, {
          onSuccess: (data: any) => {
            if (typeof data === 'string') {
              setImage(data)
              onChange(data)
            }
          },
        })
      } catch (e: any) {
        setError(e.message)
      }
    },
  })

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none',
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-muted-light" />
        <p className="mt-4 text-center text-sm text-body">
          {helperText ? (
            <span className="font-semibold text-gray-500">{helperText}</span>
          ) : (
            <>
              <span className="font-semibold text-accent">Cargar imagen</span>
              o arrastrar la imagen <br />
              <span className="text-xs text-body">PNG, JPG</span>
            </>
          )}
        </p>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
      </div>

      {(!!image || loading) && (
        <aside className="mt-2 flex flex-wrap">
          {!loading && (
            <div
              className={`relative me-2 mt-2 inline-flex flex-col overflow-hidden rounded border border-border-200`}
            >
              <figure className="relative h-16 w-28">
                <Image
                  src={image}
                  alt={'image'}
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="object-contain"
                />
              </figure>
              <button
                className=" bg-red-500 p-1 text-white"
                onClick={() => {
                  setImage('') // Limpiar la URL de la imagen
                  onChange('') // Limpiar el valor del componente padre (si es necesario)
                }}
              >
                Eliminar
              </button>
            </div>
          )}
          {loading && (
            <div className="ms-2 mt-2 flex h-16 items-center">
              <Loader simple={true} className="h-6 w-6" />
            </div>
          )}
        </aside>
      )}
    </section>
  )
}
