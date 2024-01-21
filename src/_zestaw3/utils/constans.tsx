import React from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';
import { FaRegLightbulb } from 'react-icons/fa';
import { GiElectricalSocket } from 'react-icons/gi';
import { MdErrorOutline } from 'react-icons/md';
import { MdOutlineOnlinePrediction } from 'react-icons/md';
import { RiWifiOffLine } from 'react-icons/ri';

export const POSITION_ZERO = 0;

export const typUrzadzenia = [
  { icon: <GiElectricalSocket />, name: 'gniazdkoElektryczne' },
  { icon: <FaRegLightbulb />, name: 'zarowka' },
  { icon: <FaTemperatureHigh />, name: 'czujnikTemperatury' },
];
export const stanPolaczenia = [
  { icon: <MdOutlineOnlinePrediction />, name: 'online' },
  { icon: <RiWifiOffLine />, name: 'offline' },
  { icon: <MdErrorOutline />, name: 'error' },
];

export const initialState = [
  { id: 1, nazwa: 'moja zarowka', stanPolaczenia: stanPolaczenia[0], typ: typUrzadzenia[1] },
  { id: 2, nazwa: 'moje urzadzenie', stanPolaczenia: stanPolaczenia[1], typ: typUrzadzenia[0] },
  { id: 3, nazwa: 'kalkulator', stanPolaczenia: stanPolaczenia[2], typ: typUrzadzenia[2] },
];
export const ROUTES_ZESTAW3 = { home: 'zestaw3', settings: 'settings' };
//.env
export const SUPABASE_URL = 'https://rqbzgjjytqgzslodlusq.supabase.co';

export const SUPABASE_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxYnpnamp5dHFnenNsb2RsdXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3NjMxMDAsImV4cCI6MjAyMTMzOTEwMH0.euLIV4FKQ16Kph6KyBY90AZ67udENUGnzZalf0IG7aE';
