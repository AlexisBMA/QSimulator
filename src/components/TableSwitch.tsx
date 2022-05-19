import React from 'react'
import QueueTable from './output/QueueTable'
import { QueueingTable } from '../types'


type Props = {
    data: QueueingTable,
    modelName: string,
}

const TableSwitch : React.FC<Props> = ({
    data,
    modelName
}) => {

    // Don't show anything if there is no table data
    if (!data) {
        return <></>
    }

    return (
        <QueueTable table={data} modelName={modelName}/>
    )
    
}

export default TableSwitch