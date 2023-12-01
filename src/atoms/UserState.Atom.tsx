import type { Session, User } from '@supabase/supabase-js';
import { atom, type AtomEffect } from 'recoil';

import supabase from '../config/SupabaseClient';

type SessionState = {
  session: Session | null;
  user: User | null;
};

const userSessionEffect: AtomEffect<SessionState> = ({ setSelf }) => {
  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange((_event, session) =>
    setSelf({ session, user: session?.user ?? null })
  );

  return () => subscription.unsubscribe();
};

const defaultState = {
  session: null,
  user: null
};

export const userSessionState = atom<SessionState>({
  key: 'userSessionState',
  default: defaultState,
  effects: [userSessionEffect]
});
