import ActionButtons from '@/components/common/action-buttons'
import { NoShop } from '@/components/icons/no-shop'
import Badge from '@/components/ui/badge/badge'
import LanguageSwitcher from '@/components/ui/lang-action/action'
import Pagination from '@/components/ui/pagination'
import { Table } from '@/components/ui/table'
import TitleWithSort from '@/components/ui/title-with-sort'
import { Routes } from '@/config/routes'
import { MappedPaginatorInfo, SortOrder, Notice } from '@/types'
import { useIsRTL } from '@/utils/locals'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PriorityColor from './priority-color'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

type IProps = {
  notices: Notice[] | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (current: number) => void
  onSort: (current: any) => void
  onOrder: (current: string) => void
}
const StoreNoticeList = ({
  notices,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { alignLeft, alignRight } = useIsRTL()
  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder
    column: string | null
  }>({
    sort: SortOrder?.Desc,
    column: null,
  })

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder?.Desc
          ? SortOrder?.Asc
          : SortOrder?.Desc
      )
      onOrder(column!)

      setSortingObj({
        sort:
          sortingObj?.sort === SortOrder?.Desc
            ? SortOrder?.Asc
            : SortOrder?.Desc,
        column: column,
      })
    },
  })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: (
        <TitleWithSort
          title={'Titulo'}
          ascending={
            sortingObj?.sort === SortOrder?.Asc &&
            sortingObj?.column === 'notice'
          }
          isActive={sortingObj?.column === 'notice'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'notice',
      key: 'notice',
      align: alignLeft,
      ellipsis: true,
      width: 200,
      onHeaderCell: () => onHeaderClick('notice'),
      render: (text: string) => (
        <span className="whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-description')}
          ascending={
            sortingObj?.sort === SortOrder?.Asc &&
            sortingObj?.column === 'description'
          }
          isActive={sortingObj?.column === 'description'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'description',
      key: 'description',
      align: alignLeft,
      width: 300,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('description'),
      render: (text: string) => (
        <span className="whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-type')}
          ascending={
            sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'type'
          }
          isActive={sortingObj?.column === 'type'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 140,
      onHeaderCell: () => onHeaderClick('type'),
      render: (text: string) => {
        const typeText: string = text?.replace(/_/g, ' ')
        const finalResult: string =
          typeText?.charAt(0)?.toUpperCase() + typeText?.slice(1)
        return <span className="whitespace-nowrap">{finalResult}</span>
      },
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-effective-from')}
          ascending={
            sortingObj?.sort === SortOrder?.Asc &&
            sortingObj?.column === 'effectiveFrom'
          }
          isActive={sortingObj?.column === 'effectiveFrom'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'effectiveFrom',
      key: 'effectiveFrom',
      align: 'center',
      width: 130,
      onHeaderCell: () => onHeaderClick('effectiveFrom'),
      render: (effectiveFrom: string) => (
        <span className="whitespace-nowrap">
          {dayjs()?.to(dayjs?.utc(effectiveFrom)?.tz(dayjs?.tz?.guess()))}
        </span>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-expired-at')}
          ascending={
            sortingObj?.sort === SortOrder?.Asc &&
            sortingObj?.column === 'expiredAt'
          }
          isActive={sortingObj?.column === 'expiredAt'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
      align: 'center',
      width: 130,
      onHeaderCell: () => onHeaderClick('expiredAt'),
      render: (expiredAt: string) => (
        <span className="whitespace-nowrap">
          {dayjs()?.to(dayjs?.utc(expiredAt)?.tz(dayjs?.tz?.guess()))}
        </span>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-issued-by')}
          ascending={
            sortingObj?.sort === SortOrder?.Asc &&
            sortingObj?.column === 'creator'
          }
          isActive={sortingObj?.column === 'creator'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
      width: 100,
      onHeaderCell: () => onHeaderClick('creator_role'),
      render: (text: string) => (
        <span className="whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-priority')}
          ascending={
            sortingObj?.sort === SortOrder?.Asc &&
            sortingObj?.column === 'priority'
          }
          isActive={sortingObj?.column === 'priority'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'priority',
      key: 'priority',
      align: 'center',
      width: 120,
      onHeaderCell: () => onHeaderClick('priority'),
      render: (text: string) => (
        <Badge
          text={text}
          className="font-medium uppercase"
          color={PriorityColor(text)}
        />
      ),
    },
    {
      title: t('table:table-item-actions'),
      key: 'actions',
      align: alignRight,
      width: 150,
      render: (data: Notice) => {
        return (
          <>
            <ActionButtons
              id={data?.id?.toString() ?? ''}
              editUrl={Routes?.storeNotice?.edit({
                id: data?.id?.toString() ?? '',
              })}
              customLocale={router?.locale}
            />
          </>
        )
      },
    },
  ]
  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={() => (
            <div className="flex flex-col items-center py-6">
              <div className="relative w-72 sm:h-80 sm:w-96">
                <NoShop />
              </div>
              <div className="pt-6 text-sm font-semibold">
                {t('table:empty-table-data')}
              </div>
            </div>
          )}
          data={notices ?? []}
          rowKey="id"
          scroll={{ x: 1000 }}
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

export default StoreNoticeList
