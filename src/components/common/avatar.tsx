import cn from 'classnames'
import Image from 'next/image'

type AvatarProps = {
  className?: string
  src: string
  alt?: string
  width?: number
  height?: number
  online?: boolean
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  className,
  alt = 'Avatar',
  onClick,
  online,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'relative h-10 w-10 cursor-pointer overflow-hidden rounded-full border border-border-100',
        className
      )}
      {...rest}
    >
      <Image
        alt={alt}
        src={src}
        fill
        priority={true}
        sizes="(max-width: 768px) 100vw"
      />

      {online && (
        <span
          className="z-2 absolute right-0 top-0 my-1 h-4 w-4 rounded-full border-2 border-white bg-green-400"
          title="Online"
        />
      )}
      {!online && (
        <span
          className="absolute right-0 top-0 my-1 h-4 w-4 rounded-full border-2 border-white bg-red-500"
          title="Offline"
        />
      )}
    </div>
  )
}

export default Avatar
