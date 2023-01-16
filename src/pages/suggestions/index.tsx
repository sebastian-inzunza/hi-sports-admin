import Card from '@/components/common/card'
import Layout from '@/components/layout/admin'
import SuggestionList from '@/components/suggestions/suggestions-list'
import { useSuggestionsQuery } from '@/data/suggestions'

export default function Suggestions() {
  const { suggestions, loading, error } = useSuggestionsQuery()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <h1 className="text-xl font-semibold text-heading">Sugerencias</h1>
        </div>
      </Card>
      <SuggestionList suggestions={suggestions} />
    </>
  )
}

Suggestions.Layout = Layout
