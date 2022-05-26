import { QueueingFunc,QueueingTable } from "../../types";
import {getCost} from '../cost';
// import {getCost} from '../'
interface MMsKParams {
    tasaLlegadas: number,
    tasaServicios: number,
    servidores: number, 
    maxClientes: number
}

const MMsK : QueueingFunc = (params: MMsKParams) => {
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.mu = params.tasaServicios
    results.k = params.maxClientes
    results.s = params.servidores
    results.p0 = getP0(results)
    results.Pk = ( (Math.pow((results.lambda/results.mu),results.k)) / (Factorial(results.s) * Math.pow((results.s), (results.k-results.s))) ) * results.p0
    results.rho = results.lambda/(results.s * results.mu)
    results.Lq = getLq(results)
    results.lambdaE = results.lambda * (1 - results.Pk)
    results.Wq = results.Lq / results.lambdaE
    results.W = results.Wq + (1/results.mu)
    results.L = results.lambdaE * results.W
    results.tasaUtil = 1 - results.p0
    results.p = results.rho
    return results
}

function Factorial(num: number): any {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * Factorial(num - 1));
    }
}

function getP0(params: any){
    let firstSum = 0
    let secondSum = 0

    for(let i = 0; i<=params.s; i++){
        firstSum += (Math.pow((params.lambda/params.mu), i)/(Factorial(i))) 
    }
    for(let i = (params.s + 1); i<=params.k; i++){
        secondSum += Math.pow((params.lambda/(params.s * params.mu)),(i-params.s))
    }
    secondSum = secondSum * ((Math.pow((params.lambda/params.mu), params.s))/(Factorial(params.s)))
    return  (1/(firstSum + secondSum))
}


function getLq(params:any){
    let firstPart = 0
    let secondPart = 0

    firstPart = (((params.p0*Math.pow((params.lambda/params.mu), params.s)*params.rho)) / (Factorial(params.s) * Math.pow((1-params.rho), 2)))
    secondPart = (1 - Math.pow((2/3),2) - (2* Math.pow((2/3),2)) * (1-(2/3)))

    return firstPart * secondPart
}

/* console.log("RESULTADO");
console.log(MMsK({
    tasaLlegadas: 3,
    tasaServicios: 2,
    servidores: 1,
    maxClientes: 3
}))
console.log("$")
console.log(getCost({
    Lq: 0.4307692307692305,
    Cw: 45,
    Cs: 89.8,
    s: 1,
})) */



export default MMsK;