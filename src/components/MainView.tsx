import React, { useState } from 'react'
import Form from './Form'
import Result from './output/Result'
import ResultsAndCost from './ResultsAndCost'
import { QueueingTable } from '../types'
/* Global App State is managed from this component. */

export default function MainView() {

  const [random, setRandom] = useState<number | null>(null);
  const [randoms, setRandoms] = useState<number[]>([]);
  const [queueTable, setQueueTable] = useState<QueueingTable | null>(null);

  const [globalState, setGlobalState] = useState({
    modelName: '',
  })

  // updates modelName
  const updateGlobalState = (name: string, value: any) => {
    setGlobalState({
      ...globalState,
      [name]: value,
    })
  }

  const clearResults = () => {
    setQueueTable(null);
  }

  const hasResults = (): boolean => queueTable !== null; //randoms.length > 1;
  const updateResult = (result: QueueingTable) => {
    setQueueTable(result);
  }

  return (
    <div className="App-main">
      <div className="row">
          <Form
          updateResult={updateResult}
            clearResults={clearResults}
            updateGlobalState={updateGlobalState}
          />
      </div>
      {hasResults() && (
        <div className="resultsAndCost">
          <ResultsAndCost table={queueTable!} modelName={globalState.modelName}/>
        </div>
      )}
    </div >

  )
}
