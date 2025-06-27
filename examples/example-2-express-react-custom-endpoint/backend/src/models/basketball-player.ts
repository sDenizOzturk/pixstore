import { ImageRecord } from "pixstore/types";

export interface BasketballPlayerRecord {
  id: number;
  name: string;
  imageId: string;
  teamId: number;
}

export interface BasketballPlayer {
  id: number;
  name: string;
  imageRecord: ImageRecord;
  teamId: number;
}
