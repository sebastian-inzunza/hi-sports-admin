/* eslint-disable @typescript-eslint/no-explicit-any */
import Uploader from '@/components/common/uploader'
import { Controller } from 'react-hook-form'

interface FileInputProps {
  control: any
  name: string
  acceptFile?: boolean
  helperText?: string
  defaultValue?: any
}

const FileInput = ({
  control,
  name,
  acceptFile = false,
  helperText,
  defaultValue = null,
}: FileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { ...rest } }) => (
        <Uploader {...rest} acceptFile={acceptFile} helperText={helperText} />
      )}
    />
  )
}

export default FileInput
