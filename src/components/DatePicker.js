import './less/date-picker.less'
import React from 'react'
import Picker from './Picker'
import {getMonthDayCount} from '../util'

const YearData = []
for (let i = (new Date()).getFullYear(); i > 1970; i--) {
    YearData.push(i)
}

const MonthData = []
for (let i = 1; i <= 12; i++) {
    MonthData.push(i < 10 ? '0' + i : i)
}  

export default class DatePicker extends React.Component {

    static defaultProps = {
        status: '',
        prefix: 'zui',
        name: '选择日期',
        onChange: ()=> {
        }
    }

    state = {
        year: (new Date()).getFullYear()
    } 

    renderMonthDays = (month) => {
        const days = []
        const max = getMonthDayCount(this.state.year + '-' + month)
        for (let i = 1; i <= max; i++) {
            days.push(i)
        }

        return days.map((item, key)=> {
            item = item < 10 ? '0' + item : item
            const date = new Date(this.state.year + '-' + month + '-' + item)
            const valueDate = new Date(this.props.value)
            const active = date.getTime() == valueDate.getTime() ? 'active' : ''
            return <li className={this.props.prefix+'-date-picker-day-item '+active} key={key} onClick={()=>{ 
                this.props.onChange(this.state.year+'-'+month+'-'+item)
            }}>
                {item}
            </li>
        })
    }

    render = () => {
        const prefix = this.props.prefix
        const status = this.props.status
        return <Picker className={prefix+'-date-picker'} status={status}>
            <ul className={prefix+'-date-picker-year-list'}>
                {YearData.map((item, key)=> {
                    const cls = item == this.state.year ? 'active' : ''
                    return <li className={prefix+'-date-picker-year-item '+cls} key={key} onClick={()=>{
						this.setState({year: item})
					}}>{item}</li>
                })}
            </ul>
            <div className={prefix+'-date-picker-month-list'}>
                {MonthData.map((item, key)=> {
                    return <div className={prefix+'-date-picker-month-item'} key={key}>
                        <div className={prefix+'-date-picker-month-name'}>{item}月</div>
                        <ul className={prefix+'-date-picker-day-list'}>
                            {this.renderMonthDays(item)}
                        </ul>
                    </div>
                })}
            </div>
        </Picker>
    }
}