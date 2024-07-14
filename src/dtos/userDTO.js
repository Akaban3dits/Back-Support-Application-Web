class UserDTO {
    constructor({ id_user, name_user, lname_user, agn_user, sts_user, name_dep }) {
        this.id = id_user;
        this.firstName = name_user;
        this.lastName = lname_user;
        this.agency = agn_user;
        this.status = sts_user;
        this.department = name_dep;
    }
}

export default UserDTO;
