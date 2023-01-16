/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from '@/components/ui/table'
import Image from 'next/image'
import { siteSettings } from '@/settings/site.settings'
import ActionButtons from '../ui/action-buttons'
import { UsersResponse } from '@/types/users'
import { MappedPaginatorInfo } from '@/types/index'
import Pagination from '../ui/pagination'

type UserListProps = {
  users: UsersResponse[]
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (current: number) => void
}
const UserList = ({ users, paginatorInfo, onPagination }: UserListProps) => {
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'users',
      key: 'users',
      render: (image: string) => (
        <Image
          src={image ?? siteSettings.logo.url}
          alt="Avatar"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <ActionButtons id={id} userStatus={true} showMakeAdminButton={true} />
      ),
    },
  ]
  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table columns={columns} data={users} />
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

export default UserList
