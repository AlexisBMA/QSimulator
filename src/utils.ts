
import { Data } from 'react-csv/components/CommonPropTypes';

export const isInteger = (x: any) => Number.isInteger(Number(x));

export const paramsToIntegers = (params: any): any => {
    const result: any = {}
    for (const key in params) {
        result[key] = Number.parseInt(params[key]);   // for all of our methods we use only integer parameters
        if (Number.isNaN(result[key])) {
            console.error("Incorrect parameter:", key, params[key]);
            return null;
        }
    }
    return result;
}

export const validateNumeric = (val: string): boolean => {
    return !Number.isNaN(Number(val.trim()))
};


export const safeInteger = (integer: number): boolean => {
    if (integer < 0 || integer + 1 >= Number.MAX_SAFE_INTEGER) {
        return false;
    }
    return true;
}

export const GCD = (a: number,b: number): any => {
    if(!b){
        return a
    }
    return GCD(b, a % b)
}

export const areRelativePrimes = (m: number, c: number) => GCD(m, c) === 1;

const getPrimesOf = (x: number): number[] => {
    let sieve = [];
    let i;
    let j;
    let primes = [];

    for (i = 2; i <= x; ++i) {
        if (!sieve[i]) {

            if (x % i === 0) {
                primes.push(i);
            }

            for (j = i << 1; j <= x; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}

export const divisibleByPrimes = (a_1:number, m:number) : boolean => {
    // a-1 is divisible by all prime factors of m
    const primes = getPrimesOf(m);
    for (let p of primes) {
        if (a_1 % p !==0 ) return false;
    }
    return true;
}

export const divisibleByFourCheck = (a_1:number, m:number) : boolean => {
    // if m is divisible by four, then a-1 is divisible by 4
    if (m%4 !== 0) return true;  // not divisble by four so no problem
    return a_1%4 === 0;
}

// console.log(getPrimesOf(166));

export const formatNum = (x:number, d:number): number => {
    let factor = 10 ** d;
    return Math.floor(x * factor) / factor
}


export const toHourlyRate = (minuteRate:number) : number => {
	return minuteRate * 60;
}

export const toMinutes = (hours:number) : number => {
    return hours * 60;
}
