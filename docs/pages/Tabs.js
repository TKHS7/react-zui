
import React from 'react'
import BasePage from './BasePage'
import {List, Tabs} from '../../build/packages'

export default class ExamplePage extends React.Component {
    render = () => {
        return <BasePage title="标签页">
            <Tabs activeIndex="0">
                <Tabs.TabPane name="项目管理">
                    <div style={{padding: '50px 0', textAlign: 'center'}}>
                        项目管理内容...
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane name="服务管理">
                    <div style={{padding: '50px 0', textAlign: 'center'}}>
                        服务管理内容...
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane name="需求管理">
                    <div style={{padding: '50px 0', textAlign: 'center'}}>
                        需求管理内容...
                    </div>
                </Tabs.TabPane>
            </Tabs>

            <List>
                <List.Header>
                    代码演示
                </List.Header>
                <List.PreItem>
                    {`
import React from 'react'
import {Tabs} from "react-zui"
export default class Example extends React.Component {
    render = () => {
        return <Tabs activeIndex="0">
            <Tabs.TabPane name="项目管理">
                <div style={{padding: '50px 0', textAlign: 'center'}}>
                    项目管理内容...
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane name="服务管理">
                <div style={{padding: '50px 0', textAlign: 'center'}}>
                    服务管理内容...
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane name="需求管理">
                <div style={{padding: '50px 0', textAlign: 'center'}}>
                    需求管理内容...
                </div>
            </Tabs.TabPane>
        </Tabs>
    }
}
                    `}
                </List.PreItem>
            </List>

            <List>
                <List.Header>
                    属性
                </List.Header>
                <List.Item extra="当前激活的tab index">
                    activeIndex
                </List.Item>
            </List>

            <List>
                <List.Header>
                    事件
                </List.Header>
                <List.Item extra="activeIndex改变时的回调事件">
                    onChange(activeIndex)
                </List.Item>
            </List>
        </BasePage>
    }
}