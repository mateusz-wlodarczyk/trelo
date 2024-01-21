import React from 'react';
import { CiSettings } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';

import { ButtonStylesSX } from '../utils/styleSX';
export const Navbar = () => {
  return (
    <Flex alignItems='center'>
      <Heading color='blue.500'>lista urzadzen:</Heading>
      <Spacer />
      <Link to='/settings'>
        {' '}
        <Button colorScheme='blue' leftIcon={<CiSettings />} sx={ButtonStylesSX} />
      </Link>
    </Flex>
  );
};
