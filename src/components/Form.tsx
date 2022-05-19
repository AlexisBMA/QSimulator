import React, { ChangeEventHandler, useState, useEffect } from 'react'
import { Alert, Button, TextField, Stack, Select, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { validateNumeric, paramsToIntegers, isInteger } from '../utils'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

import { MODELS } from '../stats/models'
import { QueueModels } from '../QueueModels'
import {  QueueingTable, QueueModelFormInputs } from '../types'
import { MODEL_PARAMS_CHECKS } from '../stats/models'

interface Props {
	updateResult: (result: QueueingTable) => void,
	// setError: (error: string) => void,
	clearResults: () => void,
	updateGlobalState: (name: string, value: any) => void,
}


const Form: React.FC<Props> = ({
	// setError,
	updateResult,
	updateGlobalState,
	clearResults,
}) => {

	const [model, setModel] = useState<string>(QueueModels.MM1);
	const [numberServers, setNumberRandoms] = useState<string>("1");  // number type html inputs hold strings
	const [arrivalRate, setArrivalRate] = useState<string>("1");
	const [serviceRate, setServiceRate] = useState<string>("2");

	const [maxUsers, setMaxUsers] = useState<string>("");
	const [stDev, setStDev] = useState<string>("0.0");

	const [disableNumServers, setDisableNumServers] = useState<boolean>(true);
	const [needsKParam, setNeedsKParam] = useState<boolean>(false);
	const [needsStDev, setNeedsStDev] = useState<boolean>(false);
	const [completeForm, setCompleteForm] = useState<boolean>(false);
	const [alert, setAlert] = useState<ReactJSXElement | null>(null);

	// Check form completeness according to model
	useEffect(() => {          // completeForm updater
		if (model !== "" && completeParams({ numberServers, arrivalRate, serviceRate, maxUsers, stDev }, model)) {
			setCompleteForm(true);
		} else {
			setCompleteForm(false);
		}
	}, [numberServers, arrivalRate, serviceRate, maxUsers, stDev])

	// Activate Submit button
	useEffect(() => {
		if (model !== "" && validateNumeric(arrivalRate) && validateNumeric(serviceRate)) {
			setCompleteForm(true);
		} else {
			setCompleteForm(false);
		}
	}, [model, serviceRate, arrivalRate])

	// On 'model' change
	useEffect(() => {
		clearResults();

		if (model === QueueModels.MMS || model === QueueModels.MMSK) {
			setDisableNumServers(false);
		} else {
			setDisableNumServers(true);
		}

		setNeedsKParam(model === QueueModels.MMSK);
		setNeedsStDev(model === QueueModels.MD1 || model === QueueModels.ME1 || model === QueueModels.MG1);

	}, [model])

	const setError = (error: string): void => {
		if (error !== "") {
			setAlert(<Alert severity="error">{error}</Alert>);
		} else {
			setAlert(null);
		}
	}

	const handleModelChange = (event: SelectChangeEvent) => {
		setError("");
		console.log("Empty error...")
		setModel(event.target.value);
		updateGlobalState('modelName', event.target.value);
		console.log("Model selected:", event.target.value);
	}

	const onSubmit = (): void => {
		setError("");
		const servidores = Number(numberServers);

		if (servidores <= 0) {
			setError('Número de servidores inválido')
			console.log("numRandoms not an int")
			return;
		}

		if (!arrivalRate || !serviceRate) {
			setError("Please fill the inputs");
			console.log("lambda or mu are empty");
			return;
		};

		if (needsKParam && !maxUsers) {
			setError("Missing max number of users in system");
			console.log("Missing parameter k");
			return;
		}

		// Convert all inputs to number;
		let tasaLlegadas, tasaServicios, maxClientes, sigma: number;
		tasaLlegadas = Number(arrivalRate);
		tasaServicios = Number(serviceRate);
		maxClientes = Number(maxUsers);

		if (Number.isNaN(tasaLlegadas) || Number.isNaN(tasaServicios) || needsKParam && Number.isNaN(maxClientes)) {
			setError("Inputs must be numeric");
			console.log("non-number inputs");
			return;
		}

		if (tasaServicios <= tasaLlegadas) {
			console.log("tasa", tasaServicios, "tasaLlegadas", tasaLlegadas)
			setError("For the system to be stable, arrival rate should be less than service rate");
			console.log("unstable system inputs");
			return;
		}

		if (needsKParam && servidores > maxClientes) {
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

		console.log("Results:")
		let params = {
			tasaLlegadas,
			tasaServicios,
			servidores,
			maxClientes,
		}

		let ans: QueueingTable = MODELS[model](params);
		console.log(ans)
		updateResult(ans);
	}

	return (
		<div className="formContainer">
			<Stack spacing={2} className="formStack">
				<h4>Enter System Parameters:</h4>
				<Select
					labelId="model-selector-label"
					id="model-selector"
					value={model}
					onChange={handleModelChange}
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
						<TextField type="number" label="Standard Deviation" variant="filled"
							value={stDev}
							onChange={(e) => setStDev(e.target.value)}></TextField>
					)
				}
				{alert}
			</Stack>

			{/* Submit Button */}
			<div className="buttonContainer">
				<Button disabled={!completeForm} variant="contained" size="large" onClick={onSubmit}>Compute Characteristics</Button>
			</div>
		</div>
	)
}


const completeParams = (params: QueueModelFormInputs, model: string) => {
	if (!(model in MODEL_PARAMS_CHECKS)) {
		console.log("model check not implemented", model);
		return true;
	}
	return MODEL_PARAMS_CHECKS[model](params);
}


export default Form;