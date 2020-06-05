/**
 * @description: 
 * @param {getData(pageNo,cb)} cb 请求成功后的回调 参数为{results,pageCount}
 * @param pageCount 最大页码
 * @param results 要加载的数据
 * @param {separatorName} 间隔的模块类名
 * @param {children} 每一行的模块 通过data属性接收每一行的数据
 * @param {pageSize} 每页数量
 * @param {keywords} 搜索关键字
 * @return: 
 */

import React from 'react'
import {findDOMNode} from 'react-dom';
import css from './index.css'
import { PullToRefresh, ListView, Button } from 'antd-mobile';


class LazyLoading extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
    };
    this.rData=[]
    this.pageIndex = 1;

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      });
    }
    if(nextProps.keyWords !== this.props.keyWords){
      this.props.getData(this.pageIndex,({pageCount,results=[]})=>{
        this.rData = results.reverse();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          refreshing: false,
          isLoading: false,
        });
      })
    }
  }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidMount() {
    const hei = this.state.height - findDOMNode(this.lv).offsetTop;
    this.props.getData(this.pageIndex,({pageCount,results=[]})=>{
      this.rData = results.reverse();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    })
    
  }

  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    ++this.pageIndex;
    this.props.getData(this.pageIndex,({pageCount,results=[]})=>{
    if (this.pageIndex>pageCount){
      this.setState({ hasMore: false });
      return
    }else{
      this.setState({ isLoading: true });
      let arr = results.reverse()
        this.rData = [...this.rData, ...arr];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
        });
    }
    })
    
    
    
  };

  render() {
    const {separatorName,children,keyWords,pageSize=10} = this.props
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        className = {`${css.separator} ${css[separatorName]}`}
      />
    );
    let index = this.rData.length - 1;
    const row = (rowData, sectionID, rowID) => {
      const item = this.rData[index--];
      return  children && React.cloneElement(children, {data:item})
    };
    return (<div>
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center',fontSize:40 }}>
          {this.state.isLoading ? '加载中...' : !this.state.hasMore?'没有更多数据啦～':''}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        onEndReached={this.onEndReached}
        pageSize={pageSize}
      />
    </div>);
  }

}
export default LazyLoading
