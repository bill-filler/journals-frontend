import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import JournalPage from '../../components/JournalPage';
import fetchPage from '../../data/actions/page';
import setPageVisit from '../../data/actions/pageVisit';


const mapStateToProps = state => (
  {
    pageId: state.page.page.id,
    title: state.page.page.title,
    subTitle: state.page.page.sub_title,
    displayLastPublishedDate: state.page.page.display_last_published_date,
    lastPublishedDate: state.page.page.last_published_at,
    author: state.page.page.author,
    body: state.page.page.body,
    fetchPageSuccess: state.page.error,
    nextPage: state.page.page.next_page_id,
    previousPage: state.page.page.previous_page_id,
    userId: state.siteInfo.userId,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getPage: pageId => dispatch(fetchPage(pageId)),
    setPageVisit: (userId, pageId) => setPageVisit(userId, pageId),
  }
);

const JournalPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JournalPage);


export default withRouter(JournalPageContainer);
