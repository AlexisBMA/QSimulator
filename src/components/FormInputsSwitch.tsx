import React from 'react'
import MidSquares from './subforms/MidSquares';
import SimpleCongruential from './subforms/SimpleCongruential';
import CombinedCongruential from './subforms/CombinedCongruential';
import {RNG} from '../RNGs'
import { QueueModels } from '../QueueModels';
import MM1Form from './subforms/MM1Form';
// importar todos los inputs específicos a métodos

export interface IFormInputsSwitchProps {
    model: string,
    updateHandler: (event: React.ChangeEvent<any>) => void, 
	  params: any
}

const FormInputsSwitch : React.FC<IFormInputsSwitchProps> = ({
  model,
  updateHandler,
  params 
}) => {

  if (model === QueueModels.MM1 || model === QueueModels.MMS) {
    return (
      <MM1Form />
    )
  }

  if (model===RNG.MidSquares) {
    return (
      <MidSquares/>
    )
  }

  if (model===RNG.MixedCongruential || model===RNG.LinearCongruential || model === RNG.MultiplicativeCongruential) {
    return (
      <SimpleCongruential updateHandler={updateHandler} {...params} isMultiplicative={model===RNG.MultiplicativeCongruential}/>
    )
  }

  if (model===RNG.CombinedCongruential) {
    return (
      <CombinedCongruential updateHandler={updateHandler} params={params}/> /* Key is params.combinedParams */
    )
  }

  return (
    <>
    </>
  );
}

export default FormInputsSwitch
