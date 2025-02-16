export interface Ring {
    id: number;
    name: string;
    power: number;
    weight: number;
    createdAt: string;
    updatedAt: string;
  }

export type RingCreateDto = Omit<Ring, "id" | "createdAt" | "updatedAt">;
  
export interface RingPageResponse {
    content: Ring[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
