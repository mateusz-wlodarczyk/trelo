import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Icon, Text } from '@chakra-ui/react';

import { usePopupContext } from '../context/contextPopup';
import { loadIcons } from '../utils/fetchSupabase';
import { ContainerStylesSX, IconsStylesSX, StatusStylesSX } from '../utils/styleSX';
import { SingleDeviceTYPE } from '../utils/typesDevices';
export const SingleDevice = ({ item }: { item: SingleDeviceTYPE }) => {
  const [iconDevice, setIconDevice] = useState();
  const { findId } = usePopupContext();
  useEffect(() => {
    loadIcons(item.stanPolaczenia)
      .then((res) => {
        setIconDevice(res);
      })
      .catch((err) => console.log(error));
  }, [item.stanPolaczenia]);

  return (
    <>
      <Container role='button' sx={ContainerStylesSX} onClick={() => findId(item.id)}>
        <Flex>
          <Box m='1px' p='1px'>
            <Text>typ: {item.typ}</Text>
            <Text>nazwa: {item.name}</Text>
            <Flex sx={StatusStylesSX}>
              <Text> stan polaczenia:</Text>
              {/* ikony nie dzialaja */}
              <Icon as={iconDevice} sx={IconsStylesSX} />
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
};
