import CreateOrUpdateNoteForm from '@/components/blog/note-form'
import Layout from '@/components/layout/admin'

export default function CreateNotePage() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crea una nota</h1>
      </div>
      <CreateOrUpdateNoteForm />
    </>
  )
}

CreateNotePage.Layout = Layout
