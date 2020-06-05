import React from 'react'

export default class Status extends React.Component {

  render() {
    const { className={},type,typeName='',style } = this.props
    const defaultStyle = { 
      display:'inline-block',
      margin: 0 ,
      padding:'15px 30px',
      borderRadius: 6,
    }
    return <span className={className} style={{ display: 'inline-block',...style }}>
      {(() => {
        switch (type) {
          case '10': return <span style={{...defaultStyle,background:'#fff3e9',color: '#ff8928'}}>{typeName}</span>; break;
          case '20': return <span style={{...defaultStyle,background:'#e8f4fe',color: '#2196f3'}}>{typeName}</span>; break;
          case '30': return <span style={{...defaultStyle,background:'#f2f2f2',color: '#999'}}>{typeName}</span>; break;
          default: return null;
        }
      })()}
    </span>
  }
}
