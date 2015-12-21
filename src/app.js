import './styles/main.scss'

import React from 'react'
import { render } from 'react-dom'

import * as containers from './containers'

const {
  /*Borgere,*/
  Skatteliste
} = containers

render(
  <Skatteliste />,
  document.getElementById('app')
)
