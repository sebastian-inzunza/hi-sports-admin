import React from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Loader from '@/components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import { useUploadMutation } from '@/data/upload'
import Image from 'next/image'

const Uploader = ({ form, onChange, multiple, helperText }: any) => {
  const { t } = useTranslation()
  const [image, setImage] = React.useState<string>('')
  const { mutate: upload, isLoading: loading } = useUploadMutation()
  const [error, setError] = React.useState<string | null>(null)

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      upload(formData, {
        onSuccess: (data: any) => {
          if (typeof data === 'string') {
            setImage(data)
            onChange(data)

            // Actualiza el estado del campo manualmente
            form.setFieldsValue({ thumbnailUrl: data })
          }
        },
      })
    } catch (e) {
      setError(e.message)
      onError(e)
    }
  }

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  return (
    <section className="upload">
      <Upload.Dragger
        showUploadList={false}
        customRequest={customRequest}
        onChange={handleChange}
        multiple={multiple}
        accept="image/jpeg, image/png, image/gif"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          {helperText ? (
            <span className="font-semibold text-gray-500">{helperText}</span>
          ) : (
            <>
              <span className="font-semibold text-accent">
                Carga una imagen{' '}
              </span>
              o arrastra y suelta <br />
              <span className="text-xs text-body">PNG, JPG</span>
            </>
          )}
        </p>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
      </Upload.Dragger>

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

export default Uploader
