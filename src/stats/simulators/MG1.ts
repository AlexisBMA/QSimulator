import { QueueingFunc,QueueingTable } from "../../types";

// CHECKED
interface MG1Params {
    tasaLlegadas: number,
    tasaServicios: number,
    sigma: number,
}

const MG1 : QueueingFunc = (params: MG1Params) => {
    console.log("MG1 params", params)
    let results: QueueingTable = {}

    const {tasaLlegadas, tasaServicios, sigma} = params;

    results.lambda = tasaLlegadas
    results.mu = tasaServicios
    results.p = tasaLlegadas / tasaServicios 
    results.s = 1;

    results.p0 = 1 - results.p  // 1 - rho

    results.Lq = ((Math.pow(results.lambda,2)*Math.pow(sigma,2)) + Math.pow(results.p,2))/ (2 * (1 - results.p))

    results.L = results.p + results.Lq

    results.Wq = results.Lq / tasaLlegadas

    results.W = results.Wq + (1/tasaServicios)

    console.log("MG1 results")
    console.log(results)
    return results   
}

export default MG1;