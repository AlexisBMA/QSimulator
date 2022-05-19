/* methods.ts equivalent  */
import { QueueModels } from "../QueueModels";
import { ParamsValidator } from "../types";
import MM1 from "../stats/simulators/MM1";
import MMS from "../stats/simulators/MMs";
import MMSK from "../stats/simulators/MMsK";
import MD1 from "./simulators/MD1";
import ME1 from "./simulators/ME1";
import MG1 from "./simulators/MG1";
import { QueueingFunc } from "../types";
import { MM1Check, MMsCheck, MMskCheck, MD1Check, ME1Check, MG1Check } from "./paramValidation";


export const MODELS : Record<string, QueueingFunc> = {
    [QueueModels.MM1]: MM1,
    [QueueModels.MMS]: MMS,
    [QueueModels.MMSK]: MMSK,
    [QueueModels.MD1]: MD1,
    [QueueModels.ME1]: ME1,
    [QueueModels.MG1]: MG1
}

export const MODEL_PARAMS_CHECKS : Record<string, ParamsValidator> = {
    [QueueModels.MM1]: MM1Check,
    [QueueModels.MMS]: MMsCheck,
    [QueueModels.MMSK]: MMskCheck,
    [QueueModels.MD1]: MD1Check,
    [QueueModels.ME1]: ME1Check,
    [QueueModels.MG1]: MG1Check
}

export const MODEL_PARAMS_VALIDATORS : Record<string, ParamsValidator> = {
    
}