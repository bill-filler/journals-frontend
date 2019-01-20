import { connect } from 'react-redux';
import { logoutAccount } from '../../data/actions/account';
import fetchSiteInfo from '../../data/actions/siteInfo';
import UserLogout from '../../components/UserLogout';

const mapStateToProps = state => (
  {
    errorLogout: state.account.errorLogout,
    startedLogout: state.account.startedLogout,
    finishedLogout: state.account.finishedLogout,
  }
);

const mapDispatchToProps = dispatch => (
  {
    logoutAccount: () => dispatch(logoutAccount()),
    getSiteInfo: () => dispatch(fetchSiteInfo()),
  }
);

const UserLogoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLogout);

export default UserLogoutContainer;
