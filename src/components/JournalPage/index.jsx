import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/default.css';
import {
  RICH_TEXT,
  RAW_HTML,
  PDF,
  XBLOCK_VIDEO,
  IMAGE,
} from '../../data/constants/contentTypes';
import ErrorPage from '../ErrorPage';

import RawHTMLViewer from '../RawHTMLViewer';
import ImageViewerContainer from '../../containers/ImageViewerContainer';
import PageNavigationButtons from '../PageNavigationButtons';
import PDFViewerContainer from '../../containers/PDFViewerContainer';
import ViewerBorder from '../ViewerBorder';
import BreadCrumbs from '../BreadCrumbs';
import XBlockVideoViewer from '../XBlockVideoViewer';

import './JournalPage.scss';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('python', python);

class JournalPage extends React.Component {
  componentDidMount() {
    this.props.getPage(this.props.match.params.pageId);
  }

  componentDidUpdate(prevProps) {
    // If we try to change Journal pages
    if (prevProps.match.params.pageId !== this.props.match.params.pageId) {
      this.props.getPage(this.props.match.params.pageId);
    }
    // If we successfully change Journal pages
    if (prevProps.pageId !== this.props.pageId) {
      this.trackVisit();
    }
    if (this.props.finishedFetching) {
      hljs.initHighlighting();
      document.getElementsByClassName('header')[0].scrollIntoView();
    }
  }

  trackVisit() {
    if (this.props.userId != null) {
      this.props.setPageVisit(
        this.props.userId,
        this.props.match.params.pageId,
        this.props.match.params.journalAboutId,
      );
    }
  }

  render() {
    const baseUrl = !this.props.is_preview ? `/${this.props.match.params.journalAboutId}/pages` : '';
    const previousPageUrl = this.props.previousPage ? `${baseUrl}/${this.props.previousPage}` : '';
    const nextPageUrl = this.props.nextPage ? `${baseUrl}/${this.props.nextPage}` : '';

    if (this.props.error) {
      return (
        <ErrorPage
          status={this.props.error.response && this.props.error.response.status}
          message={this.props.error.message}
        />
      );
    }
    if (this.props.startedFetching && !this.props.finishedFetching) {
      return (
        <div className="journal-page-body">Loading...</div>
      );
    }

    return (
      this.props.finishedFetching &&
        <div className="page">
          { this.props.breadCrumbs.length > 0 &&
            <BreadCrumbs
              ancestorPages={this.props.breadCrumbs}
              journalId={this.props.match.params.journalAboutId}
            />
          }
          <h1 className="article-title">{this.props.title}</h1>
          <h2 className="subtitle">{this.props.subTitle}</h2>
          <div className="date-and-author">
            {
              this.props.displayLastPublishedDate &&
              <p className="muted-text">
                <Moment date={this.props.lastPublishedDate} format="MMMM DD, YYYY" />
              </p>
            }
            <p className="muted-text">{ this.props.author.trim() && `By ${this.props.author}` }</p>
          </div>
          <div className="journal-page-body">
            {
              this.props.body.map((el) => {
                switch (el.type) {
                  case RICH_TEXT:
                  case RAW_HTML:
                    // rich text and raw HTML use the same component
                    return (
                      <div className="body-element" key={el.id}>
                        <RawHTMLViewer content={el.value} />
                      </div>
                    );
                  case PDF:
                    return (
                      <div className="body-element" key={el.id}>
                        <ViewerBorder
                          spanId={el.value.span_id}
                          title={el.value.title}
                          spanFullWidth
                          showFullscreen
                        >
                          <PDFViewerContainer url={el.value.url} title={el.value.title} />
                        </ViewerBorder>
                      </div>
                    );
                  case XBLOCK_VIDEO:
                    return (
                      <div className="body-element" key={el.id}>
                        <ViewerBorder
                          spanId={el.value.span_id}
                          title={el.value.title}
                          spanFullWidth
                          showFullscreen
                        >
                          <XBlockVideoViewer url={el.value.view_url} title={el.value.title} />
                        </ViewerBorder>
                      </div>
                    );
                  case IMAGE:
                    return (
                      <div className="body-element" key={el.id}>
                        <ViewerBorder
                          spanId={el.value.span_id}
                          title={el.value.title}
                          caption={el.value.caption}
                        >
                          <ImageViewerContainer url={el.value.url} altText={el.value.title} />
                        </ViewerBorder>
                      </div>
                    );
                  default:
                    return <div key={el.id}>No matching component</div>;
                }
              })
            }
          </div>
          {
            !this.props.is_preview &&
              <PageNavigationButtons prev={previousPageUrl} next={nextPageUrl} />
          }
        </div>
    );
  }
}

JournalPage.defaultProps = {
  title: '',
  subTitle: '',
  displayLastPublishedDate: false,
  lastPublishedDate: '',
  author: '',
  breadCrumbs: [],
  body: [],
  getPage: () => {},
  setPageVisit: () => {},
  startedFetching: false,
  finishedFetching: false,
  error: null,
  nextPage: null,
  previousPage: null,
  is_preview: false,
  pageId: 0,
  userId: null,
};

JournalPage.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  displayLastPublishedDate: PropTypes.bool,
  lastPublishedDate: PropTypes.string,
  author: PropTypes.string,
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })),
  body: PropTypes.arrayOf(PropTypes.object),
  getPage: PropTypes.func,
  setPageVisit: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      pageId: PropTypes.string,
      journalAboutId: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
  error: PropTypes.instanceOf(Error),
  startedFetching: PropTypes.bool,
  finishedFetching: PropTypes.bool,
  nextPage: PropTypes.number,
  previousPage: PropTypes.number,
  is_preview: PropTypes.bool,
  userId: PropTypes.number,
  pageId: PropTypes.number,
};


export default JournalPage;
