export interface Reason {
  text: string;
  id: number;
}

export interface ProsAndConsList {
  name: string;
  id: number;
  lastEditionDate: string;
  cons: Reason[];
  pros: Reason[];
}
