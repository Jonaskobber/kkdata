/**
 * Class for creating a histogram. Pass parameters as React props. This class will automatically include HistogramBar and pass required props.<br><br>
 * If you wish to include an Axis, this must be done manually. Set the returnInfo prop as a function with three parameters and you will get the x/y scaling and the bars back.
 * You can then pass these props together with the rest required to create an axis.
 * @constructor HistogramApp
 * @param {number} height - Height of the histogram area
 * @param {number} width - Width of the histogram area
 * @param {number} axisMargin - Specifies the pixels left for the axis
 * @param {number} leftMargin - Specifies the margin from the left of the SVG area
 * @param {number} topMargin - Specifies the margin from the top of the SVG area
 * @param {number} bins - The number of bins in the histogram
 * @param {array} data - An array of the data over which to create the histogram
 * @param {function} returnInfo - Function which, if set, returns the x/y scaling and the bars for use in an axis or similar
 * @param {function} value - A function to determine the value used to create the histogram. (d) => { return d.SORTVAR }
*/

import React, { Component, PropTypes } from 'react'
import d3 from 'd3'

import { HistogramBar } from './histogram_bar'

export class HistogramApp extends Component {
  constructor () {
    super()
    this.updateHistogram = this.updateHistogram.bind(this)
  }

  componentWillMount () {
    this.histogram = d3.layout.histogram()
    this.xScale = d3.scale.linear()
    this.yScale = d3.scale.linear()

    this.updateHistogram(this.props)
  }

  componentWillReceiveProps (newProps) {
    this.updateHistogram(newProps)
  }

  updateHistogram (props) {
    console.log(props)
    this.histogram
      .bins(props.bins)
      .value(props.value)

    let bars = this.histogram(props.data)
    let counts = bars.map((d) => { return d.y })
    console.log(bars)
    this.xScale
      .domain([0, d3.max(bars.map((d) => { return d.x + d.dx }))])
      .range([0, props.width])

    this.yScale
      .domain([d3.min(counts), d3.max(counts)])
      .range([9, props.height - props.axisMargin])

    if(this.props.returnInfo)
      this.props.returnInfo(this.xScale, this.yScale, bars)

    this.setState({
      bars
    })
  }

  render () {
    if(!this.props.data.length)
      return (
        <h1>Data loades</h1>
      )

    if(!this.state.bars.length) {
      return (
        <h1>Gør data klar</h1>
      )
    }

    return (
      <g className='histogram' transform={'translate(' + this.props.topMargin + ',' + this.props.leftMargin + ')'}>
        <HistogramBar
          xScale={this.xScale}
          yScale={this.yScale}
          bars={this.state.bars}
          height={this.props.height}
          width={this.props.width}
          axisMargin={this.props.axisMargin} />
      </g>
    )
  }
}
HistogramApp.propTypes = {
  axisMargin: PropTypes.number,
  bins: PropTypes.number,
  data: PropTypes.array,
  height: PropTypes.number,
  leftMargin: PropTypes.number,
  returnInfo: PropTypes.func,
  topMargin: PropTypes.number,
  value: PropTypes.func,
  width: PropTypes.number,
}
