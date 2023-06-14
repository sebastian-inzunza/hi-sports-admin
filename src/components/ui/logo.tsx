import { siteSettings } from '@/settings/site.settings'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  className?: string
}
const Logo = (props: Props) => {
  return (
    <Link href={siteSettings.logo.href} className="inline-flex" {...props}>
      <span
        className="relative overflow-hidden"
        style={{
          width: siteSettings.logo.width,
          height: siteSettings.logo.height,
        }}
      >
        <Image
          src={siteSettings.logo.url}
          alt={siteSettings.logo.alt}
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-contain"
          loading="eager"
        />
      </span>
    </Link>
  )
}

export default Logo
