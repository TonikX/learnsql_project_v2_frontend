import React from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';
import hljs from "highlight.js";

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import connect from './Material.connect';
import styles from './Material.styles';
import Scrollbars from "react-custom-scrollbars";

class Material extends React.PureComponent{
    state = {
        currentItem: ''
    };

    componentDidMount() {
        this.updateCodeSyntaxHighlighting();
    }

    componentDidUpdate() {
        this.updateCodeSyntaxHighlighting();
    }

    updateCodeSyntaxHighlighting = () => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block);
        });
    };

    render() {
        const {material, classes} = this.props;

        return (
            <div className={classes.root}>
                <Scrollbars minheight={300}>
                    <Typography className={classes.content} dangerouslySetInnerHTML={{__html: get(material, 'content')}} />
                </Scrollbars>
            </div>
        )
    }
}

Material.propTypes = {
    material: PropTypes.array,
    actions: PropTypes.object,
};

export default withStyles(styles)(connect(Material));