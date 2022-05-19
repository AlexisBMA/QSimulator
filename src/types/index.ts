export type ParamsValidator = (params: any) => boolean;


export type Handler = (event: React.ChangeEvent<any>) => void;

// QS 
export interface QueueModelParams {
    arrivalRate: number,
    serviceRate: number,
    numberServers: number,
    maxUsers?:number,
    stDev?: number,
}

export interface QueueModelFormInputs {
    arrivalRate: string,
    serviceRate: string,
    numberServers: string,
    maxUsers?:string,
    stDev?: string,
}


export type QueueingFunc = (params: any) => QueueingTable;

export interface QueueingTable {
    lambda?: number,
    nu?: number,
    p?:number,
    po?:number,
    Lq?:number,
    L?:number,
    Wq?:number,
    W?:number,
    s?: number
    k?: number,
    lambdaE?: number,
    Pk?: number,
    ro?: number,
    tasaUtil?: number
}
