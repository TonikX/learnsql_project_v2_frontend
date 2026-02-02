import React from 'react';
import get from "lodash/get";

import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import withStyles from '@material-ui/core/styles/withStyles';

import Material from "./Material/Material";

import connect from './Methodical.connect';
import styles from './Methodical.styles';
import Scrollbars from "react-custom-scrollbars";

class Methodical extends React.PureComponent{
    componentDidMount() {
        this.props.actions.getCourseMethodicalMaterials();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.courseId !== prevProps.courseId){
            this.props.actions.getCourseMethodicalMaterials();
        }
    }

    changeMaterialHandler = (id) => () => {
        this.props.actions.getCourseMethodicalMaterial(id);
    };

    renderMenu = () => {
        const {materials, classes, currentMaterialId} = this.props;

        return (
                <MenuList className={classes.menu}>
                    <Scrollbars minheight={300}>
                        {materials.map((section, index) =>
                            <div key={`material-${index}`}>
                                <MenuItem
                                    className={classes.noClick}
                                    key={`section-${index}`}
                                    classes={{
                                        root: classes.menuItem,
                                    }}
                                >
                                    {get(section, 'section_name')}
                                </MenuItem>

                                {section.topics_of_this_section.length > 0 &&
                                    <MenuList className={classes.subMenu}>
                                        {section.topics_of_this_section.map((theme, themeIndex) =>
                                            <MenuItem
                                                onClick={this.changeMaterialHandler(theme.id)}
                                                key={`theme-${index}-${themeIndex}`}
                                                selected={currentMaterialId === theme.id}
                                                classes={{
                                                    selected: classes.selectedMenuItem,
                                                    root: classes.menuItem,
                                                }}
                                            >
                                                {get(theme, 'topic_name')}
                                            </MenuItem>
                                        )}
                                    </MenuList>
                                }
                            </div>
                        )}
                    </Scrollbars>
                </MenuList>
        )
    };

    render() {
        const {classes, isFetchingGet} = this.props;

        return(
            <Box display={'flex'} className={classes.root}>
                {this.renderMenu()}
                {!isFetchingGet && <Material />}
            </Box>
        );
    }
}

export default withStyles(styles)(connect(Methodical));