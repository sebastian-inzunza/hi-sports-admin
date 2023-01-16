/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadIcon } from '@/components/icons/upload-icon'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
// import { Attachment } from '@/types/index'
// import { CloseIcon } from '@/components/icons/close-icon'
// import Image from 'next/image'
// import { zipPlaceholder } from '@/utils/placeholders'
import { ACCEPTED_FILE_TYPES } from '@/utils/constants'
// import Loader from '../ui/loader'

// const getPreviewImage = (value: any) => {
//   let images: any[] = []
//   if (value) {
//     images = Array.isArray(value) ? value : [{ ...value }]
//   }
//   return images
// }
export default function Uploader({
  //   onChange,
  // value,
  multiple,
  acceptFile,
  helperText,
}: any) {
  const [error, setError] = useState<string | null>(null)
  const { getRootProps, getInputProps } = useDropzone({
    ...(!acceptFile ? { accept: 'image/*' } : { accept: ACCEPTED_FILE_TYPES }),
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        // upload(
        //   acceptedFiles, // it will be an array of uploaded attachments
        //   {
        //     onSuccess: (data: any) => {
        //       // Process Digital File Name section
        //       data &&
        //         data?.map((file: any, idx: any) => {
        //           const splitArray = file?.original?.split('/')
        //           const fileSplitName =
        //             splitArray[splitArray?.length - 1]?.split('.')
        //           const fileType = fileSplitName?.pop() // it will pop the last item from the fileSplitName arr which is the file ext
        //           const filename = fileSplitName?.join('.') // it will join the array with dot, which restore the original filename
        //           data[idx]['file_name'] = filename + '.' + fileType
        //         })
        //       let mergedData
        //       if (multiple) {
        //         mergedData = files.concat(data)
        //         setFiles(files.concat(data))
        //       } else {
        //         mergedData = data[0]
        //         setFiles(data)
        //       }
        //       if (onChange) {
        //         onChange(mergedData)
        //       }
        //     },
        //   }
        // )
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

  //   const handleDelete = (image: string) => {
  //     const images = files.filter((file) => file.thumbnail !== image)
  //     setFiles(images)
  //     if (onChange) {
  //       onChange(images)
  //     }
  //   }
  //   const thumbs = files?.map((file: any, idx) => {
  //     const imgTypes = [
  //       'tif',
  //       'tiff',
  //       'bmp',
  //       'jpg',
  //       'jpeg',
  //       'gif',
  //       'png',
  //       'eps',
  //       'raw',
  //     ]
  //     // let filename, fileType, isImage;
  //     if (file && file.id) {
  //       // const processedFile = processFileWithName(file);
  //       const splitArray = file?.file_name?.split('.')
  //       const fileType = splitArray?.pop() // it will pop the last item from the fileSplitName arr which is the file ext
  //       const filename = splitArray?.join('.') // it will join the array with dot, which restore the original filename
  //       const isImage = file?.thumbnail && imgTypes.includes(fileType) // check if the original filename has the img ext

  //       // Old Code *******

  //       // const splitArray = file?.original?.split('/');
  //       // let fileSplitName = splitArray[splitArray?.length - 1]?.split('.'); // it will create an array of words of filename
  //       // const fileType = fileSplitName.pop(); // it will pop the last item from the fileSplitName arr which is the file ext
  //       // const filename = fileSplitName.join('.'); // it will join the array with dot, which restore the original filename
  //       // const isImage = file?.thumbnail && imgTypes.includes(fileType); // check if the original filename has the img ext

  //       return (
  //         <div
  //           className={`relative mt-2 inline-flex flex-col overflow-hidden rounded me-2 ${
  //             isImage ? 'border border-border-200' : ''
  //           }`}
  //           key={idx}
  //         >
  //           {/* {file?.thumbnail && isImage ? ( */}
  //           {isImage ? (
  //             // <div className="flex h-16 w-16 min-w-0 items-center justify-center overflow-hidden">
  //             //   <Image
  //             //     src={file.thumbnail}
  //             //     width={56}
  //             //     height={56}
  //             //     alt="uploaded image"
  //             //   />
  //             // </div>
  //             <figure className="relative h-16 w-28">
  //               <Image
  //                 src={file.thumbnail}
  //                 alt={filename}
  //                 layout="fill"
  //                 objectFit="contain"
  //               />
  //             </figure>
  //           ) : (
  //             <div className="flex flex-col items-center">
  //               <div className="flex h-14 w-14 min-w-0 items-center justify-center overflow-hidden">
  //                 <Image
  //                   src={zipPlaceholder}
  //                   width={56}
  //                   height={56}
  //                   alt="upload placeholder"
  //                 />
  //               </div>
  //               <p className="flex cursor-default items-baseline p-1 text-xs text-body">
  //                 <span
  //                   className="inline-block max-w-[64px] overflow-hidden overflow-ellipsis whitespace-nowrap"
  //                   title={`${filename}.${fileType}`}
  //                 >
  //                   {filename}
  //                 </span>
  //                 .{fileType}
  //               </p>
  //             </div>
  //           )}
  //           {multiple ? (
  //             <button
  //               className="absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-light shadow-xl outline-none end-1"
  //               onClick={() => handleDelete(file.thumbnail)}
  //             >
  //               <CloseIcon width={10} height={10} />
  //             </button>
  //           ) : null}
  //         </div>
  //       )
  //     }
  //   })

  useEffect(
    () => () => {
      // Reset error after upload new file
      setError(null)

      // Make sure to revoke the data uris to avoid memory leaks
      // files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail))
    },
    []
  )

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

      {/* {(!!thumbs.length || loading) && (
        <aside className="mt-2 flex flex-wrap">
          {!!thumbs.length && thumbs}
          {loading && (
            <div className="mt-2 flex h-16 items-center ms-2">
              <Loader simple={true} className="h-6 w-6" />
            </div>
          )}
        </aside>
      )} */}
    </section>
  )
}
