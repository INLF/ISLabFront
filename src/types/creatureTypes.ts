export enum CreatureType{
    HOBBIT="HOBBIT",
    ELF="ELF",
    HUMAN="HUMAN",
    GOLLUM="GOLLUM"
}

export interface Creature {
    id: number;
    name: string;
    coordinates: {x:number, y:number};
    age: number;
    type: CreatureType;
    cityId: number;
    ringId: number;
    attackLevel: number;
  }

export type CreatureCreateDto = Omit<Creature, "id">;
  
export interface RingPageResponse {
    content: Creature[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

