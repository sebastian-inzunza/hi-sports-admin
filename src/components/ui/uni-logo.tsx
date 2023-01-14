import Link from 'next/link'
import Image from 'next/image'

const UniLogo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/uni-logo.png"
        alt="Logo"
        width={50}
        height={50}
        loading="eager"
      />
    </Link>
  )
}

export default UniLogo
