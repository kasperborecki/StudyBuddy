// Offers.ts
export interface Profile {
  user_id: string;
  nickName?: string;
  avatar_url?: string;
  experience_years?: string;
  experience_info?: string;
  verificated?: boolean;
}

export interface Offer {
  offer_id?: string;
  created_at: any;
  subject_id: string;
  user_id: string;
  education_level: string;
  education_method: string;
  price: number;
  time: number;
  city: string;
  description: string;
  profile?: Profile | undefined;
}
