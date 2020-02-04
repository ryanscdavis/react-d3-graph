
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
        },
        {
            id: 3,
            size: 3
        }
    ]

    const links = [
        {
            source: 1,
            target: 2
        },
        {
            source: 1,
            target: 3
        },
        {
            source: 2,
            target: 3
        }
    ]

    return (
        <Graph
            nodes={nodes}
            links={links}
        />
    )
}
