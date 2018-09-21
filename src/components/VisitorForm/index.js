// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';
import Errors from '../Errors';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
  errors: any,
}

class VisitorForm extends Component {
  props: Props

  handleSubmit = (data) => this.props.onSubmit(data);

  render() {
    const { errors, handleSubmit, submitting } = this.props;

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Enter Email Address</h3>
        <div style={{ marginBottom: '1rem' }} />
        <div style={{ marginBottom: '1rem' }}>
          <Field
            name="email"
            type="email"
            component={Input}
            placeholder="Email"
          />
          <Errors name="email" errors={errors} />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-block btn-primary"
        >
          {submitting ? 'Submitting...' : 'Sign up'}
        </button>
        <hr style={{ margin: '2rem 0' }} />
        <Link to="/login" className="btn btn-block btn-secondary">
          Login to your account
        </Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signup',
})(VisitorForm);
