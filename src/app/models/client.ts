export class Client {
    id: number;
    name: string;
    contact: string;
    public constructor(id: number, name: string, contact: string){
        this.id = id;
        this.name = name;
        this.contact = contact;
    }
}
