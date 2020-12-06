export class User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    roles: string;
    password: string;

    public constructor(id: number,
                       firstname: string,
                       lastname: string,
                       email: string,
                       roles: string,
                       password: string){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.roles = roles;
        this.password = password;
    }
}
