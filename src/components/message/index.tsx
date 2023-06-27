import { useWindowSize } from 'react-use'
import Card from '../common/card'
import { RESPONSIVE_WIDTH } from '@/utils/constants'
import ResponsiveView from '@/components/message/views/responsive-view'
import UserListIndex from './user-list-index'
import UserMessageIndex from './user-message-index'

export default function MessagePageIndex() {
  const { width } = useWindowSize()

  return (
    <>
      <Card
        className="h-full overflow-hidden !p-0 !shadow-chatBox"
        style={{ maxHeight: 'calc(100% - 5px)' }}
      >
        {width >= RESPONSIVE_WIDTH ? (
          <div className="flex h-full flex-wrap overflow-hidden">
            <UserListIndex />

            <UserMessageIndex />
          </div>
        ) : (
          <>
            <ResponsiveView />
          </>
        )}
      </Card>
    </>
  )
}
