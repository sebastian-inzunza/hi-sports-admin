import cn from 'classnames'
import Image from 'next/image'

type AvatarProps = {
  className?: string
  src: string
  alt?: string
  width?: number
  height?: number
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  className,
  alt = 'Avatar',
  ...rest
}) => {
  return (
    <div
      aria-label={alt}
      data-testid="avatar"
      className={cn(
        'relative cursor-pointer w-10 h-10 overflow-hidden rounded-full border border-border-100',
        className
      )}
      {...rest}
    >
      <Image
        alt={alt}
        src={src}
        priority={true}
        width={40}
        height={40}
        data-testid="image-avatar"
      />
    </div>
  )
}

export default Avatar
