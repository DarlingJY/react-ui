import React from 'react'
import {render} from 'react-dom'
import {Router} from "react-router-dom";
import RootContainer from './container/index'
import 'kara-react-components-mobileweb/lib/index.css'
import 'kara-reactutil-mobileweb/lib/index.css'

const createHistory = require("history").createBrowserHistory
const history = createHistory({
    basename: 'mobileapps/kara-order-car-mobileweb'
}) 
function bootstrap() {
    const html = document.documentElement
    const docEl = document.documentElement
    const metaEl = document.querySelector('meta[name="viewport"]')
    const dpr = window.devicePixelRatio || 1
    const scale = 1 / dpr
    // window.sessionStorage.setItem('token', 'bearer PGG5DwkwSiekdXoci2kGMyY9n6WATSjx');
    // 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', `width=${dpr * docEl.clientWidth},initial-scale=${scale},maximum-scale=${scale}, minimum-scale=${scale},user-scalable=no`)

    // 注意这个字体设置对应的是设计图1080，pxtorem初始rootValue值16
    html.style.fontSize = `${(html.clientWidth / 1080) * 16}px`
    render(<Router history={history}>
                <RootContainer />
            </Router>,
        document.getElementById('root'),)
}


bootstrap()