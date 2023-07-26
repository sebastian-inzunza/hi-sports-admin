import Image from 'next/image'

import { Environment, MappedPaginatorInfo } from '@/types'
import { AlignType, Table } from '../ui/table'
import Pagination from '../ui/pagination'
import { siteSettings } from '@/settings/site.settings'
import ActionButtons from '../ui/action-buttons'
import { useRouter } from 'next/router'

type EnviromentListProps = {
  environments: Environment[]
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (current: number) => void
}

const EnviromentList = ({
  environments,
  paginatorInfo,
  onPagination,
}: EnviromentListProps) => {
  const router = useRouter()

  const columns: any = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      align: 'center' as AlignType,
      render: (image: string) => (
        <Image
          src={image ?? siteSettings.logo.url}
          alt="Logo"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as AlignType,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Primary Color',
      dataIndex: 'primary_color',
      key: 'primary_color',
      align: 'center' as AlignType,
    },
    {
      title: 'Secondary Color',
      dataIndex: 'secondary_color',
      key: 'secondary_color',
      align: 'center' as AlignType,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center' as AlignType,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center' as AlignType,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as AlignType,
      render: (id: string) => {
        return (
          <ActionButtons
            id={id}
            detailsUrl={`${router.asPath}/${id}`}
            deleteModalView={'DELETE_ENVIRONMENT'}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table columns={columns} data={environments} rowKey={'id'} />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  )
}

export default EnviromentList
