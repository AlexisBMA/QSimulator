import { CostFunc } from "../types";
export interface CostParams {
    Lq : number,
    Cw: number,
    Cs: number, 
    s: number
}

export const getCost : CostFunc = (params: CostParams) => {
    let result: number = 0
    result = (params.Lq*params.Cw)+(params.Cs * params.s)
    
    return result  
}
