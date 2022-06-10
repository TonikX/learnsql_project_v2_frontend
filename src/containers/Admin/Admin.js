import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../Courses/Courses.styles";
import connect from "../Courses/Courses.connect";
import AdminNavigation from "../../components/AdminNavigation/AdminNavigation";

class Admin extends React.PureComponent{
    render() {
        return(
            <div>
                <AdminNavigation></AdminNavigation>
                <div>Привет, админ</div>
            </div>
        );
    }
}
export default withStyles(styles)(connect(Admin));