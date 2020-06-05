import React from 'react'
import css from './index.css'

export default class Btn extends React.Component {

  render() {
    const {type = '',dataType='',text=''} = this.props

      return <label className={`${css[`${dataType}${type}`]} ${css[`label`]}`}>{text}</label>
  }
}
