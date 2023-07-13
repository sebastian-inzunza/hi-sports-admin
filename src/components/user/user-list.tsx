/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { siteSettings } from '@/settings/site.settings'
import { Role, UsersResponse } from '@/types/users'
import { MappedPaginatorInfo } from '@/types/index'
import StatusColor from './user-role-status-color'
import Badge from '../ui/badge/badge'
import { AlignType, Table } from '../ui/table'
import ActionButtons from '../common/action-buttons'
import Pagination from '../ui/pagination'
import { useRouter } from 'next/router'

type UserListProps = {
  users: UsersResponse[]
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (current: number) => void
}
const UserList = ({ users, paginatorInfo, onPagination }: UserListProps) => {
  const router = useRouter()

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
        return (
          <ActionButtons
            id={id}
            userStatus={true}
            isUserActive={!banned}
            showMakeAdminButton={true}
            detailsUrl={`${router.asPath}/${id}`}
            role={role as Role}
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
