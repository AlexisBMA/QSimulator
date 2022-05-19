import { QueueModelParams, QueueModelFormInputs } from '../types'

export const MM1Validation = (params: QueueModelParams) => {
    return Boolean(
        params.arrivalRate && params.arrivalRate > 0 &&
        params.serviceRate && params.serviceRate > 0
    )
}

export const MMsValidation = (params: QueueModelParams) => {
    return Boolean(
        params.arrivalRate && params.arrivalRate > 0 &&
        params.serviceRate && params.serviceRate > 0 &&
        params.numberServers && params.numberServers > 0
    )
}

export const MMskValidation = (params: QueueModelParams) => {
    return Boolean(
        params.arrivalRate && params.arrivalRate > 0 &&
        params.serviceRate && params.serviceRate > 0 &&
        params.numberServers && params.numberServers > 0 &&
        params.maxUsers && params.numberServers <= params.maxUsers
    )
}


export const MM1Check = (params: QueueModelFormInputs) => {
    return Boolean(
        params.arrivalRate &&
        params.serviceRate
    )
}

export const MMsCheck = (params: QueueModelFormInputs) => {
    return Boolean(
        params.arrivalRate &&
        params.serviceRate && 
        params.numberServers
    )
}

export const MMskCheck = (params: QueueModelFormInputs) => {
    return Boolean(
        params.arrivalRate &&
        params.serviceRate && 
        params.numberServers &&
        params.maxUsers
    )
}