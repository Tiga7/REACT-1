import React, { Component } from 'react';
import BaseCord from './baseCord';
import $ from 'jquery';
import { Pagination,Button } from 'antd';

class Student extends Component {
    state = { 
        current:1,
        size:20,
        tableData:{datas:[],totalCount:0},
    } 
    handleDelete=(deleteOne)=>{
        //filter  里面传入一个值 如果时候true 就保留 如果是false 就删除  x是filter取出的每一个元素
        const gets=this.state.gets
        gets.users=this.state.gets.users.filter(x=> x !==deleteOne)
        this.setState({
            gets
        })
    }
    onChange = page => {
        $.ajax({
            url: 'http://localhost:8080/ptc/user/selectlimit',
            // data: JSON.stringify(this.state.pagination),
            data:{
                current:page,
                size:this.state.size,
            },
            type:'post',
            dataType: 'json',
            traditional:true,
            success: resp=>{
                console.log('succeed')
                this.setState({
                    tableData:resp,
                })
            },
            error:resp=>{
                console.log('failed')
                console.log(resp);
            }
        })
        this.setState({
          current: page,
        });
    };
    handleAdd=(addOne)=>{
        const solutions =[...this.state.solutions,
            {key:13,name:'ganGan',age:23,views:'ovo'}
        ];
        this.setState({
            solutions
        })
    }
    searchLimit=()=>{
        $.ajax({
            url: 'http://localhost:8080/ptc/user/selectlimit',
            data:{
                current:this.state.current,
                size:this.state.size,
            },
            type:'post',
            dataType: 'json',
            traditional:true,
            success: resp=>{
                console.log('succeed')
                this.setState({
                    tableData:resp,
                })
            },
            error:resp=>{
                console.log('failed')
                console.log(resp);
            }
        })
    }
    componentDidMount=()=>{
        $.ajax({
            url: 'http://localhost:8080/ptc/user/selectlimit',
            data:{
                current:this.state.current,
                size:this.state.size,
            },
            type:'post',
            dataType: 'json',
            traditional:true,
            success: resp=>{
                this.setState({
                    tableData:resp,
                })
            },
            error:resp=>{
                console.log(resp);
            }
        })
    }
    render() { 

        if(this.state.tableData.datas.length===0)
        {
            return(
                <BaseCord>
                    <React.Fragment>
                <button className="btn btn-primary" onClick={this.searchLimit}>searchLimit</button>
                <table className="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th scope="col">序号</th>   
                        <th scope="col">username</th>
                        <th scope="col">userId</th>
                        <th scope="col">phoneNumber</th>
                        <th scope="col">password</th>
                        <th scope="col">gender</th>
                        <th scope="col">activateTime</th>
                        <th scope="col">操作1</th>
                    </tr>
                </thead>
                </table>
                
                <h1>没有数据了</h1>
                    </React.Fragment>
                </BaseCord>                
            )
        }
        return (  

            <React.Fragment>
                <button className="btn btn-primary" onClick={this.searchLimit}>searchLimit</button>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">序号</th>
                        <th scope="col">username</th>
                        <th scope="col">userId</th>
                        <th scope="col">phoneNumber</th>
                        <th scope="col">password</th>
                        <th scope="col">gender</th>
                        <th scope="col">activateTime</th>
                        <th scope="col">操作1</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.datas.map((user,index) =>(
                    // 每一行都要有一个唯一的key
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.username}</td>
                        <td>{user.userId}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.password}</td>
                        <td>{user.gender}</td>
                        <td>{user.activateTime}</td>
                        <td>
                            
                            <Button  type='link' onClick={()=>this.handleAdd(user)}>增加</Button>
       
                            <Button danger type='text' onClick={()=>this.handleDelete(user)}>删除</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <div className="row justify-content-md-center">
                    <div className="col col-sm-5">
                        <Pagination simple 
                        onChange={this.onChange} 
                        current={this.state.current} 
                        total={this.state.tableData.totalCount}
                        defaultPageSize={this.state.size}
                        />
                    </div>   
                </div>

            </React.Fragment>
        );
    }

}
 
export default Student;