/**
 * Class for creating a histogram bar. Automatically required by HistogramApp.
 * @constructor HistogramBar
 * @param {function} xScale - X scaling. Used to make all the components the same scale
 * @param {function} yScale - Y scaling. Used to make all the components the same scale
 * @param {number} height - Height of the histogram area
 * @param {number} axisMargin - Specifies the pixels left for the axis
 * @param {array} bars - Array containing the bars needed to display
 */

import React, { Component, PropTypes } from 'react'

export class HistogramBar extends Component {
  constructor () {
    super()
    this.makeBar = this.makeBar.bind(this)
  }

  makeBar (bar) {
    let params = {
      width: this.props.xScale(bar.dx),
      height: this.props.yScale(bar.y),
      x: this.props.xScale(bar.x),
      y: this.props.height - this.props.axisMargin - this.props.yScale(bar.y),
      key: 'histogram-bar-' + bar.x + '-' + bar.y
    }

    let translate = 'translate(' + params.x + ',' + params.y + ')'

    return (
      <g className={'bar'} transform={translate} key={params.key}>
        <rect
          width={params.width}
          height={params.height-2}
          transform='translate(0, 1)'>
        </rect>
      </g>
    )
  }

  render () {
    return (
      <g>
        {this.props.bars.map(this.makeBar)}
      </g>
    )
  }
}
HistogramBar.propTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  height: PropTypes.number,
  axisMargin: PropTypes.number,
  bars: PropTypes.array
}
