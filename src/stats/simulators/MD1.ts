import { QueueingFunc,QueueingTable } from "../../types";

// lambda = tasaLlegadas
// nu = tasaServicios
interface MD1Params {
    tasaLlegadas: number,
    tasaServicios: number
}

const MD1 : QueueingFunc = (params: MD1Params) => {
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.mu = params.tasaServicios
    results.p = params.tasaLlegadas / params.tasaServicios 
    results.p0 = 1 - results.p
    results.Lq = Math.pow(results.p,2) / (2 * (1 - results.p)) // corrected p0->p
    results.L = results.p + results.Lq
    results.Wq = results.Lq / params.tasaLlegadas
    results.W = results.Wq + (1/ params.tasaServicios)
    results.s = 1
    
    
    return results   
}



export default MD1;