import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";

export const settingsClient = {
  ...crudFactory<any, any, Error>(API_ENDPOINTS.SETTINGS),
};
