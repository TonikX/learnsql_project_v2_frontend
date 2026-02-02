import BaseService from "../../service/base-service";

class SignInService extends BaseService{
    getOrganisations() {
        return this.get('/api/student-groups/get_choise_values/?field=organization', undefined, { removeHeader: true });
    }

    getPeriods() {
        return this.get('/api/student-groups/get_choise_values/?field=period', undefined,{ removeHeader: true });
    }

    getGroups({organization, period}) {
        return this.get(`/api/student-groups/?period=${period}&organization=${organization}`, undefined, { removeHeader: true });
    }
}

export default SignInService;
export const service = new SignInService()