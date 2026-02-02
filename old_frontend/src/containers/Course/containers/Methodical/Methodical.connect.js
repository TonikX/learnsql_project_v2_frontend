import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "../../actions";
import {getCourseId, getMethodicalMaterials, getCurrentMethodicalMaterialId} from '../../getters';
import {isFetchingByKey} from '../../../../layout/getters';
import * as Enum from '../../enum';

const mapStateToProps = (state) => {
    return {
        courseId: getCourseId(state),
        materials: getMethodicalMaterials(state),
        currentMaterialId: getCurrentMethodicalMaterialId(state),
        isFetchingGet: isFetchingByKey(state, Enum.GET_COURSE_METHODICAL_MATERIALS_FETCHING) || isFetchingByKey(state, Enum.GET_COURSE_METHODICAL_MATERIAL_FETCHING)
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
