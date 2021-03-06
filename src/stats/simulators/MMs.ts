import { QueueingFunc, QueueingTable } from "../../types";

interface MMsParams{
    tasaLlegadas: number,
    tasaServicios: number,
    servidores: number
}

const MMs : QueueingFunc = (params: MMsParams) => {
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.mu = params.tasaServicios
    results.s = params.servidores
    results.p = results.lambda / (results.s * results.mu)
    results.p0 = getPo(results)
    results.Lq = getLq(results)
    results.L = results.Lq + (results.lambda/results.mu)
    results.Wq = results.Lq / results.lambda
    results.W = results.Wq + (1/results.mu)
    return results
}


function Factorial(num:number):any
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

function getPo(params: any): number{
    let getSum = 0
    for(let i=0; i<params.s; i++){
        getSum += Math.pow((params.lambda/params.mu), i) / Factorial(i)
    }
    let Po = 1/(getSum + (Math.pow((params.lambda/params.mu),params.s)/Factorial(params.s)) * (1/(1-(params.lambda/(params.s*params.mu)))))
    return Po
}

function getLq(params:any): number{
    let Lq = (params.p0 * Math.pow((params.lambda/params.mu), params.s) * params.p) / (Factorial(params.s) * Math.pow((1 - params.p), 2))
    return Lq
}



export default MMs;