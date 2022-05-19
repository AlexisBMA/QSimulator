export enum QueueModels {
    MM1 = '1',
    MMS = '2',
    MMSK = '3',
    MG1 = '4',
    MD1 = '5',
    ME1 = '6',
}

export const QueueModelNames : Record<string, string> = {
    [QueueModels.MM1]: "Markov / Markov / 1 server",
    [QueueModels.MMS]: "Markov / Markov / S servers",
    [QueueModels.MMSK]: "Markov / Markov / S servers / K max users",
    [QueueModels.MG1]: "Markov / General / 1 server",
    [QueueModels.MD1]: "Markov / Standard / 1 server",
    [QueueModels.ME1]: "Markov / Erlang / 1 server",
}