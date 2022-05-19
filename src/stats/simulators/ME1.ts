import { QueueingFunc,QueueingTable } from "../../types";

// lambda = tasaLlegadas
// nu = tasaServicios
interface ME1Params {
    tasaLlegadas: number,
    tasaServicios: number,
    k: number
}

const ME1 : QueueingFunc = (params: ME1Params) => {
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.nu = params.tasaServicios
    results.k = params.k
    results.p = params.tasaLlegadas / params.tasaServicios 
    results.po = 1 - results.p
    results.Lq =((1+results.k)/(2*results.k)) * (Math.pow(params.tasaLlegadas,2) / (params.tasaServicios * (params.tasaServicios - params.tasaLlegadas)))
    results.Wq = results.Lq / params.tasaLlegadas
    results.W = results.Wq + (1/ params.tasaServicios)
    results.L = params.tasaLlegadas * results.W
    
    return results   
}



export default ME1;