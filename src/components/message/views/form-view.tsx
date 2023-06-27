import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import TextArea from '@/components/ui/text-area'
import { useSendMessage } from '@/data/conversations'
import Button from '@/components/ui/button'
import { SendMessageIcon } from '@/components/icons/send-message'

interface Props {
  className?: string
}

type FormValues = {
  content: string
}

const messageSchema = yup.object().shape({
  content: yup.string().required('error-body-required'),
})

const CreateMessageForm = ({ className, ...rest }: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(messageSchema),
  })

  const router = useRouter()
  const { query } = router

  const { mutate: createMessage, isLoading: creating } = useSendMessage()

  useEffect(() => {
    const listener = (event: any) => {
      if (event.key === 'Enter' && event.shiftKey) {
        return false
      }
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        // const values = getValues();
        // onSubmit(values);
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [query?.id])

  const onSubmit = async (values: FormValues) => {}

  useEffect(() => {
    setFocus('content')
  }, [setFocus])

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          {!!creating ? (
            <div className="absolute left-0 top-0 z-50 flex h-full w-full cursor-not-allowed bg-[#EEF1F4]/50">
              <div className="m-auto h-5 w-4 animate-spin rounded-full border-2 border-t-2 border-transparent border-t-accent"></div>
            </div>
          ) : (
            ''
          )}
          <TextArea
            className="overflow-y-auto overflow-x-hidden shadow-chatBox"
            placeholder="Type your message here.."
            {...register('content')}
            variant="solid"
            inputClassName="!border-0 bg-white pr-12 block !h-full"
            rows={3}
            disabled={!!creating}
          />
          <div className="absolute right-0 top-0 h-full">
            <Button
              className="!h-full px-4 text-lg focus:!shadow-none focus:!ring-0"
              variant="custom"
              disabled={!!creating}
            >
              <SendMessageIcon />
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateMessageForm
