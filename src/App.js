
import React from 'react'
import Graph from './Graph'
import './App.css'

export default function () {

    const nodes = [
        {
            id: 1,
            size: 1
        },
        {
            id: 2,
            size: 2
        }
    ]

    const links = [
        {
            source: 1,
            target: 2
        }
    ]

    return (
        <Graph
            nodes={nodes}
            links={links}
        />
    )
}
