import React from 'react'
import { Scaffold} from 'kara-react-components-mobileweb'
import Calendar from '../../components/calendar'


class Home extends React.Component{
  // 回退到app
  backApp = () => {
    if (window.kara && typeof window.kara.closePage === 'function') {
      window.kara.closePage()
    }else{
      this.props.history.goBack();
    }
  }

    render(){
        return(
          <Scaffold
          onLeftclick={this.backApp}
          title={"签到日志"}
        >
          <Calendar selectedValue = {['2020-6-1', '2020-6-4']}/>
         
        </Scaffold>
     )
    }
}
export default Home
