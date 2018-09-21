// @flow
import React from 'react';
import { Match, Redirect } from 'react-router';

type Props = {
  pattern: string,
  exactly?: any,
  component: any,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

const MatchVisitor = ({
  pattern,
  exactly,
  isAuthenticated,
  willAuthenticate,
  component: Component,
}: Props) =>
  <Match
    exactly={exactly}
    pattern={pattern}
    render={(props) => {
      if (isAuthenticated) { return <Component {...props} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Redirect to={{ pathname: '/visitor' }} />; }
      return null;
    }}
  />;

export default MatchVisitor;
