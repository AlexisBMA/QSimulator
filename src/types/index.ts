export type ParamsValidator = (params: any) => boolean;


export type Handler = (event: React.ChangeEvent<any>) => void;

// QS 
export interface QueueModelParams {
    arrivalRate: number,
    serviceRate: number,
    numberServers: number,
    maxUsers?:number,
    stDev?: number,
    kDev?:string
}

export interface QueueModelFormInputs {
    arrivalRate: string,
    serviceRate: string,
    numberServers: string,
    maxUsers?:string,
    stDev?: string,
    kDev?:string
}


export type QueueingFunc = (params: any) => QueueingTable;

export type CostFunc = (params: any) => number;

export interface QueueingTable {
    s?: number
    lambda?: number,
    p?:number,
    mu?: number,
    Lq?:number,
    L?:number,
    Wq?:number,
    W?:number,
    p0?:number,
    k?: number,
    lambdaE?: number,
    Pk?: number,
    rho?: number,
    tasaUtil?: number
}
