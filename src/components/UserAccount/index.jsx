/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Redirect } from 'react-router';
import StatusAlert from '../StatusAlert';
import './UserAccount.scss';


class UserAccount extends React.Component {
  render() {
    if (!this.props.errorCreating && this.props.finishedCreating) {
      this.props.getSiteInfo();
      return <Redirect push to="/" />;
    }

    return (
      <div>
        { this.props.errorCreating &&
          <div>
            <h2>Error Occurred</h2>
            <StatusAlert
              alertType="danger"
              iconClassName={['fa', 'fa-times-circle']}
              message={this.props.errorCreating.response.data}
            />
          </div>
        }
        <p />
        <div>Already have an account? <Link to="/login">Sign In</Link></div>
        <h2>Create an Account</h2>
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validate={(values) => {
            const errors = [];
            //  check if my values have errors
            // if (values.email !== 'bfiller@gmail.com') {
            //   errors.push('Invalid email address');
            // }
            if (!values.email) {
              errors.email = 'Valid Email Address Required';
            }
            return errors;
        }}
          onSubmit={(values) => {
            console.log('calling create acccount...');
            this.props.createAccount(values.email, values.username, values.password);
            // setTimeout(() => {
            //   // eslint-disable-next-line no-alert
            //   this.props.createAccount(values.email, values.username, values.password);
            //   // alert(JSON.stringify(values, null, 2));
            // }, 500);
          }}
          render={formProps => (
            <Form>
              <div className="row mt-2">
                <div className="col-lg-2">
                  <label htmlFor="email">Email</label>
                </div>
                <div className="col-lg-10">
                  <Field name="email" placeholder="" type="email" />
                  {
                  formProps.errors.email &&
                    <h3>Error: {formProps.errors.email}</h3>
                  }
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-lg-2">
                  <label htmlFor="username">Username</label>
                </div>
                <div className="col-lg-10">
                  <Field name="username" placeholder="" />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-lg-2">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col-lg-10">
                  <Field name="password" type="password" placeholder="" />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-lg-2">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <div className="col-lg-10">
                  <Field name="confirmPassword" type="password" placeholder="" />
                </div>
              </div>

              <div className="row mt-2">
                <div className="offset-lg-2 col-lg-10">
                  <button type="submit" disabled={this.props.startedCreating}>
                    {this.props.startedCreating && !this.props.finishedCreating ? 'Creating..' : 'Create Account'}
                  </button>
                </div>
              </div>
            </Form>
            )} // end of Formik render
        />
      </div>
    );
  }
}

UserAccount.defaultProps = {
  startedCreating: false,
  finishedCreating: false,
  errorCreating: null,
  createAccount: () => {},
  getSiteInfo: () => {},
};

UserAccount.propTypes = {
  errorCreating: PropTypes.instanceOf(Error),
  startedCreating: PropTypes.bool,
  finishedCreating: PropTypes.bool,
  createAccount: PropTypes.func,
  getSiteInfo: PropTypes.func,
};


export default UserAccount;
