import { StoreNotice, StoreNoticeInput } from "@/types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";

export const storeNoticeClient = {
  ...crudFactory<StoreNotice, any, StoreNoticeInput>(
    API_ENDPOINTS.STORE_NOTICES
  ),
};
