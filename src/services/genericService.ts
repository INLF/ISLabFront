import axios from "../axios/axiosInstance";

const API_BASE_URL = "/api"; 

export const fetchEntities = async <T>(
  entityName: string,
  filters: Record<string, any>,
  page: number,
  size: number,
  sort: string
): Promise<{ content: T[]; totalElements: number }> => {
  const params = { page, size, sort };
  const response = await axios.post<{ content: T[]; totalElements: number }>(
    `${API_BASE_URL}/${entityName}/filtered`,
    filters,
    { params }
  );
  return response.data;
};

export const createEntity = async <T, TDto>(entityName: string, entity: TDto): Promise<T> => {
  const response = await axios.post<T>(`${API_BASE_URL}/${entityName}/create`, entity);
  return response.data;
};

export const updateEntity = async <T>(entityName: string, entity: T): Promise<T> => {
  const response = await axios.post<T>(`${API_BASE_URL}/${entityName}/update`, entity);
  return response.data;
};

export const deleteEntity = async (entityName: string, entityId: number): Promise<string> => {
  const response = await axios.delete(`${API_BASE_URL}/${entityName}/${entityId}`);
  return response.data;
};
