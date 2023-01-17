/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadIcon } from '@/components/icons/upload-icon'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ACCEPTED_FILE_TYPES } from '@/utils/constants'
import Loader from '../ui/loader'
import Image from 'next/image'
import { CloseIcon } from '../icons/close-icon'

export default function Uploader({
  onChange,
  value,
  acceptFile,
  helperText,
}: any) {
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<any>(value)
  const [isImage, setIsImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    ...(!acceptFile ? { accept: 'image/*' } : { accept: ACCEPTED_FILE_TYPES }),
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        setLoading(true)
        const [file] = acceptedFiles
        console.log('FILE SELECTED-->', file)
        // setFile(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setLoading(false)
          // set file to state
          setFile(reader.result)
          setIsImage(true)
          if (onChange) {
            onChange(file)
          }
        }
      }
    },

    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file?.errors?.forEach((error) => {
          if (error?.code === 'file-too-large') {
            setError('File size is too large')
          } else if (error?.code === 'file-invalid-type') {
            setError('File type is not supported')
          }
        })
      })
    },
  })

  const handleDelete = () => {
    setFile(null)
    setIsImage(false)
    if (onChange) {
      onChange(null)
    }
  }

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
                Arrastra y suelta
              </span>{' '}
              <br />
              <span className="text-xs text-body">
                o haz click para seleccionar un archivo
              </span>
            </>
          )}
        </p>
        {error && <p className="mt-4 text-center text-sm text-body">{error}</p>}
      </div>

      {!loading && (
        <aside className="mt-2 flex flex-wrap">
          <div>
            {
              // thumb file
              !loading && isImage && (
                <div className="relative mt-2 inline-flex flex-col overflow-hidden rounded me-2 border border-border-200">
                  <div className="flex h-16 w-16 min-w-0 items-center justify-center overflow-hidden">
                    <figure className="relative h-16 w-28">
                      <Image
                        src={file}
                        width={56}
                        height={56}
                        alt="uploaded image"
                      />
                    </figure>
                  </div>
                  <button
                    className="absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-light shadow-xl outline-none end-1"
                    onClick={handleDelete}
                  >
                    <CloseIcon width={10} height={10} />
                  </button>
                </div>
              )
            }
            {loading && <Loader simple={true} className="h-6 w-6" />}
          </div>
        </aside>
      )}
    </section>
  )
}
