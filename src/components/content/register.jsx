import { Button } from 'antd';
import React, { Component } from 'react';
import BaseCord from './baseCord';
import $ from 'jquery'
import { Form, Input,Row, Col,Radio  } from 'antd';

class Register extends Component {
    state = {
        gender:'',
        checkCode:'',
        error_msg:''
    } 
    user=()=>{
        $.ajax({
            url: 'http://localhost:8080/ptc/user/checkCode',     
            type:'get',
            dataType: 'json',
            // traditional:true,
            xhrFields: {
                withCredentials: true
            },
            success: resp=>{
                console.log('succeed')
                console.log(resp)
            },
            error:resp=>{
                console.log('failed')
                console.log(resp);
            }
        })
    }

    onFinish = (values) => {
            this.setState({error_msg:''})
            $.ajax({
                url: 'http://localhost:8080/ptc/user/register',     
                type:'post',
                dataType: 'json',
                data:{
                        userId: values.userId,
                        username:values.username,
                        phoneNumber: values.phoneNumber,
                        password: values.password,
                        gender:this.state.gender,
                        checkCode:values.checkCode
                },
                traditional:true,
                //解决跨域中session改变的设置
                // xhrFields: {
                //     withCredentials: true
                // },
                success: resp=>{
                    console.log('succeed')
                    console.log(resp)
                },
                error:resp=>{
                    console.log('failed')
                    console.log(resp);
                }
            })
    };
    onFinishFailed = (errorInfo) => {
        if(this.state.user.gender===''){
            this.setState({
            error_msg:'还有信息未填'
            })
        }
        console.log('Failed:', this.state.error_msg);
    };
    onChange = (e) => {
        this.setState({
            gender:e.target.value
        })
    };
    render() { 
        return (
            <React.Fragment>
                <BaseCord>
                <Row>
                    <Col span={8}></Col>
                    <Col span={7}>
                        <Form
                            name="register"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            autoComplete="true"
                        >
                        <Form.Item
                            label="账号(学号)"
                            labelAlign='left'
                            name='userId'
                            rules={[{required: true,message: '请输入账号(学号)!' },
                            {type: 'string', max: 9,message: '最长不超过9' }]}
                        >
                        <Input placeholder="请输入账号(学号)"/>
                        </Form.Item>
                        <Form.Item
                            label="姓名"
                            labelAlign='left'
                            name="username"
                            rules={[{required: true,message: '请输入姓名!' },
                            {type: 'string', min:2,max: 4,
                            message: '名字格式不对' }]}
                        >
                            <Input placeholder="请输入姓名"/>
                        </Form.Item>
                        <Form.Item
                            label="手机号"
                            labelAlign='left'
                            name="phoneNumber"
                            rules={[{required: true,message: '请输入手机号!' },
                            {type: 'string',pattern:new RegExp(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/),
                            message: '请输入正确的手机号!' }]}
                        >
                            <Input placeholder="请输入手机号"/>
                        </Form.Item>
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={'男'}>男</Radio>
                            <Radio value={'女'}>女</Radio>
                        </Radio.Group>

                        <Form.Item
                            label="密码"
                            labelAlign='left'
                            name="password"
                            rules={[{required: true,message: '请输入密码!' },
                            {type: 'string', max: 12,message: '最长不超过12' }]}
                        >
                            <Input.Password placeholder="请输入密码"/>
                        </Form.Item>
                        {/* <img src="http://localhost:8080/ptc/user/checkCode" alt="验证码" /> */}
                        <Form.Item
                            label="验证码"
                            labelAlign='left'
                            name="checkCode"
                            placeholder="验证码"
                            rules={[{ required: true, message: '请输入验证码!'},
                            {type: 'string', pattern:new RegExp(/^\d{4,4}$/),message: '长度不为4'}
                        ]}
                        >
                            <Input placeholder="请输入验证码" />
                        </Form.Item>
                        <div style={{height:'2rem',color:'red'}}>
                            {this.state.error_msg}
                        </div>

                        <Form.Item wrapperCol={{ offset: 12 }}>
                            <Button type="primary" htmlType="submit">
                            激活
                            </Button>
                        </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                
                
                </BaseCord>
            </React.Fragment>
        );
    }
}

export default Register;