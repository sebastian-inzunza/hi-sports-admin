import Layout from '@/components/layout/app'
import UserListIndex from '@/components/conversations/user-list-index'

import Card from '@/components/common/card'
import { useWindowSize } from '@/utils/use-window-size'
import { RESPONSIVE_WIDTH } from '@/utils/constants'

function ConversationsPage() {
  const { width } = useWindowSize()
  return (
    <>
      <Card
        className="!shadow-chatBox h-full overflow-hidden !p-0"
        style={{ maxHeight: 'calc(100% - 5px)' }}
      >
        {/* {width >= RESPONSIVE_WIDTH ? (
          <div className="flex h-full flex-wrap overflow-hidden">
            <UserListIndex />

            <UserMessageIndex />
          </div>
        ) : (
          <ResponsiveView />
        )} */}
      </Card>
    </>
  )
}

ConversationsPage.Layout = Layout

export default ConversationsPage
