export class Tasks {

    constructor(_id = '', descripcion = '') {
        this._id = _id;
        this.descripcion = descripcion;
    }

    public _id: string;
    public descripcion: string;
}
