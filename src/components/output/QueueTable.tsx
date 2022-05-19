import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {QueueModelNames} from '../../QueueModels'
import { QueueingTable, ValidatorResult } from '../../types'
import { CSVLink } from 'react-csv';
import { formatNum, tableToCSVData } from '../../utils';
import { Data } from 'react-csv/components/CommonPropTypes';

type Props = {
    table: QueueingTable,
    modelName: string,
}

const queueTableLabels = {
    L:'Average users in system (L)',
    Lq: 'Average users in queue (Lq)',
    W: 'Average user time in system (W)',
    Wq: 'Average user time in queue (Wq)',
} 


const TestTable: React.FC<Props> = ({ table, modelName }) => {

    const [csvData, setCsvData] = useState<Data>([]);

    useEffect(() => {
        if (table === null) return;

        console.log("converting to Data array");
        let dataArray = tableToCSVData(table);
        setCsvData(dataArray);
        console.log("CSV data:");
        console.log(dataArray);
    }, [table])

    if (table === null) return (
        <></>
    )

    return (
        <>
            <h5>{QueueModelNames[modelName] || 'Results'}</h5>
            <div className="flexDivX summaryStats">
                {Object.entries(queueTableLabels).map(([stat, label]) => (
                    <TextField
                        key={stat}
                        label={label}
                        variant='outlined'
                        value={(table as any)[stat]}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                ))}
                {/* <TextField
                    key={'result'}
                    label={'H₀: es Uniforme'}
                    variant='outlined'
                    value={true ? 'Se acepta' : 'Se rechaza'}
                    InputProps={{
                        readOnly: true,
                    }}
                    color={
                        true ?
                            'success'
                            : 'error'
                    }
                    focused
                /> */}
            </div>
            <div style={{paddingBottom:'30px',paddingLeft:'60px',paddingRight:'60px', marginTop:20}}>
            <CSVLink
                data={csvData}
                filename={`${modelName}_simulation.csv`}
                style={{ textDecoration: 'none' }}
            >
                <Button variant='outlined' fullWidth>
                    Exportar a CSV
                </Button>
            </CSVLink>
            </div>

        </>

    )
}

export default TestTable;