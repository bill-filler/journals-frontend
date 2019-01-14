import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class UserLogout extends React.Component {
  componentDidMount() {
    this.props.logoutAccount();
    this.props.getSiteInfo();
  }

  render() {
    if (!this.props.errorLogout && this.props.finishedLogout) {
      return <Redirect push to="/" />;
    }

    return (
      <div>
        {/* { this.props.errorLogout &&
          <div>
            <h2>Error Occurred</h2>
            <StatusAlert
              alertType="danger"
              iconClassName={['fa', 'fa-times-circle']}
              message={this.props.errorLogout.message}
            />
          </div>
        }
        { this.prop.startedLogout && !this.props.finishedLogout &&
          <div>Logging out...</div>
        } */}
        <div> Logging out.. </div>
      </div>
    );
  }
}

UserLogout.defaultProps = {
  // startedLogout: false,
  finishedLogout: false,
  errorLogout: null,
  logoutAccount: () => {},
  getSiteInfo: () => {},
};

UserLogout.propTypes = {
  errorLogout: PropTypes.instanceOf(Error),
  // startedLogout: PropTypes.bool,
  finishedLogout: PropTypes.bool,
  getSiteInfo: PropTypes.func,
  logoutAccount: PropTypes.func,
};


export default UserLogout;
