import { QueueingFunc,QueueingTable } from "../../types";

// lambda = tasaLlegadas
// nu = tasaServicios
interface MM1Params {
    tasaLlegadas: number,
    tasaServicios: number,
    servidores: number
}

const MM1 : QueueingFunc = (params: MM1Params) => {
    console.log("MM1");
    console.log(params);
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.mu = params.tasaServicios
    results.p = params.tasaLlegadas / params.tasaServicios 
    results.p0 = 1 - results.p
    results.Lq = Math.pow(params.tasaLlegadas,2) / (params.tasaServicios * (params.tasaServicios - params.tasaLlegadas))
    results.L = params.tasaLlegadas / (params.tasaServicios - params.tasaLlegadas)
    results.Wq = results.Lq / params.tasaLlegadas
    results.W = results.L / params.tasaLlegadas
    results.s = params.servidores 
    console.log("results");
    console.log(results);
    return results   
}



export default MM1;