import CreateOrUpdateNoteForm from '@/components/blog/note-form'
import Layout from '@/components/layout/admin'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader'
import { useNoteQuery } from '@/data/blog'
import { useRouter } from 'next/router'

export default function UpdatePostPage() {
  const router = useRouter()
  const {
    query: { slug },
  } = router
  const { data, isLoading, error } = useNoteQuery({ slug: slug as string })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Actualiza la publicación
        </h1>
      </div>
      <CreateOrUpdateNoteForm initialValues={data} />
    </>
  )
}

UpdatePostPage.Layout = Layout
