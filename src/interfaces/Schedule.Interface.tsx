export interface ScheduleInterface {
    request_id?: string;
    offer_id: string;
    participant_id: string;
    month: string;
    week_day: string;
    hour: string;
    message: string;
    created_at: string;
    owner_id: string;
    profile?: Profile | undefined;
}

export interface Profile {
    user_id: string;
    name?: string;
    avatar_url?: string;
  }