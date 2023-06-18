import React, {ReactNode} from 'react';
import ProtectedRoute from './ProtectedRoute';

interface IProps {
  children: ReactNode;
}

function Layout(props: IProps) {
  return <ProtectedRoute>{props.children}</ProtectedRoute>;
}
