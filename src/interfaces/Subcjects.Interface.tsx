
export interface Subjects {
  id?: number;
  subject?: string;
  colour?: string;
  icon_url?: string;
  shadow?: string;
  offers?: Offer[];
}

export interface Offer {
  offer_id: string;
  price: string;
  subject_id: number;
}