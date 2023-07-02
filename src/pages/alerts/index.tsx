import { useTranslation } from 'next-i18next'
import Card from '@/components/common/card'

export default function Alerts() {
  const { t } = useTranslation()

  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-customers')}
          </h1>
        </div>
      </Card>
    </>
  )
}
