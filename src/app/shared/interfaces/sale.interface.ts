export interface DETAIL{
    id:number;
    client:string;
    doc:string;
    detail:any;
    cost:number;
    costLiteral:string;
    date:string;
    hour:string;
    status:string;
    type:string;

}
export interface SALE{
    id:string;
    saleList:[DETAIL]
}
export interface TABLE{
    id:string;
    free:boolean;
}
