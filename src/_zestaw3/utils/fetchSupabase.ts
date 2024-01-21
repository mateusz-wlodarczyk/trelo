import { createClient } from '@supabase/supabase-js';

import { SUPABASE_API_KEY, SUPABASE_URL } from './constans';

// const supabaseUrl = import.meta.env.SUPABASE_URL as string;
// const supabaseAnonKey = import.meta.env.SUPABASE_KEY as string;
export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export async function loadTools() {
  try {
    const { data: userTable, error } = await supabase.from('userTable').select('*');
    return userTable;
  } catch (error) {
    console.log(error);
  }
}

export async function loadIcons(searchedIcon: string) {
  try {
    const { data, error } = await supabase
      .from('stanPolaczenia')
      .select('*')
      .eq('name', searchedIcon);
    return data[0].icon;
  } catch (error) {
    console.log(error);
  }
}

export async function loadSingleDevice(id: number) {
  try {
    const { data, error } = await supabase.from('userTable').select('*').eq('id', id);
    return data;
  } catch (error) {
    console.log(error);
  }
}
