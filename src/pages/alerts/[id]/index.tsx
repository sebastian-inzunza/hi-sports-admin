import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function AlertDetail() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Alert Detail</h1>
      </div>
      {/*  */}
    </>
  )
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
