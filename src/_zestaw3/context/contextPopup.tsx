import React, { createContext, useContext, useState } from 'react';

type PopupContextProps = {
  findId: (id: number) => void;
  idDevice: number;
};

const PopupContext = createContext<PopupContextProps | null>(null);

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [idDevice, setIdDevice] = useState(1);

  const findId = (id: number) => {
    setIdDevice(id);
  };
  return <PopupContext.Provider value={{ findId, idDevice }}>{children}</PopupContext.Provider>;
};

export const usePopupContext = () => {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error('Poza providerem');
  }
  return ctx;
};

export { PopupContext, PopupProvider };
