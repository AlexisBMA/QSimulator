import React from 'react'
import { Stack, List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import NumberList from './NumberList'
import { QueueingTable } from '../../types/index'

type Props = {
    queueTable: QueueingTable|null,
    random: number | null,
    alert: any,
    randoms: number[],
    method: string,
}

const Result: React.FC<Props> = ({
    queueTable,
    random,
    alert,
    randoms,
    method
}) => {

    return (
        <div className="resultContainer">
            <Stack spacing={3}>
                {alert}
                <div>
                    {random !== null ? `Tu aleatorio: ${random}`
                        : 'Llena los parámetros y haz click en "Generar"'
                    }
                </div>
                {queueTable ?
                    <>
                        <h3>Algo bien</h3>
                    </>
                    : <></>
                }

            </Stack>
        </div>
    )
}

export default Result