import { useTranslation } from 'react-i18next'
import Card from '../common/card'
import Image from 'next/image'
import { siteSettings } from '@/settings/site.settings'
import Link from 'next/link'
import { StarIcon } from '../icons/star-icon'
import { CheckedIcon } from '../icons/checked'
import { SuggestionsResponse } from '@/types/suggestions'
import { Routes } from '@/config/routes'

const SuggestionDetailView = ({
  suggestion,
}: {
  suggestion: SuggestionsResponse
}) => {
  const { t } = useTranslation()

  console.log('Information about the suggestion: ', suggestion)

  return (
    <Card className="md:px-10 xl:px-20">
      <h3 className="mb-8 text-center text-3xl font-semibold text-heading">
        {t('common:text-suggestion-report')}
      </h3>

      <div className="mb-10 flex w-full items-start space-x-4 rtl:space-x-reverse md:space-x-5">
        <div className="relative h-20 w-20 shrink-0 border border-gray-200">
          <Image
            src={suggestion.user.image ?? siteSettings.logo.url}
            alt={siteSettings.name}
            width={75}
            height={75}
            className="overflow-hidden rounded"
          />
        </div>

        <div className="flex flex-col space-y-1.5 pe-4 md:pe-5">
          <Link
            href={Routes?.users?.details({
              id: suggestion?.user.id.toString() ?? '',
            })}
            className="text-lg font-semibold text-heading transition-colors hover:text-accent hover:no-underline focus:text-accent-700 focus:no-underline"
          >
            {suggestion?.user.firstName} {suggestion?.user.lastName}
          </Link>
          <div className="!ml-auto inline-flex shrink-0 items-center rounded-full border border-accent px-3 py-0.5 text-base text-accent">
            {suggestion.rating}
            <StarIcon className="h-3 w-3 ms-1" />
          </div>
        </div>

        {/* // Ratings details */}
        <div className="mb-8 block">
          <div className="mb-5 flex items-center justify-between">
            <div className="inline-flex shrink-0 items-center rounded-full border border-accent px-3 py-0.5 text-base text-accent">
              Suggestion
            </div>
          </div>

          <div className="mb-3 flex items-center text-xs text-gray-500">
            {suggestion.content}
          </div>
          <div className="mb-3 flex items-center text-xs text-gray-500">
            {t('common:text-by')}{' '}
            <span className="font-semibold text-heading ltr:ml-1 rtl:mr-1">
              {suggestion.user.firstName} - {suggestion.user.email}
            </span>
            <CheckedIcon className="h-[13px] w-[13px] text-gray-700 ltr:ml-1 rtl:mr-1" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SuggestionDetailView
