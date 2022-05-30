import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../Courses/Courses.styles";
import connect from './Statistic.connect';
import Pagination from '@material-ui/lab/Pagination';

class Statistic extends React.PureComponent {
    componentDidMount() {
       this.props.actions.getStatistic();
    }
    render() {
        const {currentPage,allCount} = this.props
        return(
            <div>
            <div> hello</div>
        <div >
            <Pagination count={Math.ceil(allCount / 10)}
                        page={currentPage}
                        color="primary"
            />
        </div>
    </div>
        )
    }
}
export default withStyles(styles)(connect(Statistic));
