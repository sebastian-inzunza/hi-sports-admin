/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlignType, Table } from '@/components/ui/table'
import Image from 'next/image'
import { siteSettings } from '@/settings/site.settings'
import ActionButtons from '../ui/action-buttons'
import { UsersResponse } from '@/types/users'
import { MappedPaginatorInfo } from '@/types/index'
import Pagination from '../ui/pagination'
import Badge from '../ui/badge'
import StatusColor from './user-role-status-color'

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
      align: 'center' as AlignType,
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
      align: 'center' as AlignType,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
      align: 'center' as AlignType,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType,
    },
    {
      title: 'Estatus',
      dataIndex: 'banned',
      key: 'banned',
      align: 'center' as AlignType,
      render: (banned: true) => (
        <Badge
          text={banned ? 'Inactivo' : 'Activo'}
          color={StatusColor(banned)}
        />
      ),
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as AlignType,
      render: (id: string, { banned, role }: UsersResponse) => {
        // console.log('is_active', is_active)
        return (
          <ActionButtons
            id={id}
            userStatus={true}
            isUserActive={!banned}
            showMakeAdminButton={true}
            showContact={true}
            role={role}
          />
        )
      },
    },
  ]
  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table columns={columns} data={users} rowKey={'id'} />
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
