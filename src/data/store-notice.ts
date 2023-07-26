import Router, { useRouter } from 'next/router'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { storeNoticeClient } from './client/store-notice'

import {
  Notice,
  ReceivedData,
  StoreNoticePaginator,
  StoreNoticeQueryOptions,
} from '@/types'

import { Routes } from '@/config/routes'
import { API_ENDPOINTS } from './client/api-endpoints'
import { Config } from '@/config'
import { mapPaginatorData } from '@/utils/data-mappers'

export const useCreateStoreNoticeMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { t } = useTranslation()

  return useMutation(storeNoticeClient.create, {
    onSuccess: async () => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.storeNotice.list}`
        : Routes.storeNotice.list
      await Router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      })
      toast.success(t('common:successfully-created'))
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.STORE_NOTICES)
    },
    onError: (error: any) => {
      toast.error(t(`common:${error?.response?.data.message}`))
    },
  })
}

export const useDeleteStoreNoticeMutation = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation(storeNoticeClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'))
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.STORE_NOTICES)
    },
    onError: (error: any) => {
      toast.error(t(`common:${error?.response?.data.message}`))
    },
  })
}

export const useUpdateStoreNoticeMutation = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation(storeNoticeClient.update, {
    onSuccess: async (data: any) => {
      console.log('data', data.data)
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.id}${Routes.storeNotice.list}`
        : Routes.storeNotice.list
      await router.push(
        `${generateRedirectUrl}/${data?.data?.id}/edit`,
        undefined,
        {
          locale: Config.defaultLanguage,
        }
      )
      toast.success(t('common:successfully-updated'))
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.STORE_NOTICES)
    },
    onError: (error: any) => {
      toast.error(t(`common:${error?.response?.data.message}`))
    },
  })
}

export const useStoreNoticeQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<ReceivedData, Error>(
    [`${API_ENDPOINTS.STORE_NOTICES}/${id}`],
    () => storeNoticeClient.get({ id })
  )
  return {
    storeNotice: data?.data,
    error,
    loading: isLoading,
  }
}

export const useStoreNoticesQuery = (
  options: Partial<StoreNoticeQueryOptions>
) => {
  const { data, error, isLoading } = useQuery<StoreNoticePaginator, Error>(
    [API_ENDPOINTS.STORE_NOTICES, options],
    ({ queryKey, pageParam }) =>
      storeNoticeClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    }
  )

  return {
    storeNotices: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  }
}
