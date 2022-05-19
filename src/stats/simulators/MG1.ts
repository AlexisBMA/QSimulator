import { QueueingFunc,QueueingTable } from "../../types";

// lambda = tasaLlegadas
// nu = tasaServicios
interface MG1Params {
    tasaLlegadas: number,
    tasaServicios: number,
    sigma: number
}

const MG1 : QueueingFunc = (params: MG1Params) => {
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.mu = params.tasaServicios
    results.p = params.tasaLlegadas / params.tasaServicios 
    results.p0 = 1 - results.p
    results.Lq = ((Math.pow(results.p0,2)*Math.pow(params.sigma,2)) + Math.pow(results.p,2))/ (2 * (1 - results.p0))
    results.L = results.p + results.Lq
    results.Wq = results.Lq / params.tasaLlegadas
    results.W = results.Wq + (1/ params.tasaServicios)
    
    
    return results   
}



export default MG1;