import axios from "../axios/axiosInstance";

const BASE_URL = "api/creature";

const bookCreatureService = {
  removeOneByAttackLevel: async (attackLevel: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/remove-by-attack-level/${attackLevel}`);
  },

  countByRingId: async (ringId: number): Promise<number> => {
    const response = await axios.get(`${BASE_URL}/count-by-ring-id/${ringId}`);
    return parseInt(response.data, 10);
  },

  getUniqueAttackLevels: async (): Promise<number[]> => {
    const response = await axios.get(`${BASE_URL}/unique-attack-levels`);
    return response.data; 
  },

  removeHobbitRings: async (): Promise<void> => {
    await axios.put(`${BASE_URL}/remove-hobbit-rings`);
  },
};

export default bookCreatureService;
