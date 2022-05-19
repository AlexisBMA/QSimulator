import React, { useState } from 'react'
import TableSwitch from './TableSwitch'
import CalculateIcon from '@mui/icons-material/Calculate';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Button, TextField, Stack, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { EXAMPLE_CHI_TABLE } from '../constants'
import { QueueingTable, ValidatorResult } from '../types';
import testKolSmi from '../stats/tests/kolmogrovSmirnov';
import chiSquaredTest from '../stats/tests/chiSquared';
import { kolSmiValues, chiSquaredValues } from '../criticalValues';

type Props = {
	modelName: string,
	table: QueueingTable
}

const ResultsAndCost: React.FC<Props> = ({ table, modelName }) => {
	/* Inputs: Waiting Cost and Service Cost */
	const [waitingCost, setWaitingCost] = useState<string>("");
	const [serviceCost, setServiceCost] = useState<string>("");

	const hasResults = () => table !== null;


	return (
		<>
			<h3 id="validation">Queue System Characteristics</h3>
			<p style={{ fontSize: 16 }}>Long term averages according to queue system model parameters</p>
			{
				hasResults() &&
				<TableSwitch data={table!} modelName={modelName} />
			}
			<div >
				<Stack spacing={2}>
					<h4 style={{marginBottom:10}}>System Cost Calculation</h4>					<div>
						<InputLabel id="select-label">Enter Service Cost:</InputLabel>
						<TextField type="number" label="Service Cost (Cs)" variant="filled"
							value={serviceCost}
							onChange={(e) => setServiceCost(e.target.value)}></TextField>
					</div>
					<div>
						<InputLabel id="select-label">Enter Waiting Cost:</InputLabel>
						<TextField type="number" label="Waiting Cost (Cw)" variant="filled"
							value={waitingCost}
							onChange={(e) => setWaitingCost(e.target.value)}></TextField>
					</div>
				</Stack>

			</div>
			<div className="validation-buttons">
				<Button variant="contained" id='validationButton' startIcon={<CalculateIcon />}
					onClick={() => console.log("Calculate Cost", serviceCost, waitingCost)}
				>Calculate Cost</Button>

			</div>
		</>
	)
}

export default ResultsAndCost;