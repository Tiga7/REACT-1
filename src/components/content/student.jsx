import React, { Component } from "react";
import BaseCord from "./baseCord";
import $ from "jquery";
import { Modal } from "antd";
import UserTable from "./userTable";

class Student extends Component {
	state = {
		current: 1,
		size: 20,
		user_info: "",
		tableData: { datas: [], totalCount: 0 },
		error_msg1: "",
		error_msg2: "",
		user: {},
		is_show: false,
		newPassword: "",
		newPhone: "",
	};
	handleDelete = (deleteOne) => {
		//filter  里面传入一个值 如果时候true 就保留 如果是false 就删除  x是filter取出的每一个元素
		const gets = this.state.gets;
		gets.users = this.state.gets.users.filter((x) => x !== deleteOne);
		this.setState({});
	};
	pageChanged = (page) => {
		$.ajax({
			url: "http://localhost:8080/ptc/user/selectlimit",
			// data: JSON.stringify(this.state.pagination),
			data: {
				current: page,
				size: this.state.size,
			},
			type: "post",
			dataType: "json",
			traditional: true,
			success: (resp) => {
				console.log("succeed");
				this.setState({
					tableData: resp,
				});
			},
			error: (resp) => {
				console.log("failed");
				console.log(resp);
			},
		});
		this.setState({
			current: page,
		});
	};

	searchLimit = () => {
		$.ajax({
			url: "http://localhost:8080/ptc/user/selectlimit",
			data: {
				current: this.state.current,
				size: this.state.size,
			},
			type: "post",
			dataType: "json",
			traditional: true,
			success: (resp) => {
				console.log("succeed");
				this.setState({
					tableData: resp,
				});
			},
			error: (resp) => {
				console.log("failed2");
				console.log(resp);
			},
		});
	};

	searchUser = () => {
		if (this.state.user_info === "") {
			this.setState({
				error_msg1: "输入为空",
			});
		} else {
			this.setState({
				error_msg1: "",
			});
			$.ajax({
				url: "http://localhost:8080/ptc/user/searchByIdOrPhone",
				data: {
					user_info: this.state.user_info,
				},
				type: "post",
				dataType: "json",
				traditional: true,
				success: (resp) => {
					if (resp !== null) {
						const tableData = { datas: [resp], totalCount: 1 };
						console.log(tableData);

						this.setState({
							tableData,
						});
					} else {
						const tableData = { datas: [], totalCount: 0 };
						console.log(tableData);
						this.setState({
							tableData,
						});
					}
				},
				error: (resp) => {
					console.log("error " + resp);
				},
			});
		}
	};

	componentDidMount = () => {
		$.ajax({
			url: "http://localhost:8080/ptc/user/selectlimit",
			data: {
				current: this.state.current,
				size: this.state.size,
			},
			type: "post",
			dataType: "json",
			traditional: true,
			success: (resp) => {
				this.setState({
					tableData: resp,
				});
			},
			error: (resp) => {
				console.log(resp);
			},
		});
	};

	//点击编辑
	onEdit = (user) => {
		this.setState({
			is_show: true,
			edit_title: user.userId,
		});
	};

	editUser = (user) => {
		// console.log(user);
		this.setState({
			is_show: true,
			user: user,
			edit_title: user.userId,
		});
	};
	setPhone = (e) => {
		this.setState({
			newPhone: e,
		});
	};
	setPassword = (e) => {
		this.setState({
			newPassword: e,
		});
	};
	//删除用户
	deleteOne = (user) => {
		if (this.state.user.userId === "") {
			this.setState({
				error_msg1: "请选择要删除的用户",
			});
		} else {
			console.log(this.state.user);
			$.ajax({
				url: "http://localhost:8080/ptc/user/deleteById",
				// data: JSON.stringify(this.state.pagination),
				data: {
					userId: this.state.user.userId,
				},
				type: "post",
				dataType: "text",
				traditional: true,
				success: (resp) => {
					if (resp === "succeed") {
						const datas = this.state.tableData.datas.filter((user1) => user1 !== user);
						const tableData = {
							...datas,
							totalCount: this.state.tableData.totalCount,
						};
						this.setState({
							tableData,
						});
						// console.log("删除成功");
					}
				},
				error: (resp) => {
					// console.log("删除失败");
					// console.log(resp);
				},
			});
		}
		this.setState({
			is_show: false,
		});
	};
	//浮窗点确认
	handleOk = () => {
		if (this.state.newPhone === "" || this.state.newPassword === "") {
			this.setState({
				error_msg2: "新手机号或者新密码不能为空",
			});
		} else if (
			this.state.newPhone === this.state.user.phoneNumber &&
			this.state.newPassword === this.state.user.password
		) {
			this.setState({
				error_msg2: "新手机号或新密码不能全和原来一样",
			});
		} else {
			$.ajax({
				url: "http://localhost:8080/ptc/user/editOne",
				// data: JSON.stringify(this.state.pagination),
				data: {
					userId: this.state.user.userId,
					phoneNumber: this.state.newPhone,
					password: this.state.newPassword,
				},
				type: "post",
				dataType: "text",
				traditional: true,
				success: (resp) => {
					if (resp !== "succeed") {
						this.setState({
							error_msg2: "请检查手机号是否已存在",
						});
					} else {
						this.setState({
							is_show: false,
						});
						this.setState({
							newPassword: "",
							newPhone: "",
							error_msg2: "",
						});
						$("#userId").val("");
						$("#password").val("");
						this.componentDidMount();
					}
				},
				error: (resp) => {
					this.setState({
						error_msg2: "请检查输入是否正确",
					});
				},
			});
		}
	};

	render() {
		return (
			<React.Fragment>
				<BaseCord>
					<div className='input-group mb-3'>
						<input
							type='text'
							className='input'
							onChange={(e) => this.setState({ user_info: e.target.value })}
							placeholder='输入账号或者手机号'
						/>
						<button className='btn btn-outline-secondary' type='button' onClick={this.searchUser}>
							查询
						</button>
					</div>

					<UserTable
						tableData={this.state.tableData}
						current={this.state.current}
						pageChanged={this.pageChanged}
						editUser={(user) => this.editUser(user)}
					/>

					<Modal
						title={this.state.user.userId}
						id='myModal'
						visible={this.state.is_show}
						onOk={this.handleOk}
						onCancel={() => {
							this.setState({ is_show: false });
						}}>
						<form>
							<div className='mb-3'>
								<label htmlFor='userId' className='form-label'>
									原手机号 : {this.state.user.phoneNumber}
								</label>
								<input
									onChange={(e) => {
										this.setPhone(e.target.value);
									}}
									type='text'
									data-pure-clear-button
									className='form-control'
									id='userId'
									placeholder='新手机号'
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='password' className='form-label'>
									密码 : {this.state.user.password}
								</label>
								<input
									onChange={(e) => {
										this.setPassword(e.target.value);
									}}
									data-pure-clear-button
									type='text'
									className='form-control'
									id='password'
									placeholder='新密码'
								/>
							</div>
							<div style={{ height: "2rem", color: "red" }}>{this.state.error_msg2}</div>
							<button
								onClick={() => this.deleteOne(this.state.user)}
								type='submit'
								className='btn btn-primary'
								style={{ width: "100%" }}>
								删除用户
							</button>
						</form>
					</Modal>
				</BaseCord>
			</React.Fragment>
		);
	}
}

export default Student;
