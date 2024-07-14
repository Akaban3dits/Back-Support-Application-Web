class MantenimientoDTO {
    constructor({ id_mantto, date_prog, dtl_mantto, full_name }) {
        this.id = id_mantto;
        this.date = date_prog;
        this.detail = dtl_mantto;
        this.user = full_name;
    }
}

export default MantenimientoDTO;
