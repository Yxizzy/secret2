// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Miss, Match } from 'react-router';
import { connect } from 'react-redux';
import { authenticate, unauthenticate, logout } from '../../actions/session';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';
import MatchAuthenticated from '../../components/MatchAuthenticated';
import RedirectVisitor from '../../components/RedirectVisitor';
import RedirectAuthenticated from '../../components/RedirectAuthenticated';
import MatchVisitor from '../../components/MatchVisitor';
import Sidebar from '../../components/Sidebar';
import Room from '../Room';
import Alert from '../Alert';
import Chat from '../Chat';
import Visitor from '../Visitor';
import { Room as RoomType } from '../../types';


class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  props: propTypes

  handleLogout = (router) => this.props.logout(router);

  render() {
    const { isAuthenticated, willAuthenticate, currentUserRooms } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <BrowserRouter>
        {({ router, location }) => (
          <div style={{ display: 'flex', flex: '1' }}>
            <Alert pathname={location.pathname} />
            {isAuthenticated &&
              <Sidebar
                router={router}
                rooms={currentUserRooms}
                onLogoutClick={this.handleLogout}
              />
            }
            <MatchVisitor exactly pattern="/" component={Chat} />
            <MatchAuthenticated pattern="/home" component={Home} {...authProps} />
            <RedirectAuthenticated pattern="/login" component={Login} {...authProps} />
            <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
            <RedirectVisitor pattern="/visitor" component={Visitor} />
            <MatchAuthenticated pattern="/r/:id" component={Room} {...authProps} />
            <Miss component={NotFound} />
          </div>
        )}
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authenticate: PropTypes.func,
  unauthenticate: PropTypes.func,
  isAuthenticated: PropTypes.boolean,
  willAuthenticate: PropTypes.boolean,
  logout: PropTypes.func,
  currentUserRooms: PropTypes.arrayOf,
};

export default connect(
  (state) => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
    currentUserRooms: state.rooms.currentUserRooms,
  }),
  { authenticate, unauthenticate, logout }
)(App);
