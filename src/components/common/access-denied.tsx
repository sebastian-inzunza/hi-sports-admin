import Image from 'next/image'
import Link from 'next/link'

const AccessDeniedPage = () => {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8"
      data-testid="access-denied"
    >
      <div className="relative h-80 w-full sm:h-96 3xl:h-[580px]">
        <Image
          alt={'Access Denied'}
          src="/access-denied.svg"
          width={120}
          height={120}
        />
      </div>

      <h3 className="mt-5 text-center text-xl font-bold text-sub-heading sm:mt-10 md:text-2xl 3xl:text-3xl">
        Access Denied
      </h3>
      <p className="mt-2 text-center text-sm text-body 3xl:text-xl">
        you don't have permission to access this page.
        <Link
          href="/"
          className="ps-1 text-accent transition-colors hover:text-accent-hover"
        >
          Go back
        </Link>
      </p>
    </div>
  )
}

export default AccessDeniedPage
