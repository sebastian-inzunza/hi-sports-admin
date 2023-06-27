import UserListIndex from '@/components/message/user-list-index'
import { useRouter } from 'next/router'
import UserMessageIndex from '../user-message-index'

export default function MessagePageIndex() {
  const { query } = useRouter()
  return <>{query?.id ? <UserMessageIndex /> : <UserListIndex />}</>
}
