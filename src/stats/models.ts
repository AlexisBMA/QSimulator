/* methods.ts equivalent  */
import { QueueModels } from "../QueueModels";
import { ParamsValidator } from "../types";
import MM1 from "../stats/simulators/MM1";
import MMS from "../stats/simulators/MMs";
import MMSK from "../stats/simulators/MMsK";
import { QueueingFunc } from "../types";
import { MM1Check, MMsCheck, MMskCheck } from "./paramValidation";


export const MODELS : Record<string, QueueingFunc> = {
    [QueueModels.MM1]: MM1,
    [QueueModels.MMS]: MMS,
    [QueueModels.MMSK]: MMSK,
}

export const MODEL_PARAMS_CHECKS : Record<string, ParamsValidator> = {
    [QueueModels.MM1]: MM1Check,
    [QueueModels.MMS]: MMsCheck,
    [QueueModels.MMSK]: MMskCheck,
}

export const MODEL_PARAMS_VALIDATORS : Record<string, ParamsValidator> = {
    
}