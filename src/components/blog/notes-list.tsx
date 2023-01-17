/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlignType, Table } from '@/components/ui/table'
import { Routes } from '@/config/routes'
// import { useUpdateNoteMutation } from '@/data/blog'
import { Note } from '@/types/blog'
import { MappedPaginatorInfo } from '@/types/index'
import { Switch } from '@headlessui/react'
import Image from 'next/image'
import LanguageSwitcher from '../ui/lang-action/action'
import Pagination from '../ui/pagination'
import TitleWithSort from '../ui/title-with-sort'

type NotesListProps = {
  notes: Note[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (page: number) => void
}

const NotesList = ({ notes, paginatorInfo, onPagination }: NotesListProps) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as AlignType,
      width: 64,
    },
    {
      title: 'Imágen',
      dataIndex: 'image',
      key: 'image',
      align: 'center' as AlignType,
      width: 74,
      render: (image: string) => (
        <Image
          src={image}
          alt="artile"
          className="overflow-hidden rounded"
          width={42}
          height={42}
        />
      ),
    },
    {
      title: <TitleWithSort title="Título" ascending={true} isActive={false} />,
      dataIndex: 'title',
      key: 'title',
      align: 'center' as AlignType,
      width: 170,
    },
    {
      title: 'Contenido',
      dataIndex: 'content',
      key: 'content',
      align: 'center' as AlignType,
    },
    {
      title: 'Aprobado',
      dataIndex: 'is_approved',
      key: 'is_approved',
      align: 'center' as AlignType,

      render: function Render(is_approved: boolean, record: any) {
        // const { mutate: updateNote } = useUpdateNoteMutation()
        // function handleChange() {
        //   console.log('Updated', record)
        //   updateNote({
        //     ...record,
        //     id: record.id,
        //     is_approved: !is_approved,
        //   })
        // }

        return (
          <Switch
            checked={is_approved}
            onChange={() => console.log('Updated', record)}
            className={`${
              is_approved ? 'bg-accent' : 'bg-gray-300'
            } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none`}
          >
            <span className="sr-only">Enable</span>
            <span
              className={`${
                is_approved ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-light`}
            />
          </Switch>
        )
      },
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as AlignType,
      width: 64,
      render: (id: string, record: any) => (
        <LanguageSwitcher
          id={id}
          slug={record.slug}
          record={record}
          routes={Routes.blog}
          deleteModalView="DELETE_NOTE"
        />
      ),
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
