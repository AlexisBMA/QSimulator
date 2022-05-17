import React, { ChangeEventHandler, useState, useEffect } from 'react'
import { Button, TextField, Stack, Select, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { validateNumeric, paramsToIntegers, isInteger } from '../utils'
import { MODELS } from '../stats/models'
import { QueueModels } from '../QueueModels'
import { CongruentialParams, QueueModelFormInputs, QueueModelParams } from '../types'
import { MODEL_PARAMS_CHECKS } from '../stats/models'

interface Props {
	updateRandoms: (randoms: number[]) => void,
	setError: (error: string) => void,
	clearRandoms: () => void,
	updateGlobalState: (name: string, value: any) => void,
}


const Form: React.FC<Props> = ({
	setError,
	updateGlobalState,
}) => {

	const [model, setModel] = useState<string>(QueueModels.MM1);
	const [seed, setSeed] = useState<string>("");
	const [numberServers, setNumberRandoms] = useState<string>("1");  // number type html inputs hold strings
	const [arrivalRate, setArrivalRate] = useState<string>("1");
	const [serviceRate, setServiceRate] = useState<string>("1");

	const [maxUsers, setMaxUsers] = useState<string>("");
	const [stDev, setStDev] = useState<string>("0.0");

	const [disableNumServers, setDisableNumServers] = useState<boolean>(true);
	const [params, setParams] = useState<any>({});
	const [needsKParam, setNeedsKParam] = useState<boolean>(false);
	const [needsStDev, setNeedsStDev] = useState<boolean>(false);
	const [completeForm, setCompleteForm] = useState<boolean>(false);


	useEffect(() => {
		updateGlobalState('model', model);
	}, [])

	useEffect(() => {          // completeForm updater
		if (model !== "" && completeParams({numberServers, arrivalRate, serviceRate, maxUsers, stDev}, model)) {
			setCompleteForm(true);
		} else {
			setCompleteForm(false);
		}
	}, [numberServers, arrivalRate, serviceRate, maxUsers, stDev])

	useEffect(() => {          // completeForm updater
		if (model !== "" && validateNumeric(arrivalRate) && validateNumeric(serviceRate)) {
			setCompleteForm(true);
		} else {
			setCompleteForm(false);
		}
	}, [model, serviceRate, arrivalRate])

	useEffect(() => {
		// disableNumServers 
		if (model === QueueModels.MMS || model === QueueModels.MMSK) {
			setDisableNumServers(false);
		} else {
			setDisableNumServers(true);
		}

		setNeedsKParam(model === QueueModels.MMSK);
		setNeedsStDev(model === QueueModels.MD1 || model === QueueModels.ME1 || model === QueueModels.MG1); 

	}, [model])

	const handleMethodChange = (event: SelectChangeEvent) => {
		setParams({})
		setModel(event.target.value);
		console.log("Model selected:", event.target.value);
		//updateGlobalState('model', event.target.value);
	}



	const onSubmit = (): void => {

		const n = Number(numberServers);

		if (n <= 0) {
			setError('Número de servidores inválido')
			console.log("numRandoms not an int")
			return;
		}

		console.log("Form Params", params);

		if (!arrivalRate || !serviceRate) {
			setError("Please fill the inputs");
			console.log("lambda or mu are empty");
			return;
		};

		if (serviceRate < arrivalRate) {
			setError("For the system to be stable, arrival rate should be less than service rate");
			console.log("unstable system inputs");
			return;
		}

		if (needsKParam && !maxUsers) {
			setError("Enter parameter k for max number of users in system");
			console.log("unstable system inputs");
			return;
		}

		if (needsKParam && numberServers > maxUsers) {
			setError("Number of servers must be less than max number of users.");
			console.log("incorrect MMSK system inputs");
			return;
		}

		// TODO checks for General Case

		console.log("Method selected:", model);
		console.log("arrivalRate", arrivalRate);
		console.log("serviceRate", serviceRate);
		console.log("maxUsers", maxUsers);  // empty string = infinity
		console.log("stDev", stDev);

		if (!(model in MODELS)) {
			setError("No implementado aún :P");
			return;	
		}



		return;
		
	}

	return (
		<div className="formContainer">
			<Stack spacing={2} className="formStack">
				<h4>Sistema de Colas:</h4>
				<Select
					labelId="model-selector-label"
					id="model-selector"
					value={model}
					onChange={handleMethodChange}
				>
					<MenuItem value="">
						<em>No Selection</em>
					</MenuItem>

					{/* QS */}
					<MenuItem value={QueueModels.MM1}>M/M/1</MenuItem>
					<MenuItem value={QueueModels.MMS}>M/M/s</MenuItem>
					<MenuItem value={QueueModels.MMSK}>M/M/s/k</MenuItem>
					<MenuItem value={QueueModels.MG1}>M/G/1</MenuItem>
					<MenuItem value={QueueModels.MD1}>M/D/1</MenuItem>
					<MenuItem value={QueueModels.ME1}>M/E/1</MenuItem>

				</Select>
				<TextField type="number" label="No. of Servers" variant="filled" disabled={disableNumServers}
					value={numberServers}
					onChange={(e) => setNumberRandoms(e.target.value)}></TextField>
				<TextField type="number" label="Arrival Rate (hourly)" variant="filled"
					value={arrivalRate}
					onChange={(e) => setArrivalRate(e.target.value)}></TextField>
				<TextField type="number" label="Service Rate (hourly)" variant="filled"
					value={serviceRate}
					onChange={(e) => setServiceRate(e.target.value)}></TextField>

				{/* Captures extra params: */}
				{
					needsKParam && (
						<TextField type="number" label="Max. Users in System (k)" variant="filled"
							value={maxUsers}
							onChange={(e) => setMaxUsers(e.target.value)}></TextField>
					)
				}
				{
					needsStDev && (
						<TextField label="Standard Deviation" variant="filled"
							value={stDev}
							onChange={(e) => setStDev(e.target.value)}></TextField>
					)
				}

			</Stack>

			{/* Submit Button */}
			<div className="buttonContainer">
				<Button disabled={!completeForm} variant="contained" size="large" onClick={onSubmit}>Compute Characteristics</Button>
			</div>
		</div>
	)
}


const completeParams = (params: QueueModelFormInputs, model: string) => {
	return MODEL_PARAMS_CHECKS[model](params);
}


export default Form;