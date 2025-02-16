import { CreatureType } from "./creatureTypes";

export interface City {
    id: number;
    name: string;
    area: number;
    population: number;
    establishmentAt: string | null;
    governorType: CreatureType;
    populationDensity: number;
    isCapital: boolean;
    createdAt: string;
    updatedAt: string;
}

export type CityCreateDto = Omit<City, "id" | "createdAt" | "updatedAt">;
export type CityUpdateDto = Omit<City, "createdAt" | "updatedAt">;
  
export interface CityPageResponse {
    content: City[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}