import React, { useEffect, useState } from 'react';
import { ButtonGroup, Flex, useDisclosure } from '@chakra-ui/react';

import { ModalSingleDevice } from '../components/ModalSingleDevice';
import { Navbar } from '../components/Navbar';
import { SingleDevice } from '../components/SingleDevice';
import { usePopupContext } from '../context/contextPopup';
import { dragMoveListener } from '../utils/dragging';
import { loadSingleDevice, loadTools } from '../utils/fetchSupabase';
import { SingleDeviceTYPE } from '../utils/typesDevices';

export const HomePage = () => {
  const [loadedDevices, setLoadedDevices] = useState<SingleDeviceTYPE[] | null>([]);
  const [loadedSingleDevice, setLoadedSingleDevice] = useState<SingleDeviceTYPE[] | null>([]);
  const { idDevice } = usePopupContext();
  const { isOpen, onClose, onOpen } = useDisclosure();
  //jak to uruchomic aby to ladnie wygladalo?
  // useEffect((event: Event) => dragMoveListener(event), []);
  dragMoveListener;

  useEffect(() => {
    loadTools()
      .then((res) => {
        if (res !== undefined) setLoadedDevices(res);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    loadSingleDevice(idDevice)
      .then((res) => {
        if (res !== undefined) setLoadedSingleDevice(res);
      })
      .catch((err) => console.error(err));
  }, [idDevice]);

  return (
    <>
      <Navbar />
      <ButtonGroup onClick={onOpen}>
        <Flex gap='10px' wrap='wrap'>
          {loadedDevices?.map((item) => {
            return <SingleDevice key={item.id} item={item} />;
          })}
        </Flex>
        <ModalSingleDevice
          isOpen={isOpen}
          loadedSingleDevice={loadedSingleDevice}
          onClose={onClose}
        />
      </ButtonGroup>
    </>
  );
};
