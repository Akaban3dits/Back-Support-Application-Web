class TicketDTO {
    constructor({ id_ticket, ems_ticket, cls_ticket, status, dispositivo, departamento }) {
        this.id = id_ticket;
        this.emission = ems_ticket;
        this.closure = cls_ticket;
        this.status = status;
        this.device = dispositivo;
        this.department = departamento;
    }
}

export default TicketDTO;
