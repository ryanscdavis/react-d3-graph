
import React from 'react'
import Graph from './Graph'
import Data from './pagerank.json'
import './App.css'

export default function () {

    return (
        <Graph
            nodes={Data.nodes}
            links={Data.links}
        />
    )
}