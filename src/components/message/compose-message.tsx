import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import isEmpty from 'lodash/isEmpty'

import { MessageAvatarPlaceholderIcon } from '@/components/icons/message-avatar-placeholder-icon'
import Button from '@/components/ui/button'
import Select from '../select/select'
import { useUsersQuery, useMeQuery } from '@/data/users'
import { useCreateConversations } from '@/data/conversations'
import ErrorMessage from '../ui/error-message'

type FormatOptionLabelProps = {
  firstName: string
  lastName: string
  image: string
}

const formatOptionLabel = ({
  image,
  firstName,
  lastName,
}: FormatOptionLabelProps) => (
  <div className="flex items-center">
    <div className="relative mr-3 h-6 w-6 shrink-0 overflow-hidden rounded-full">
      {!isEmpty(image) ? (
        <Image
          src={image}
          alt={firstName}
          className="product-image object-contain"
          fill
          sizes="(max-width: 768px) 100vw"
        />
      ) : (
        <MessageAvatarPlaceholderIcon
          className="text-[1.5rem]"
          color="#DDDDDD"
        />
      )}
    </div>
    <div className="truncate">
      {firstName} {lastName}
    </div>
  </div>
)

const ComposeMessageModal = () => {
  const { data } = useMeQuery()
  const { t } = useTranslation()
  const { handleSubmit } = useForm()
  const [user, setUser] = useState<any>(null)
  const [active, setIsActive] = useState<boolean>(Boolean(0))
  const [page, setPage] = useState(1)
  const {
    mutate: createConversation,
    isLoading: creating,
    error: errorSending,
  } = useCreateConversations()

  const { users, loading, error } = useUsersQuery({
    limit: 100,
    page,
  })

  if (errorSending) return <ErrorMessage message={error?.message} />

  const onTypeFilter = (user: any | undefined) => {
    setUser(user)
    setIsActive(user?.banned)
  }

  async function onSubmit() {
    if (user || !Boolean(active)) {
      createConversation({
        recipientId: user?.id,
      })
    }
  }
  return (
    <div className="m-auto block max-w-lg rounded bg-light p-6 md:w-[32.5rem]">
      <h2 className="mb-6 text-base font-medium">{t('text-starting-chat')}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          options={users ?? []}
          isLoading={loading}
          getOptionLabel={(option: any) => option?.firstName ?? ''}
          getOptionValue={(option: any) => option?.id ?? ''}
          placeholder="Encuentra a un usuario"
          onChange={onTypeFilter as any}
          isClearable={true}
          // @ts-ignore
          formatOptionLabel={formatOptionLabel}
        />
        <div className="mt-6 text-right">
          <Button
            className="px-4 text-base "
            loading={creating}
            disabled={!user || Boolean(active)}
          >
            {t('text-start-conversation')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ComposeMessageModal
