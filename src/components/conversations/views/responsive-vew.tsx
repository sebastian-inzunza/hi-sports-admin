import UserListIndex from '@/components/conversations/user-list-index'
import { useRouter } from 'next/router'
import UserMessageIndex from '@/components/conversations/user-message-index'

export default function MessagePageIndex() {
  const { query } = useRouter()
  return <>{query?.id ? <UserMessageIndex /> : <UserListIndex />}</>
}
