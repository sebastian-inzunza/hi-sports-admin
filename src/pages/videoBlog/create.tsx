import Layout from '@/components/layout/admin'
import VideoBlogForm from '@/components/videoBlog/videblog-form'

export default function CreateVideobLog() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crear video blog</h1>
      </div>

      <VideoBlogForm />
    </>
  )
}

CreateVideobLog.Layout = Layout
