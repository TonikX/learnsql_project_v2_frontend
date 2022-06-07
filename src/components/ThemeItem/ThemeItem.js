import React from 'react'
import {useStyles} from './ThemeItem.styles'
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Button from "../Button";

const ThemeItem = ({theme, deleteTheme, updateTheme}) => {
    const classes = useStyles()

    return (
        <div className={classes.dbItem}>
            <div className={classes.blueCircle}/>
            <div>
                {theme.title}
            </div>
            <div className={classes.icons}>
                <RemoveRedEyeIcon
                    style={{cursor: 'pointer'}}
                    onClick={() => updateTheme(theme.id)}/>
                <DeleteOutline
                    style={{cursor: 'pointer'}}
                    onClick={() => deleteTheme(theme.id)}/>
            </div>
        </div>
    )
}

export default ThemeItem