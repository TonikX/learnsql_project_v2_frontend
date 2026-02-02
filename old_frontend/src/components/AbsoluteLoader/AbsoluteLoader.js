import PropTypes from 'prop-types';
import React from 'react';
import className from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from './AbsoluteLoader.styles';

const AbsoluteLoader = ({classes, isFetching}) => {
    return (
        <div className={className(classes.loaderContainer, {
            [classes.showLoader]: isFetching,
            [classes.hideLoader]: !isFetching
        })}>
            {isFetching && <CircularProgress />}
        </div>
    );
};

AbsoluteLoader.defaultProps = {
    isFetching: false,
};

AbsoluteLoader.propTypes = {
    isFetching: PropTypes.bool,
};

export default withStyles(styles)(AbsoluteLoader);
