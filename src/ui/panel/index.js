
import React from 'react'
import Ico from '../ico'
import css from './index.css'

export default class Panel extends React.Component{

  render(){
    const {type='primary',iconName='',title='',style,onClick=()=>{}} = this.props
    return <div style={style} className={css['panel-bg']} onClick={onClick}>
    <span className={`${css[`panel-icon`]} ${css[`panel-icon-${type}`]}`} >
      <Ico type={iconName}/>
    </span>
    <p>{title}</p>
    
    </div>
  }
}
