import axios from "../axios/axiosInstance"


const BASE_URL = "api/city";


export const destroyElfCities = async (): Promise<void> => {
  await axios.delete(`${BASE_URL}/destroy-elf-cities`);

}

