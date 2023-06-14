import cn from 'classnames'
import { SelectConversationIcon } from '@/components/icons/select-conversation'

interface Props {
  className?: string
}

const SelectConversation = ({ className, ...rest }: Props) => {
  return (
    <>
      <div className={cn('m-auto w-full', className)} {...rest}>
        <div className="text-center">
          <SelectConversationIcon className="mx-auto mb-14" />
          <h2 className="text-xl font-medium">
            Selecciona una conversación para comenzar
          </h2>
        </div>
      </div>
    </>
  )
}

export default SelectConversation
