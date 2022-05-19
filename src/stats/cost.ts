import { CostFunc } from "../types";
interface CostParams {
    lq : number,
    cw: number,
    cs: number, 
    s: number
}

const CostParams : CostFunc = (params: CostParams) => {
    let result: number = 0
    result = (params.lq*params.cw)+(params.cs * params.s)
    
    return result  
}



export default CostParams;