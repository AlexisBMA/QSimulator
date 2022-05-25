import { QueueingFunc,QueueingTable } from "../../types";

// lambda = tasaLlegadas
// nu = tasaServicios
interface MG1Params {
    tasaLlegadas: number,
    tasaServicios: number,
    sigma: number,
}

const MG1 : QueueingFunc = (params: MG1Params) => {
    console.log("MG1 params", params)
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.mu = params.tasaServicios
    results.p = params.tasaLlegadas / params.tasaServicios 
    results.p0 = 1 - results.p
    console.log((Math.pow(results.lambda,2)*Math.pow(params.sigma,2)))
    results.Lq = ((Math.pow(results.lambda,2)*Math.pow(params.sigma,2)) + Math.pow(results.p,2))/ (2 * (1 - results.p))
    results.L = results.p + results.Lq
    results.Wq = results.Lq / params.tasaLlegadas
    results.W = results.Wq + (1/ params.tasaServicios)
    results.s = 1;
    console.log("Results")
    console.log(results)
    return results   
}

/* console.log("MG1");
console.log(MG1({
    tasaLlegadas: 3,
    tasaServicios: 5,
    sigma: 0.1
})) */

export default MG1;