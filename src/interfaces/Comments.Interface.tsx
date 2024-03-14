export interface Comments {
    comment_id?: string;
    offer_id?: string;
    user_id?: string;
    comment?: string;
    rating?: number;
    created_at?: any;
    profile?: Profile | undefined;
  }
  
  export interface Profile {
    user_id: string;
    name?: string;
    surname?: string;
    avatar_url?: string;
    city?: string;
    experience_years?: string;
    experience_info?: string;
    verificated?: boolean;
  }