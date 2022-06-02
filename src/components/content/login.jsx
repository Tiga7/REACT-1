import React, { Component } from "react";
import BaseCord from "./baseCord";
import $ from "jquery";
import { Radio } from "antd";
class Login extends Component {
	state = {
		user_type: "",
		error_msg: "",
		userId: "",
		username: "",
		password: "",
	};
	onChange = (e) => {
		this.setState({
			user_type: e.target.value,
		});
	};

	handleLogin = (e) => {
		e.preventDefault();
		if (this.state.userId === "") {
			this.setState({ error_msg: "用户名不能为空" });
		} else if (this.state.password === "") {
			this.setState({ error_msg: "密码不能为空" });
		} else if (this.state.user_type === "") {
			this.setState({ error_msg: "请选择您的身份" });
		} else if (this.state.user_type === "student") {
			$.ajax({
				url: "http://localhost:8080/ptc/user/login",
				data: {
					userId: this.state.userId,
					password: this.state.password,
				},
				type: "post",
				dataType: "json",
				//跨域请求时 session会改变就用这个
				// xhrFields: {
				//     withCredentials: true
				// },
				traditional: true,
				success: (resp) => {
					if (resp.result === "succeed") {
						this.setState({
							error_msg: "登录成功",
						});
						// console.log("存储数据");

						localStorage.setItem("userinfo", JSON.stringify(resp.data));
						localStorage.setItem("charactor", "student");
						window.location.href = "/home";
					} else {
						this.setState({
							error_msg: resp.message,
						});
					}
				},
				error: (resp) => {
					this.setState({
						error_msg: "网络出问题",
					});
				},
			});
		} else if (this.state.user_type === "admin") {
			$.ajax({
				url: "http://localhost:8080/ptc/admin/login",
				data: {
					userId: this.state.userId,
					password: this.state.password,
				},
				type: "post",
				dataType: "json",
				//跨域请求时 session会改变就用这个
				// xhrFields: {
				//     withCredentials: true
				// },
				traditional: true,
				success: (resp) => {
					console.log(resp);
					if (resp.code === 0) {
						this.setState({
							error_msg: resp.msg,
						});
					} else {
						localStorage.setItem("userinfo", JSON.stringify(resp.data));
						localStorage.setItem("charactor", "admin");
						window.location.href = "/home";
					}
				},
				error: (resp) => {
					this.setState({ error_msg: "网络出现错误" });
				},
			});
		}
	};

	render() {
		return (
			<React.Fragment>
				<BaseCord>
					<div className='container'>
						<div className='row justify-content-md-center'>
							<div className='col col-sm-3'>
								<Radio.Group onChange={this.onChange}>
									<Radio value={"student"}>学生</Radio>
									<Radio value={"admin"}>管理员</Radio>
								</Radio.Group>
								<form>
									<div className='mb-3'>
										<label htmlFor='userId' className='form-label'>
											账号(学号):
										</label>
										<input
											onChange={(e) => this.setState({ userId: e.target.value })}
											type='text'
											className='form-control'
											id='userId'
											placeholder='账号(学号)'
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='password' className='form-label'>
											密码:
										</label>
										<input
											onChange={(e) => this.setState({ password: e.target.value })}
											type='password'
											className='form-control'
											id='password'
											placeholder='密码'
										/>
									</div>

									<div style={{ height: "2rem", color: "red" }}>{this.state.error_msg}</div>

									<button
										onClick={this.handleLogin}
										type='submit'
										className='btn btn-primary'
										style={{ width: "100%" }}>
										登录
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className='container'></div>
				</BaseCord>
			</React.Fragment>
		);
	}
}

export default Login;
