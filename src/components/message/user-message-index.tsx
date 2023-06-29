import Loader from '@/components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import UserMessageView from '@/components/message/views/message-view'
import { useMessagesQuery } from '@/data/conversations'
import { useConversationQuery } from '@/data/conversations'
import { LIMIT } from '@/utils/constants'
import SelectConversation from '@/components/message/views/select-conversation'
import BlockedView from '@/components/message/views/blocked-view'
import CreateMessageForm from '@/components/message/views/form-view'
import HeaderView from '@/components/message/views/header-view'
import { useEffect, useRef } from 'react'
import MessageCardLoader from '@/components/message/content-loader'
import { useWindowSize } from '@/utils/use-window-size'
import { RESPONSIVE_WIDTH } from '@/utils/constants'
import ErrorMessage from '@/components/ui/error-message'
import { useMessageSeen } from '@/data/conversations'
import { useMeQuery } from '@/data/user'

interface Props {
  className?: string
}

const UserMessageIndex = ({ className, ...rest }: Props) => {
  const { t } = useTranslation()
  const loadMoreRef = useRef(null)
  const router = useRouter()
  const { query } = router

  const { data } = useMeQuery()
  const { width } = useWindowSize()
  let {
    error: messageError,
    messages,
    participants,
    loading: messageLoading,
    isSuccess,
    hasMore,
    loadMore,
    isLoadingMore,
    isFetching,
  } = useMessagesQuery({
    id: query?.id as string,
    limit: LIMIT,
  })

  const participant = participants?.find(
    (participant) => participant?.user?.id !== data?.id
  )

  useEffect(() => {
    if (!hasMore) {
      return
    }

    const option = { rootMargin: '-110px', threshold: [0, 0.25, 0.5, 0.75, 1] }

    const handleObserver = (entries: any[]) =>
      entries?.forEach((entry) => entry?.isIntersecting && loadMore())

    const observer = new IntersectionObserver(handleObserver, option)

    const element = loadMoreRef && loadMoreRef?.current

    if (!element) {
      return
    }

    observer?.observe(element)
  }, [loadMoreRef?.current, hasMore])

  const classes = {
    common: 'inline-block rounded-[13.5px] px-4 py-2 shadow-chat break-all',
    default: 'bg-white text-left',
    reverse: 'bg-accent text-white',
  }
  if (!isEmpty(query?.id) && messageError)
    return (
      <div className="flex !h-full flex-1 items-center justify-center bg-[#F3F4F6]">
        <ErrorMessage message={messageError?.message} />
      </div>
    )
  const seenMessage = (unseen: boolean) => {
    if (unseen) {
      // createSeenMessage({
      //   us: query?.id as string,
      // })
    }
  }

  return (
    <>
      <div
        className={cn(
          'flex h-full flex-1 bg-[#F3F4F6] pb-7',
          width >= RESPONSIVE_WIDTH ? '2xl:max-w-[calc(100% - 26rem)]' : '',
          className
        )}
        {...rest}
      >
        {!isEmpty(query?.id) ? (
          <>
            {!messageLoading ? (
              <div
                className={cn('flex h-full w-full flex-col')}
                onFocus={() => {
                  // @ts-ignore
                  seenMessage(Boolean(messages[0]?.unseen))
                }}
              >
                {/* @ts-ignore */}
                <HeaderView user={participant?.user} />

                <UserMessageView
                  messages={messages}
                  id="chatBody"
                  error={messageError}
                  loading={messageLoading}
                  classes={classes}
                  isSuccess={isSuccess}
                  isLoadingMore={isLoadingMore}
                  isFetching={isFetching}
                >
                  {hasMore ? (
                    <div ref={loadMoreRef} className="mb-4">
                      {isLoadingMore ? (
                        <MessageCardLoader
                          classes={classes}
                          limit={LIMIT / 2}
                        />
                      ) : (
                        <div className="hidden">No search left</div>
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                </UserMessageView>

                <div className="relative mx-6">
                  {/* @ts-ignore */}
                  {Boolean(!messages[0]?.sender?.banned) ? (
                    <>
                      <CreateMessageForm user={participant} />
                    </>
                  ) : (
                    <>
                      <BlockedView
                        name={messages[0].latestMessage.sender.firstName}
                      />
                    </>
                  )}
                </div>
              </div>
            ) : (
              <Loader
                className="!h-full"
                text={t('common:text-loading') ?? 'Loading...'}
              />
            )}
          </>
        ) : (
          <>{width >= RESPONSIVE_WIDTH ? <SelectConversation /> : ''}</>
        )}
      </div>
    </>
  )
}

export default UserMessageIndex
