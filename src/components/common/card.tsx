import cn from 'classnames'
import React, { useRef, useEffect } from 'react'

type Props = {
  className?: string
  onClickOutside?: () => void
} & React.HTMLAttributes<HTMLDivElement>

const Card: React.FC<Props> = ({
  className,
  onClickOutside,
  onClick,
  children,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClickOutside?.()
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClickOutside])

  return (
    <div
      className={cn('rounded bg-light p-5 shadow md:p-8', className)}
      ref={cardRef}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
