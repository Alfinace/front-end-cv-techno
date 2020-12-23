export class Client {
    id: number;
    firstName: string;
    lastName: string;
    contact: string;
    public constructor(id: number, lastName: string, firstName: string, contact: string){
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.contact = contact;
    }
}
