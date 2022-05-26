import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { QueueModelNames } from '../../QueueModels'
import { QueueingTable } from '../../types'
import {toMinutes} from '../../utils';
import { Data } from 'react-csv/components/CommonPropTypes';

type Props = {
    table: QueueingTable,
    modelName: string,
}

const queueTableLabels = {
    p: 'Utilization (ρ)',
    L: 'Average users in system (L)',
    Lq: 'Average users in queue (Lq)',
    W: 'Average hours in system (W)',
    Wq: 'Average hours in queue (Wq)',
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
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 30 }}>
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
                    <h6>Times in Minutes</h6>
                    <TextField
                        key={'W minutes'}
                        label={'Average minutes in system (W)'}
                        variant='outlined'
                        value={toMinutes((table as any)['W'])}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        key={'Wq minutes'}
                        label={'Average minutes in queue (Wq)'}
                        variant='outlined'
                        value={toMinutes((table as any)['Wq'])}
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                </Stack>


            </div>

        </>

    )
}

export default TestTable;