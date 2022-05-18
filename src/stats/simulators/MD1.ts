import { QueueingFunc,QueueingTable } from "../../types";

// lambda = tasaLlegadas
// nu = tasaServicios
interface MM1Params {
    tasaLlegadas: number,
    tasaServicios: number
}

const MD1 : QueueingFunc = (params: MM1Params) => {
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.nu = params.tasaServicios
    results.p = params.tasaLlegadas / params.tasaServicios 
    results.po = 1 - results.p
    results.Lq = Math.pow(results.po,2) / (2 * (1 - results.po))
    results.L = results.p + results.Lq
    results.Wq = results.Lq / params.tasaLlegadas
    results.W = results.Wq + (1/ params.tasaServicios)
    
    
    return results   
}



export default MD1;