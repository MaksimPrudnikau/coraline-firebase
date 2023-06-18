import React from 'react';
import {Box, Center, Column, Icon, Input} from 'native-base';
import {useAuthUser} from '@react-query-firebase/auth';
import {firebaseAuth} from '../lib/firebase/firebase';

export default function Home() {
  const user = useAuthUser(['user'], firebaseAuth);
  if (user.isLoading) {
    return <Box>Loading...</Box>;
  }

  if (user.data) {
    return <Box>Hello, {user.data.displayName}</Box>;
  }

  return (
    <Center>
      <Column>
        <Input
          color={'black'}
          type={'email'}
          w={{
            base: '75%',
            md: '25%',
          }}
          InputLeftElement={<Icon size={5} ml="2" color="muted.400" />}
          placeholder="Name"
        />
      </Column>
    </Center>
  );
}
