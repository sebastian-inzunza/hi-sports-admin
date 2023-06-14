import cn from 'classnames'

interface Props {
  className?: string
  name: string
}

const BlockedView = ({ className, name, ...rest }: Props) => {
  return (
    <>
      <div
        className={cn(
          'space-y-3 rounded bg-[#ebebeb] px-4 py-5 text-center',
          className
        )}
        {...rest}
      >
        <p className="text-lg">
          Has bloqueador los mensajes de <strong>{name}</strong> No. de cuenta
        </p>
        <p className="text-sm">
          No puedes enviar o recibir mensajes de esta persona.
        </p>
      </div>
    </>
  )
}

export default BlockedView
