/**
 * Class for creating a piechart. Pass parameters as React props. This class will automatically include PieArch class and pass required props.<br><br>
 * @constructor PieApp
 * @param {number} [height=500] - Height of the SVG area
 * @param {number} [width=500] - Width of the SVG area
 * @param {number} [margin=40] - Margin from the pie to the edge of the SVG area
 * @param {array} data - An array of the data over which to create the pie
 * @param {number} [innerRadius=0] - The inner radius of the piechart.
 * @param {function} value - A function to determine the value used to create the piechart. (d) => { return d['NAME'] }
 * @param {array} [colorRange=['#FF0000', '#00FF00', '#0000FF']] - An array of the colors to use in the piechart.
*/

import React, { Component, PropTypes } from 'react'
import d3 from 'd3'

import { PieArch } from './pie_arch'

export class PieApp extends Component {
  constructor (props) {
    super(props)
    this.makeArch = this.makeArch.bind(this)
    this.state = {
      arches: props.arches
    }
  }

  componentWillMount () {
    this.pie = d3.layout.pie()
    this.pie.value(this.props.value)

    this.color = d3.scale.ordinal()
      .range(this.props.colorRange)

    this.arc = d3.svg.arc()
      .outerRadius(Math.min(this.props.height, this.props.width) / 2 - this.props.margin)
      .innerRadius(this.props.innerRadius)

    this.setState({
      arches: this.pie(this.props.data)
    })
  }

  makeArch (arch) {
    return (
      <PieArch
        arc={this.arc}
        data={arch}
        color={this.color(arch.value)}
        key={arch.value}
        height={this.props.height}
        width={this.props.width} />
    )
  }

  render () {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <g>
          {this.state.arches.map(this.makeArch)}
        </g>
      </svg>
    )
  }
}
PieApp.propTypes = {
  arches: PropTypes.array,
  colorRange: PropTypes.array,
  data: PropTypes.array,
  height: PropTypes.number,
  innerRadius: PropTypes.number,
  margin: PropTypes.number,
  value: PropTypes.func,
  width: PropTypes.number
}
PieApp.defaultProps = {
  arches: [],
  innerRadius: 0,
  margin: 40,
  height: 500,
  width: 500,
  colorRange: ['#FF0000', '#00FF00', '##0000FF']
}
