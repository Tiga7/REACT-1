import { Pagination } from 'antd';
import React, { Component } from 'react';
class UserTable extends Component {
    state = { 
        data_type:'',
    }
    
    editUser=(user)=>{
        this.props.editUser(user);
    }
    pageChanged=(page)=>{
        this.props.pageChanged(page)
    }
    render() {
        if(this.props.tableData.datas.length===0){ 
            return (
                <React.Fragment>
                    <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">序号</th>
                            <th scope="col">姓名</th>
                            <th scope="col">账号(学号)</th>
                            <th scope="col">手机号</th>
                            <th scope="col">密码</th>
                            <th scope="col">性别</th>
                            <th scope="col">激活时间</th>
                            <th scope="col">编辑</th>
                        </tr>
                    </thead>
                    </table>
                    <div className="alert alert-dark" role="alert">
                        暂无数据
                    </div> 
                </React.Fragment>
            );
        }else{
            return (
            <React.Fragment>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">序号</th>
                            <th scope="col">姓名</th>
                            <th scope="col">账号(学号)</th>
                            <th scope="col">手机号</th>
                            <th scope="col">密码</th>
                            <th scope="col">性别</th>
                            <th scope="col">激活时间</th>
                            <th scope="col">编辑</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tableData.datas.map((user,index) =>(
                        // 每一行都要有一个唯一的key
                        <tr key={user.userId}>
                            <td>{index+1}</td>
                            <td>{user.username}</td>
                            <td>{user.userId}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.password}</td>
                            <td>{user.gender}</td>
                            <td>{user.activateTime}</td>
                            <td>
                            <button onClick={()=>{this.editUser(user)}} className="btn btn-info" >编辑用户</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="row justify-content-md-center">
                    <div className="col col-sm-5">
                        <Pagination simple 
                        onChange={this.pageChanged} 
                        current={this.props.current} 
                        total={this.props.tableData.totalCount}
                        defaultPageSize={20}
                        />
                    </div>   
                </div>
            </React.Fragment>
        );
        }

        
        
    }
}
 
export default UserTable;