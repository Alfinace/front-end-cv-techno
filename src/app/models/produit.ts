export class Produit {
    id: number;
    design: string;
    pu: number;
    stock: number;

    public constructor(id: number,
                       design: string,
                       pu: number,
                       stock: number){
        this.id = id;
        this.design = design;
        this.pu = pu;
        this.stock = stock;
    }
}
