
import React from 'react'
import Graph from './Graph'
import Data from './pagerank_0.15_directed.json'
import './App.css'

export default function () {

    return (
        <Graph
            nodes={Data.nodes}
            links={Data.links}
        />
    )
}