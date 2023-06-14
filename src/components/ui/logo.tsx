import Image from 'next/image'
import Link from 'next/link'

type Props = {
  className?: string
}
const Logo = (props: Props) => {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={110}
        height={110}
        loading="eager"
        {...props}
      />
    </Link>
  )
}

export default Logo
