import Card from '@/components/common/card'
import Layout from '@/components/layout/admin'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'

export default function Environments() {
  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-xl font-semibold text-heading">
            Ambientes de trabajo
          </h1>
        </div>
        <div>
          <LinkButton
            href={Routes.environments.create}
            className="h-12 w-full md:w-auto md:ms-6"
          >
            <span className="hidden xl:block">+ Agregar</span>
            <span className="xl:hidden">+ Agregar ambiente</span>
          </LinkButton>
        </div>
      </Card>
    </>
  )
}
Environments.Layout = Layout
