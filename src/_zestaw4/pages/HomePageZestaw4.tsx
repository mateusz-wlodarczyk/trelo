import React from 'react';
import { Box, Button, Flex, FormControl, Input, Text } from '@chakra-ui/react';

import { useZestaw4 } from '../../_zestaw3/hooks/useZestaw4';
import { SingleCart } from '../components/SingleCart';

export const HomePageZestaw4 = () => {
  const {
    foundInputState,
    handleClearSearch,
    handleSearch,
    loadedData,
    searchedValue,
    setSearchedValue,
    showAll,
  } = useZestaw4();

  if (loadedData?.error === true) return <Text>loading...</Text>;

  return (
    <>
      <Box>
        <Flex alignItems='center' gap='5px'>
          <FormControl isRequired>
            <Input
              placeholder='search'
              value={searchedValue}
              onChange={(e) => setSearchedValue(e.target.value)}
            />
          </FormControl>
          <Button colorScheme='teal' onClick={handleSearch}>
            search
          </Button>{' '}
          <Button colorScheme='teal' onClick={handleClearSearch}>
            clear
          </Button>
        </Flex>

        {!showAll && (
          <Box>
            <Flex gap='10px' wrap='wrap'>
              {foundInputState !== null &&
                foundInputState.map((item) => {
                  return <SingleCart key={item.work_order_id} item={item} />;
                })}
            </Flex>
          </Box>
        )}
      </Box>
      {showAll && (
        <Box>
          <Flex gap='10px' wrap='wrap'>
            {loadedData !== null &&
              loadedData.response.data.map((item) => {
                return <SingleCart key={item.work_order_id} item={item} />;
              })}
          </Flex>
        </Box>
      )}
      <Box>
        <Flex>
          <Text>execTime: {loadedData !== null && loadedData.exec_time}</Text>
          <Text>total: {loadedData !== null && loadedData.response.total}</Text>
        </Flex>
      </Box>
    </>
  );
};
