
import React from 'react'
import { useEffect, useRef } from 'react'

import * as d3 from 'd3'

const create = function (ref, nodes, links) {

    console.log('create')

    const width = 1000
    const height = 1000

    const cx = 0.5 * width
    const cy = 0.5 * height

    const svg = d3.select(ref.current)
        .style('width', width)
        .style('height', height)

    const fCharge   = d3.forceManyBody().strength(-20)
    const fLink     = d3.forceLink(links).distance(200).strength(1).id(d => d.id)
    const fCenter   = d3.forceCenter(cx, cy)

    const sim = d3.forceSimulation()
        .nodes(nodes)
        .force('charge', fCharge)
        .force('link', fLink)
        .force('center', fCenter)

    svg.selectAll('circle').data(nodes).enter().append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 50)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 5)

    sim.on('tick', () => {
        svg.selectAll('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
    })

}

export default function (props) {

    const { nodes, links } = props

    const ref = useRef(null)

    useEffect(() => create(ref, nodes, links))

    console.log('render')
    return (
        <svg id='graph' ref={ref}/>
    )

}