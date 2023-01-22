/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadIcon } from '@/components/icons/upload-icon'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useUploadMutation } from '@/data/upload'
import Image from 'next/image'
import { ACCEPTED_FILE_TYPES } from '@/utils/constants'
import Loader from '../ui/loader'

export default function Uploader({
  onChange,
  value,
  multiple,
  acceptFile,
  helperText,
}: any) {
  const [files, setFiles] = useState<string>(value)
  const { mutate: upload, isLoading: loading } = useUploadMutation()
  const [error, setError] = useState<string | null>(null)
  const { getRootProps, getInputProps } = useDropzone({
    ...(!acceptFile ? { accept: 'image/*' } : { accept: ACCEPTED_FILE_TYPES }),
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        upload(
          acceptedFiles, // it will be an array of uploaded attachments
          {
            onSuccess: (data: any) => {
              console.log(data)
              setFiles(data.url)
              onChange(data.url)
            },
          }
        )
      }
    },

    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file?.errors?.forEach((error) => {
          if (error?.code === 'file-too-large') {
            setError('El archivo es demasiado grande')
          } else if (error?.code === 'file-invalid-type') {
            setError('El archivo no es válido')
          }
        })
      })
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
              <span className="font-semibold text-accent">
                Selecciona un archivo
              </span>{' '}
              o arrastra una image <br />
              <span className="text-xs text-body">PNG, JPG</span>
            </>
          )}
        </p>
        {error && <p className="mt-4 text-center text-sm text-body">{error}</p>}
      </div>

      {loading && (
        <aside className="mt-2 flex flex-wrap">
          {loading && (
            <div className="mt-2 flex h-16 items-center ms-2">
              <Loader simple={true} className="h-6 w-6" />
            </div>
          )}
        </aside>
      )}
      {files && !loading && (
        <div
          className={`relative mt-2 inline-flex flex-col overflow-hidden rounded me-2  border border-border-200`}
        >
          {/* {file?.thumbnail && isImage ? ( */}
          <figure className="relative h-16 w-28">
            <Image
              src={files}
              alt={'thumbnail'}
              layout="fill"
              objectFit="contain"
            />
          </figure>
        </div>
      )}
    </section>
  )
}
