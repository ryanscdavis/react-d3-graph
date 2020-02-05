
import React from 'react'
import { useEffect, useRef } from 'react'

import * as d3 from 'd3'

const create = function (ref, nodes, links) {

    console.log('create')

    const width = 1000
    const height = 1000

    const minRad = 50
    const maxRad = 70

    const minSize = Math.min(...nodes.map(n => n.size))
    const maxSize = Math.max(...nodes.map(n => n.size))

    const cx = 0.5 * width
    const cy = 0.5 * height
    const lineScale = 0.15
    const lineColor = d3.color('rgb(50, 50, 50)')

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

    const radScale = d3.scaleLinear().domain([0, Math.sqrt(maxSize)]).range([0, maxRad])

    nodes = nodes.map(n => Object.assign(n, { radius: radScale(Math.sqrt(n.size)) }))

    svg.selectAll('circle').data(nodes).enter().append('circle')
        .attr('r', d => d.radius)
        .attr('fill', 'none')
        .attr('stroke', lineColor)
        .attr('stroke-width', d => d.radius*lineScale)

    svg.selectAll('line').data(links).enter().append('line')
        .style('stroke', lineColor)
        .attr('fill', 'none')
        .attr('stroke-width', d => 0.5*(d.source.radius + d.target.radius)*lineScale)

    svg.selectAll('text').data(nodes).enter().append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text(d => d.labelInside)

    sim.on('tick', () => onTick(svg, links))

}

const onTick = function (svg, links) {

    links.forEach(link => {
        link.angle = Math.atan2(link.target.y - link.source.y, link.target.x - link.source.x)
    })

    svg.selectAll('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)

    svg.selectAll('line')
        .attr('x1', d => d.source.x + d.source.radius*Math.cos(d.angle))
        .attr('y1', d => d.source.y + d.source.radius*Math.sin(d.angle))
        .attr('x2', d => d.target.x - d.target.radius*Math.cos(d.angle))
        .attr('y2', d => d.target.y - d.target.radius*Math.sin(d.angle))

    svg.selectAll('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y)

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