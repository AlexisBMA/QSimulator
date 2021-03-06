import React, { useState, useEffect } from 'react'
import TableSwitch from './TableSwitch'
import CalculateIcon from '@mui/icons-material/Calculate';
import { Button, Stack, InputLabel, FormControl } from '@mui/material'
import { QueueingTable } from '../types';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { CostParams, getCost } from '../stats/cost';

const centered: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	minHeight: 300
}

type Props = {
	modelName: string,
	table: QueueingTable
}

type CostResultProps = {
	cost: number,
}

const CostResult: React.FC<CostResultProps> = ({ cost }) => {
	if (!cost) {
		return <></>
	}
	return (
		<div style={centered}>
			<Stack spacing={2} className="formStack">
				<h4 >Total Cost</h4>
				<OutlinedInput
					id="outlined-adornment-amount"
					value={cost}
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
					label="Total Cost"
					inputProps={{
						readOnly: true,
					}}
					color={
                        'success'
                    }
				/>
			</Stack>
		</div>

	)
}


const ResultsAndCost: React.FC<Props> = (props:Props) => {
	/* Inputs: Waiting Cost and Service Cost */
	const [waitingCost, setWaitingCost] = useState<string>("");
	const [serviceCost, setServiceCost] = useState<string>("");
	const [cost, setCost] = useState<number | null>(null);

	const hasResults = () => props.table !== null;
	const hasCost = () => cost !== null;

	const calculateCost = (Cw: number, Cs: number): number => {
		const params: CostParams = {
			Lq: props.table!.Lq!,
			s: props.table!.s!,
			Cw,
			Cs,
		}
		console.log("params", params);
		return getCost(params);
	}

	useEffect(() => {
		setCost(null);
	}, [props.table])

	const handleOnClick = () => {

		let Cw, Cs;
		Cw = Number(waitingCost);
		Cs = Number(serviceCost);
		console.log("Get Cost", Cw, Cs);
		if (Number.isNaN(Cw) || Number.isNaN(Cs)) {
			return;
		}

		if (props.table.Lq === undefined || props.table.s === undefined) {
			console.log("missing params: Lq or s")   // TOFIX
			return;
		};

		let c = calculateCost(Cw, Cs);
		setCost(c);
	}

	return (
		<>
			<h3 id="validation">Queue System Characteristics</h3>
			<p style={{ fontSize: 16 }}>Long term averages according to queue system model parameters</p>
			{
				hasResults() &&
				<TableSwitch data={props.table!} modelName={props.modelName} />
			}
			<div style={centered}>
				<Stack spacing={2} className="formStack">
					<h4 style={{ marginBottom: 10 }}>System Cost Calculation $</h4>
					<FormControl>
						<InputLabel htmlFor="service-cost">Enter Service Cost:</InputLabel>
						<OutlinedInput
							id="service-cost"
							type="number"
							label="Service Cost (Cs)"
							value={serviceCost}
							startAdornment={<InputAdornment position="start">$</InputAdornment>}
							onChange={(e) => setServiceCost(e.target.value)}></OutlinedInput>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="waiting-cost">Enter Waiting Cost:</InputLabel>
						<OutlinedInput
							id="waiting-cost"
							type="number"
							value={waitingCost}
							label="Waiting Cost (Cw)"
							startAdornment={<InputAdornment position="start">$</InputAdornment>}
							onChange={(e) => setWaitingCost(e.target.value)}></OutlinedInput>
					</FormControl>
				</Stack>
			</div>
			<div className="validation-buttons">
				<Button variant="contained" id='validationButton' startIcon={<CalculateIcon />}
					onClick={handleOnClick}
				>Calculate Cost</Button>
			</div>
			{hasCost() && <CostResult cost={cost!} />}
		</>
	)
}

export default ResultsAndCost;