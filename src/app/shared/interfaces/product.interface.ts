export interface PRODUCT{
    id?:string;
    name:string;
    category:string;
    type:any;
    presentation:any;
    stock:number;
    limited:boolean;
    price:number;
    flavors?:[FLAVOR]
}
export interface FLAVOR{
    name:string;
    price:number;
}