import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { QueueModelNames } from '../../QueueModels'
import { QueueingTable } from '../../types'
import { CSVLink } from 'react-csv';
import { Data } from 'react-csv/components/CommonPropTypes';

type Props = {
    table: QueueingTable,
    modelName: string,
}

const queueTableLabels = {
    L: 'Average users in system (L)',
    Lq: 'Average users in queue (Lq)',
    W: 'Average user time in system (W)',
    Wq: 'Average user time in queue (Wq)',
}


const TestTable: React.FC<Props> = ({ table, modelName }) => {

    const [csvData, setCsvData] = useState<Data>([]);

    useEffect(() => {
        if (table === null) return;

        console.log("converting to Data array");
        /* let dataArray = tableToCSVData(table);
        setCsvData(dataArray);
        console.log("CSV data:");
        console.log(dataArray); */
    }, [table])

    if (table === null) return (
        <></>
    )

    return (
        <>
            <h5>{QueueModelNames[modelName] || 'Results'}</h5>
            <div style={{display:'flex', justifyContent:'center', paddingBottom:30}}>
                <Stack spacing={2} className="formStack">
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
                        {/* <CSVLink
                            data={csvData}
                            filename={`${modelName}_simulation.csv`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button disabled variant='outlined' fullWidth>
                                Exportar a CSV
                            </Button>
                        </CSVLink> */}
                </Stack>


            </div>

        </>

    )
}

export default TestTable;