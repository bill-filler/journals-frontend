import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@edx/paragon';
import classNames from 'classnames';

import './NavToggle.scss';

class NavToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleNavigationOpen();
  }

  render() {
    return (
      (this.props.navPanelVisible) ? (
        <Button
          className={this.props.classNames}
          label={
            <span className="nav-toggle-label">
              <Icon
                className={
                  classNames({
                    fa: true,
                    'fa-times': this.props.navPanelOpen,
                    'fa-bars': !this.props.navPanelOpen,
                  }).split(' ')
                }
              />
              {this.props.label}
            </span>
          }
          onClick={this.handleClick}
        />
      ) : (
        ''
      )
    );
  }
}

NavToggle.defaultProps = {
  classNames: [''],
  label: '',
  toggleNavigationOpen: () => {},
  navPanelVisible: false,
  navPanelOpen: false,
};

NavToggle.propTypes = {
  classNames: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  toggleNavigationOpen: PropTypes.func,
  navPanelVisible: PropTypes.bool,
  navPanelOpen: PropTypes.bool,
};


export default NavToggle;
