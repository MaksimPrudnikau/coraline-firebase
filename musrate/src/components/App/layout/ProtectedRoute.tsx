import React, {ReactNode} from 'react';
import {Box} from 'native-base';

interface IProps {
  children: ReactNode;
}

export default function ProtectedRoute(props: IProps) {
  return <Box>{props.children}</Box>;
}
