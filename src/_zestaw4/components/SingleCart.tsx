import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { POSITION_ARRAY_ZERO } from '../utils/constans';
import { CardBoxSX } from '../utils/stylesSX';
import { DataFileSingle } from '../utils/types';

export const SingleCart = ({ item }: { item: DataFileSingle }) => {
  return (
    <Box sx={CardBoxSX}>
      <Text> WO ID: {item.work_order_id}</Text>
      <Text> Description: {item.description} </Text>
      <Text> Received date: {item.received_date} </Text>
      <Text> Assigned to: {item.assigned_to[POSITION_ARRAY_ZERO]?.person_name} </Text>
      <Text> Status: {item.status} </Text>
      <Text> Priority: {item.priority} </Text>
    </Box>
  );
};
