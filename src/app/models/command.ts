export class Command {
    id: number;
    clientId: number;
    produitId: number;
    qte: number;

    public constructor(id: number,
                       clientId: number,
                       produitId: number,
                       qte: number){
        this.id = id;
        this.clientId = clientId;
        this.produitId = produitId;
        this.qte = qte;
    }
}
