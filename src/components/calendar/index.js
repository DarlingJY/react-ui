/**
 * date 最上展示月 默认为当前月
 * step 每次加载月份个数 默认6个
 * sort 正序还是倒序 '+' '-' 默认‘-’ 大日期在上
 * selectedValue:Array 选中的日期 ['2020-6-1']
 * minDate 最小月份
 * maxDate 最大月份
 */

import React, { Component } from 'react'
import Month from './month'
import css from './index.css'
import moment from 'moment'

const week = ['日', '一', '二', '三', '四', '五', '六']

const isSelectedDay = (selectedValue, day) => {
  return selectedValue.indexOf(day) > -1
}

const isFutureDay = (day) => {
  return moment(day) > moment()
}




export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.lastMonth = ''//最下面的月份
    this.count = 0
    this.state = {
      months: [],

    }
  }

  componentDidMount() {
    const {sort = '-', minDate,maxDate} = this.props
    this.setState({ months: [...(this.getData())] })
    let div = document.getElementById('container')
    let more = () => {
      if(sort === '-'&&minDate&&moment(this.lastMonth).format('YYYY-MM')<moment(minDate).format('YYYY-MM')){
        div.removeEventListener('scroll',more)
        return
      }
      if(sort === '+'&&maxDate&&moment(this.lastMonth).format('YYYY-MM')>moment(maxDate).format('YYYY-MM')){
        div.removeEventListener('scroll',more)
        return
      }
      if (div.scrollHeight - div.scrollTop - div.clientHeight < 100) {
        let arr = this.getData()
        let months = [...this.state.months, ...arr]
        this.setState({ months })
      }
    }
    div.addEventListener('scroll', more , false);

  }

  componentWillReceiveProps(next){
    const {sort='-', minDate,maxDate,selectedValue=[],step=6} = this.props
    this.lastMonth=''
    //只走初始化的
    if(!this.count&&(sort!=next.sort||minDate!=next.minDate||maxDate!=next.maxDate||selectedValue!=next.selectedValue||step!=next.step)){
      this.setState({ months: [...this.getData(next)] })
    }

    this.count++
  }

  //获取每次加载数据
  getData = (props) => {
    props = props?props:this.props
    let date = this.lastMonth ? this.lastMonth : props.date
    const arr = []
    const { step = 6, sort = '-', selectedValue,minDate,maxDate } = props
    for (let i = 0; i < step; i++) {
      let curDate = Month.getMonth(moment(date).format('YYYY-MM-DD'), sort === '-' ? -i : i)
      if(sort === '-'&&minDate&&moment(this.lastMonth).format('YYYY-MM')<moment(minDate).format('YYYY-MM')){
        return arr
      }
      if(sort === '+'&&maxDate&&moment(this.lastMonth).format('YYYY-MM')>moment(maxDate).format('YYYY-MM')){
        return arr
      }

      this.lastMonth = Month.getMonth(moment(curDate).format('YYYY-MM-DD'), sort === '-' ? -1 : 1)
      arr.push(<div className={css.month} key={curDate}>
        <h3>{moment(curDate).format('YYYY年M月')}</h3>
        <div className={css.clear}>
          <ul className={css.day}>
            {Month.calendar(curDate).map((item, index) => {
              let curDay = item ? moment(curDate).format('YYYY-M') + '-' + item : moment(curDate).format('YYYY-M') + week[index] //item为''时 key重复
              let isToday = curDay === moment().format('YYYY-M-D')
              return <li key={curDay}>
                <span
                  className={`${isToday ? css.today : ''} ${isSelectedDay(selectedValue, curDay) ? css.selectedDay : ''} ${isFutureDay(curDay) ? css.futureDay : ''}`}
                >
                  {isToday ? '今' : item}
                </span>
              </li>
            })}
          </ul>
        </div>
      </div>)
    }

    return arr
  }



  render() {
    return (
      <div className={css.calendar}>
        <div className={css.header}>
          <ul className={`${css.day} ${css.fixed}`}>
            {week.map(item => <li key={item}><span>{item}</span></li>)}
          </ul>
        </div>
        <div className={css.container} id='container'>
          {this.state.months}

        </div>


      </div>
    )
  }
}
