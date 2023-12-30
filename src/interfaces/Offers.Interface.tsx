// Offers.ts
export interface Profile {
  user_id: string;
  nickName?: string;
  avatar_url?: string;
}

export interface Offer {
  offer_id?: string;
  created_at: any;
  subject_id: string;
  user_id: string;
  education_level: string;
  education_type: string;
  education_method: string;
  price: number;
  profile?: Profile | undefined;
}

