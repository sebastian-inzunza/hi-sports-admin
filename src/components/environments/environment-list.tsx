import Image from 'next/image'

import { Environment, MappedPaginatorInfo } from '@/types'
import { AlignType, Table } from '../ui/table'
import Pagination from '../ui/pagination'
import { siteSettings } from '@/settings/site.settings'

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
  const columns: any = [
    {
      title: 'Logo',
      dataIndex: 'environemnts',
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
