import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'react-use'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import {
  offset,
  flip,
  useFloating,
  shift,
} from '@floating-ui/react-dom-interactions'

import { DataChat } from '@/types'
import { useMeQuery } from '@/data/user'
import { adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils'
import { RESPONSIVE_WIDTH } from '@/utils/constants'
import { ArrowDown } from '@/components/icons/arrow-down'
import Avatar from '@/components/common/avatar'
import { siteSettings } from '@/settings/site.settings'
import MessageNotFound from './no-message-found'

interface Props {
  conversation?: DataChat
  className?: string
  id?: string
  listen?: boolean
  loading?: boolean
  messages: any[]
  error: any
  classes: any
  isSuccess: boolean
  children: React.ReactNode
  isLoadingMore: boolean
  isFetching: boolean
}

const UserMessageView = ({
  conversation,
  className,
  id,
  listen,
  messages = [],
  error,
  loading,
  classes,
  isSuccess,
  children,
  isLoadingMore,
  isFetching,
  ...rest
}: Props) => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const [visible, setVisible] = useState(false)
  const { data, isLoading: meLoading, error: meError } = useMeQuery()
  const messagesEndRef = useRef(null)
  const { permissions } = getAuthCredentials()
  let permission = hasAccess(adminOnly, permissions)
  const { x, y, reference, floating, strategy, update, refs } = useFloating({
    strategy: 'fixed',
    placement: 'bottom',
    middleware: [offset(-80), flip(), shift()],
  })

  // default scroll to bottom
  const defaultScrollToBottom = () => {
    //@ts-ignore
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    // chatBody?.scrollTo({
    //   top: chatBody?.scrollHeight,
    //   behavior: 'smooth',
    // });
  }

  return (
    <>
      <div
        id={id}
        className="relative flex-auto overflow-y-auto overflow-x-hidden px-6 pb-14 pt-10"
        ref={reference}
        style={{
          maxHeight:
            width >= RESPONSIVE_WIDTH
              ? 'calc(100vh - 336px)'
              : 'calc(100vh - 300px)',
        }}
        {...rest}
      >
        <div
          onClick={scrollToBottom}
          className={`flex h-10 w-10 transform cursor-pointer rounded-full border border-solid border-[#F3F4F6] bg-[#F3F4F6] text-black shadow-lg transition-all duration-300 hover:border-accent-hover hover:bg-accent-hover hover:text-white ${
            visible
              ? 'visible translate-y-0 opacity-100'
              : 'invisible translate-y-1 opacity-0'
          }`}
          ref={floating}
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? '',
            zIndex: 50,
          }}
        >
          <ArrowDown height="14" width="14" className="m-auto" />
        </div>
         {/* render loader */}
        {children}
        {/* render content */}
        {isSuccess ? (
          <>
            {!isEmpty(messages) ? (
              <div className="space-y-6">
                {messages?.map((item: any, key: number) => {
                  const { body, created_at, user_id, conversation } = item
                  const checkUser = Number(data?.id) === Number(user_id)
                  let avatarUrl = !permission
                    ? conversation?.user?.profile?.avatar?.thumbnail
                    : item?.conversation?.shop?.logo?.thumbnail
                  return (
                    <div
                      className={`flex w-full gap-x-3 ${
                        checkUser ? 'flex-row-reverse' : ''
                      }`}
                      key={key}
                    >
                      {checkUser ? null : (
                        <div className="w-10">
                          <Avatar
                            src={avatarUrl ?? siteSettings?.avatar?.placeholder}
                            {...rest}
                            alt="avatar"
                          />
                        </div>
                      )}
                      <div
                        className={`w-full sm:w-2/4 ${
                          checkUser ? 'text-right' : 'text-left'
                        }`}
                      >
                        <div className="space-y-1">
                          <h2
                            className={`${cn(
                              classes?.common,
                              checkUser ? classes?.default : classes?.reverse
                            )}`}
                          >
                            {body.replace(/['"]+/g, '')}
                          </h2>
                        </div>
                        <div className="mt-2 text-xs text-[#686D73]">
                          {dayjs().to(dayjs.utc(created_at))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <>
                <MessageNotFound />
              </>
            )}
          </>
        ) : (
          ''
        )}
        <div ref={messagesEndRef} />
      </div>
    </>
  )
}

export default UserMessageView
