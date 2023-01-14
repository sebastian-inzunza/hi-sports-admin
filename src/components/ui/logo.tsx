import Image from 'next/image'
import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={110}
        height={110}
        loading="eager"
      />
    </Link>
  )
}

export default Logo
