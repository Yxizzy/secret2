// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import VisitorForm from '../../components/VisitorForm';
import Navbar from '../../components/Navbar';

type Props = {
  login: () => void,
}

class Visitor extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogin = (data) => this.props.login(data, this.context.router);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <VisitorForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default connect(null, { login })(Visitor);
