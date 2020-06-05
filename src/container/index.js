import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from './home'
import styles from '../assets/css/restyle.css'

class RootContainer extends React.Component {
    render() {
        return (
        <div
            className={navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? styles.rootContainerIos : styles.rootContainer}>
            <div className={styles.relative}>
                <Switch>
                    <Route exact path="/" component={(props)=><Home {...props}/>}/>
                </Switch>
            </div>
        </div>
        )
    }
}
export default RootContainer
