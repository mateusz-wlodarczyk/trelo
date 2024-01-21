import { createClient, PostgrestError } from '@supabase/supabase-js';

import { getFromLocalStorage } from './localstorage';
const SUPABASE_URL = 'https://wahxmjacrbklrveozznp.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhaHhtamFjcmJrbHJ2ZW96em5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3NDIxOTIsImV4cCI6MjAyMDMxODE5Mn0.odqJ0hifCIqAFiyj6t7aZeYuA0TW7cvJ_z2am5fFCO8';

// const supabaseUrl = import.meta.env.SUPABASE_URL as string;
// const supabaseAnonKey = import.meta.env.SUPABASE_KEY as string;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const handleError = function (error: PostgrestError | null) {
  if (error !== null) {
    throw new Error(
      `SupabaseError: query failed ${error.code}: ${error.details}, ${error.message}`,
    );
  }
};
// otypowac user
export async function saveLocalStorage(user) {
  console.log('user', user);
  const storage = getFromLocalStorage();
  try {
    if (storage.isAccess === true) {
      const { data, error } = await supabase
        .from('columns')
        .insert([{ columnsJSON: storage, user_ID: user }])
        .select();
    }
  } catch (error) {
    console.log(error);
  }
}
