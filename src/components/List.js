'use strict'

import './less/list.less'
import React from 'react'
import Icon from './Icon'
import Radio from './Radio'
import Rater from './Rater'
import Picker from './Picker'
import Button from './Button'
import Switch from './Switch'
import TagPicker from './TagPicker'
import CityPicker from './CityPicker'
import DatePicker from './DatePicker'
import MonthPicker from './MonthPicker'

class Header extends React.Component {
    static defaultProps = {
        className: '',
        prefix: 'zui-list'
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-header "+this.props.className} onClick={this.props.onClick}>
            <div className={prefix+"-content"}>
                {this.props.children}
            </div>
            <div className={prefix+"-extra"}>
                {this.props.extra}
                <Icon type={this.props.arrow}/>
            </div>
        </div>
    }
}

class Footer extends React.Component {
    static defaultProps = {
        className: '',
        prefix: 'zui-list'
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-footer "+this.props.className} onClick={this.props.onClick}>
            <div className={prefix+"-content"}>
                {this.props.children}
            </div>
            <div className={prefix+"-extra"}>
                {this.props.extra}
                <Icon type={this.props.arrow}/>
            </div>
        </div>
    }
}

class ListItem extends React.Component {
    static defaultProps = {
        href: '',
        style: {},
        arrow: '',
        className: '',
        onClick: null,
        prefix: 'zui-list'
    }

    render = () => {
        const prefix = this.props.prefix
        const checkCls = this.props.arrow === 'check' ? 'active ' : ' '
        return <div className={prefix+"-item "+checkCls+this.props.className} style={this.props.style} onClick={()=>{
            if(this.props.href){
                location.assign(this.props.href)
                return false
            }
            this.props.onClick && this.props.onClick()
        }}>
            <div className={prefix+"-content"}>
                {this.props.children}
            </div>
            <div className={prefix+"-extra"}>
                {this.props.extra}
                <Icon type={this.props.arrow}/>
            </div>
        </div>
    }
}

class PreItem extends React.Component {
    static defaultProps = {
        prefix: 'zui-list'
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+"-pre-item"}>
            <pre className={prefix+'-content'}>
                {this.props.children}
            </pre>
        </div>
    }
}

class SwitchItem extends React.Component {
    static defaultProps = {
        value: 1,
        onClick: null,
        onChange: null,
        prefix: 'zui-list',
    }

    state = {
        value: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+'-switch-item'}>
            <div className={prefix+"-content"}>
                {this.props.children}
            </div>
            <div className={prefix+"-extra"}>
                <Switch value={this.state.value} onChange={(value)=>{
                    this.props.onChange && this.props.onChange(value)
                }}/>
            </div>
        </div>
    }
}

class FileItem extends React.Component {
    static defaultProps = {
        value: '',
        prefix: 'zui-list',
    }

    state = {
        value: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+"-file-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <div>
                    <input type="file" onChange={(e)=>{
                        if (e.target.files[0].size > (8 * 1024 * 1024)) {
                            alert('最大支持上传8MB大小的文件')
                            return false
                        }
                        this.props.onChange(e.target.files[0])
                    }}/>
                    {this.state.value? <img src={this.state.value}/> : <span>请选择</span>}
                    <Icon type="horizontal"/>
                </div>
            </div>
        </div>
    }
}

class InputItem extends React.Component {
    static defaultProps = {
        value: '',
        type: 'text',
        prefix: 'zui-list',
        placeholder: '请输入',
        onChange: () => {},
        onClick: () => {}, 
        onBlur: () => {},
    }

    state = {
        value: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item " +prefix+"-input-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <input type={this.props.type} value={this.state.value} onChange={(e)=>{
                    this.setState({value: e.target.value})
                    this.props.onChange(e.target.value)
                }} onClick={this.props.onClick} onBlur={e => {
                    this.props.onBlur(e.target.value)
                }} placeholder={this.props.placeholder}/>
            </div>
        </div>
    }
}

class CodeInputItem extends React.Component {
    static defaultProps = {
        value: '',
        mobile: '',
        type: 'text',
        prefix: 'zui-list',
        placeholder: '请输入验证码',
        onChange: () => {
        },
        onButtonClick: () => {
        }
    }

    state = {
        value: '',
        countdown: 30
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    onButtonClick = ()=> {
        if (this.renderButtonCls() != 'active') {
            return false
        }
        window.codeBtnInterval = window.setInterval(()=> {
            this.setState({
                countdown: this.state.countdown === 0 ? 30 : (this.state.countdown - 1)
            })
            if (this.state.countdown === 30) {
                window.clearInterval(window.codeBtnInterval)
                delete window.codeBtnInterval
            }
        }, 1000)
        this.props.onButtonClick()
    }

    renderButtonCls = () => {
        const mobile = this.props.mobile
        return this.state.countdown === 30 && mobile && /^1[34578]\d{9}$/.test(mobile) ? 'active' : ''
    }

    render = () => {
        const prefix = this.props.prefix
        const buttonCls = this.renderButtonCls()
        return <div className={prefix+"-item " +prefix+"-code-input-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <input type={this.props.type} value={this.state.value} onChange={(e)=>{
                    this.props.onChange(e.target.value)
                    this.setState({value: e.target.value})
                }} placeholder={this.props.placeholder}/>
                <Button className={prefix+"-code-button "+buttonCls} onClick={this.onButtonClick}>
                    {this.state.countdown === 30 ? '获取验证码' : (this.state.countdown + 's')}
                </Button>
            </div>
        </div>
    }
}

class TextAreaItem extends React.Component {
    static defaultProps = {
        rows: 5,
        value: '',
        count: 1000,
        prefix: 'zui-list',
        textAlign: 'left',
        placeholder: '请输入',
        onChange: () => {
        },
    }

    state = {
        value: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item " +prefix+"-textarea-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <textarea rows={this.props.rows} value={this.state.value} onChange={(e)=>{  
                    const value = e.target.value.substr(0, this.props.count)
                    localStorage.setItem(this.props.prefix+'-textarea-item-value', value)
                    this.setState({value: value})
                    this.props.onChange(value)
                }} style={{
                    textAlign: this.props.textAlign
                }} placeholder={this.props.placeholder}/>
                <p className={prefix+'-textarea-counter'}>
                    {this.state.value.length} / {this.props.count}
                </p>
            </div>
        </div>
    }
}

class SelectItem extends React.Component {
    static defaultProps = {
        data: [],
        prefix: 'zui-list'
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item " +prefix+"-select-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <select onChange={()=>{
                    this.props.onChange
                }}>
                    {this.props.data.map((item, key)=> {
                        return <option value={item} key={key}>{item}</option>
                    })}
                </select>
                <span> ~ </span>
                <select onChange={()=>{
                    this.props.onChange
                }}>
                    {this.props.data.map((item, key)=> {
                        return <option value={item} key={key}>{item}</option>
                    })}
                </select>
            </div>
        </div>
    }
}

class DoubleSelectItem extends React.Component {
    static defaultProps = {
        data: [],
        prefix: 'zui-list',
        onMaxChange: ()=> {

        },
        onMinChange: () => {

        }
    }

    state = {
        value: ''
    }

    componentWillReceiveProps = nextProps => {
        this.setState({value: nextProps.value})
    }

    render = () => {
        const prefix = this.props.prefix
        const minValue = (this.state.value || '~').split('~')[0]
        const maxValue = (this.state.value || '~').split('~')[1]
        return <div className={prefix+"-item " +prefix+"-double-select-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <Icon type="right"/>
                <select className="max-select" value={maxValue} onChange={(e)=>{
                    this.props.onMaxChange(e.target.value)

                    const value = this.state.value||'~'
                    this.props.onChange(value.split('~')[0]+'~'+e.target.value)
                }}>
                    <option value=''>请选择</option>
                    {this.props.maxData.map((item, key)=> {
                        return <option value={item} key={key}>{item}</option>
                    })}
                </select>
                <span> ~ </span>
                <select className="min-select" value={minValue} onChange={(e)=>{
                    this.props.onMinChange(e.target.value)

                    const value = this.state.value||'~'
                    this.props.onChange(e.target.value+'~'+value.split('~')[1])
                }}>
                    <option value=''>请选择</option>
                    {this.props.minData.map((item, key)=> {
                        return <option value={item} key={key}>{item}</option>
                    })}
                </select>
            </div>
        </div>
    }
}

class PickerItem extends React.Component {
    static defaultProps = {
        data: [],
        name: '请选择',
        value: '',
        prefix: 'zui-list',
        onChange: () => {}
    }

    state = {
        value: '',
        status: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+"-picker-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <div onClick={()=>{
                    this.setState({status: 'open'})
                }}>
                    {this.state.value || '请选择'}
                    <Icon type="horizontal"/>
                </div>
            </div>
            <Picker name={this.props.name}
                    data={this.props.data}
                    value={this.state.value}
                    status={this.state.status}
                    onBackClick={()=>{
                        this.setState({status: 'close'})
                    }}
                    onChange={(value)=>{
                        this.props.onChange(value)
                        this.setState({value: value})
                    }}/>
        </div>
    }
}

class RadioItem extends React.Component {
    static defaultProps = {
        data: [],
        value: '',
        prefix: 'zui-list',
        onChange: () => {}
    }

    state = {
        value: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value||this.props.data[0]
        })
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+"-radio-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <Radio data={this.props.data} value={this.state.value} onChange={(value)=>{
                    this.setState({value: value})
                    this.props.onChange(value)
                }}/>
            </div>
        </div>
    }
}

class CityPickerItem extends React.Component {
    static defaultProps = {
        value: '请选择',
        name: '选择城市',
        prefix: 'zui-list',
        onChange: () => {}
    }

    state = {
        status: '',
        value: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+"-picker-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <div onClick={()=>{
                    this.setState({status: 'open'})
                }}>
                    {this.state.value || '请选择'}
                    <Icon type="horizontal"/>
                </div>
            </div>
            <CityPicker name={this.props.name}
                        value={this.state.value}
                        status={this.state.status}
                        onChange={(value)=>{
                            this.setState({value: value})
                            this.props.onChange(value)
                        }}
                        onBackClick={()=>{
                            this.setState({status: 'close'})
                        }}/>
        </div>
    }
}

class TagPickerItem extends React.Component {
    static defaultProps = {
        value: '',
        name: '选择标签',
        prefix: 'zui-list',
    }

    state = {
        value: '', 
        status: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    onPickerBackClick = () => {
        this.setState({
            status: 'close'
        })
    }

    renderTags = () => {
        let value = {}
        try {
            value = JSON.parse(this.state.value)
        } catch (e) {
            value = {}
        }

        let items = []
        for (let i in value) {
            items = items.concat(value[i])
        }

        return items.length > 0 ? items.map((item, key)=> {
            return <span key={key}>{item}</span>
        }) : '请选择'
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+"-tag-picker-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <div onClick={()=>{
                    this.setState({status: 'open'})
                }}>
                    {this.renderTags()}
                    <Icon type="horizontal"/>
                </div>
            </div>
            <TagPicker name={this.props.name}
                       data={this.props.data}
                       value={this.state.value}
                       status={this.state.status}
                       onChange={this.props.onChange}
                       onBackClick={this.onPickerBackClick}/>
        </div>
    }
}

class MonthPickerItem extends React.Component {
    static defaultProps = {
        value: '',
        name: '选择日期',
        prefix: 'zui-list',
        onChange: () => {}
    }

    state = {
        status: '',
        value: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+"-tag-picker-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"}>
                <div onClick={()=>{
                    this.setState({status: 'open'})
                }}>
                    {this.state.value || '请选择'}
                    <Icon type="horizontal"/>
                </div>
            </div>
            <MonthPicker value={this.state.value} status={this.state.status}
                         onChange={(value)=>{
                            this.setState({value: value})
                            this.props.onChange(value)
                         }} onBackClick={()=>{
                            this.setState({status: 'close'})
                         }}/>
        </div>
    }
}

class DatePickerItem extends React.Component {
    static defaultProps = {
        value: '',
        name: '选择日期',
        prefix: 'zui-list',
    }

    state = {
        datePickerVisible: false
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+"-date-picker-item"}>
            <div className={prefix+"-label"}>
                {this.props.children}
            </div>
            <div className={prefix+"-control"} onClick={()=>{
                this.setState({datePickerVisible: true})
            }}>
                <div>
                    {this.state.value || '请选择'}
                    <Icon type="horizontal"/>
                </div>
            </div>
            <DatePickerItem visible={this.state.datePickerVisible} onBackClick={()=>{
                this.setState({datePickerVisible: false})
            }} value={this.state.value} onChange={(val)=>{
                this.setState({datePickerVisible: false})
                this.props.onChange(val)
            }}/>
        </div>
    }
}

class RaterItem extends React.Component {

    static defaultProps = {
        value: '',
        prefix: 'zui-list',
        onChange: () => {}
    }

    state = {
        value: ''
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.value
        })
    }

    render = () => {
        const prefix = this.props.prefix
        return <div className={prefix+"-item "+prefix+"-rater-item"}>
            <div className={prefix+"-content"}>
                {this.props.children}
            </div>
            <div className={prefix+"-extra"}>
                <Rater value={this.state.value} onChange={(value)=>{
                    this.setState({value: value})
                    this.props.onChange(value)
                }}/>
            </div>
        </div>
    }
}

class List extends React.Component {
    static defaultProps = {
        style: {},
        className: '',
        prefix: 'zui',
    }

    render = () => {
        return <div className={this.props.prefix+"-list "+this.props.className} style={this.props.style}>
            {this.props.children}
        </div>
    }
}

List.Header = Header
List.Footer = Footer
List.Item = ListItem
List.PreItem = PreItem
List.FileItem = FileItem
List.InputItem = InputItem
List.CodeInputItem = CodeInputItem
List.TextareaItem = List.TextAreaItem = TextAreaItem
List.SelectItem = SelectItem
List.DoubleSelectItem = DoubleSelectItem
List.RaterItem = RaterItem
List.RadioItem = RadioItem
List.SwitchItem = SwitchItem
List.PickerItem = PickerItem
List.TagPickerItem = TagPickerItem
List.CityPickerItem = CityPickerItem
List.DatePickerItem = DatePickerItem
List.MonthPickerItem = MonthPickerItem
export default List