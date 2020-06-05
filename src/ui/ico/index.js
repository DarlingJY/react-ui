import React from 'react'
import css from './iconfont/iconfont.css'

export default class Ico extends  React.Component{
  render(){
    const {className='', style={}, type, onClick=()=>{}} = this.props
    return(<i className={`${css.iconfont} ${css[type]} ${className}`} style={style} onClick={onClick} /> )
  }
}