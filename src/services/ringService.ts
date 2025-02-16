import axios from "../axios/axiosInstance"
import { RingPageResponse } from '../types/ringTypes';
import { Ring } from "../types/ringTypes";

const API_URL_FILTERED = '/api/ring/filtered';
const API_URL_UPDATE = '/api/ring/update'


export const fetchRings = async (
    filters: Record<string, any>,
    page: number,
    size: number,
    sort: string
  ): Promise<RingPageResponse> => {
    const params = { page, size, sort };
    const response = await axios.post<RingPageResponse>(API_URL_FILTERED, filters, { params });
    return response.data;
  };

export const updateRing = async (ring : Ring): Promise<Ring> =>{
  const response = await axios.post(API_URL_UPDATE, ring);
  return response.data;
}

