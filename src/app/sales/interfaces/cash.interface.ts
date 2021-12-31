export interface CASH{
    totalCash:number;
    status:string;
    opened:OpenClose;
    closed:OpenClose;
    income:[IncomeExpense];
    expense:[IncomeExpense];
    salesIncome:number;
}
export interface OpenClose{
    hour:string;
    cash:number;
}
export interface IncomeExpense{
    cash:number;
    hour:string;
    gloss:string;
}