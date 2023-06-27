import cn from 'classnames'
import { useWindowSize } from 'react-use'
import isEmpty from 'lodash/isEmpty'

import { LIMIT, RESPONSIVE_WIDTH } from '@/utils/constants'
import UserMessageView from './views/message-view'
import {
  useConversationQuery,
  useMessageSeen,
  useMessagesQuery,
} from '@/data/conversations'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Loader from '../ui/loader/loader'
import MessageCardLoader from './content-loader'
import CreateMessageForm from './views/form-view'
import SelectConversation from './views/select-conversation'
import { useTranslation } from 'react-i18next'
import ErrorMessage from '../ui/error-message'

interface Props {
  className?: string
}
const UserMessageIndex = ({ className, ...rest }: Props) => {
  const { t } = useTranslation()
  const loadMoreRef = useRef(null)
  const router = useRouter()
  const { mutate: createSeenMessage } = useMessageSeen()
  const { query } = router
  // const { data, loading, error } = useConversationQuery({
  //   id: query.id as string,
  // });
  const { width } = useWindowSize()
  let {
    error: messageError,
    messages,
    loading: messageLoading,
    isSuccess,
    hasMore,
    loadMore,
    isLoadingMore,
    isFetching,
  } = useMessagesQuery({
    conversationId: query?.id as string,
    limit: LIMIT,
  })

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

  messages = [...messages].reverse()
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
      //   conve: query?.id as string,
      // });
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
                  seenMessage(Boolean(data?.unseen))
                }}
              >
                {/* @ts-ignore */}
                <HeaderView shop={data?.shop} />

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
                  {Boolean(data?.shop?.is_active) ? (
                    <>
                      <CreateMessageForm />
                    </>
                  ) : (
                    <>
                      {/* @ts-ignore */}
                      <BlockedView name={data?.shop?.name} />
                    </>
                  )}
                </div>
              </div>
            ) : (
              <Loader
                className="!h-full"
                text={t('common:text-loading') ?? ''}
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
