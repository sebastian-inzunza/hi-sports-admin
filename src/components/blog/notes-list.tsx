/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlignType, Table } from '@/components/ui/table'
import { Routes } from '@/config/routes'
import { useUpdateNoteMutation } from '@/data/blog'
import { Note } from '@/types/blog'
import { MappedPaginatorInfo } from '@/types/index'
import { Switch } from '@headlessui/react'
import Image from 'next/image'
import LanguageSwitcher from '../ui/lang-action/action'
import Pagination from '../ui/pagination'
import TitleWithSort from '../ui/title-with-sort'
import ActionButtons from '../common/action-buttons'
import { useMeQuery } from '@/data/user'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import Badge from '../ui/badge/badge'
import StatusColor from './note-banned-color'

type NotesListProps = {
  notes: Note[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (page: number) => void
}

const NotesList = ({ notes, paginatorInfo, onPagination }: NotesListProps) => {
  const { t } = useTranslation()
  const { mutate: update, isLoading } = useUpdateNoteMutation()
  const { data } = useMeQuery()

  function changeStatus(note: Note, status: boolean) {
    update({
      id: note.id.toString(),
      is_approved: status,
    })
  }

  const columns: any = [
    {
      title: 'Imagen',
      dataIndex: 'image',
      key: 'image',
      align: 'center' as AlignType,
      width: 74,
      render: (image: string) => (
        <Image
          src={image ?? '/images/placeholder.png'}
          alt="artile"
          className="overflow-hidden rounded"
          width={42}
          height={42}
        />
      ),
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      align: 'center' as AlignType,
      width: 170,
    },

    {
      title: 'Fecha de creación',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center' as AlignType,
      render: function Render(record: any) {
        const date = new Date(record)
        const formateDate = format(date, 'yyyy-MM-dd HH:mm:ss.SSS')
        return <>{formateDate}</>
      },
    },
    {
      title: 'Estatus',
      dataIndex: 'banned',
      key: 'banned',
      align: 'center' as AlignType,
      render: (banned: true) => (
        <Badge
          text={!banned ? 'Inactivo' : 'Activo'}
          color={StatusColor(!banned)}
        />
      ),
    },

    // {
    //   title: 'Aprobado',
    //   dataIndex: 'is_approved',
    //   key: 'is_approved',
    //   align: 'center' as AlignType,

    //   render: function Render(is_approved: boolean, record: any) {
    //     return (
    //       <Switch
    //         checked={is_approved}
    //         onChange={(value) => changeStatus(record, value)}
    //         disabled={isLoading}
    //         className={`${
    //           is_approved ? 'bg-accent' : 'bg-gray-300'
    //         } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none`}
    //       >
    //         <span
    //           className={`${
    //             is_approved ? 'translate-x-6' : 'translate-x-1'
    //           } inline-block h-4 w-4 transform rounded-full bg-light`}
    //         />
    //       </Switch>
    //     )
    //   },
    //},
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',

      render: function Render(id: string, note: Note) {
        const { data } = useMeQuery()
        return (
          <>
            {/* {data?.id.toString() != id && ( */}
            <ActionButtons
              id={id}
              deleteModalView={
                data?.role === 'ADMIN_MEDIA'
                  ? ''
                  : note.banned
                  ? 'DELETE_NOTE'
                  : ''
              }
              detailsUrl={
                note.banned ? Routes.blog.details({ id: note.slug }) : ''
              }
              detailsUrlBlog={
                note.banned
                  ? Routes.blog.details({ id: note.slug }) + '/' + 'details'
                  : ''
              }
              blogStatus={data?.role === 'ADMIN_MEDIA' ? false : true}
              isBlogActive={note.banned}
            />
            {/* )} */}
          </>
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          rowKey="id"
          scroll={{ x: 900 }}
          columns={columns}
          emptyText="No hay notas creadas"
          data={notes ?? []}
        />
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

export default NotesList
