import React, { Component } from "react";
import BaseCord from "./baseCord";
import $ from "jquery";
class Room1 extends Component {
	state = {
		rooms: [],
		buildingName: "",
		roomName: "",
		error_msg1: "",
		error_msg2: "",
		seleted_room: "",
	};

	select_room = (room) => {
		this.setState({
			seleted_room: room,
		});
		console.log(room);
	};

	comfirm_add = () => {};

	comfirm_edit = () => {
		console.log(this.state.seleted_room);
	};
	comfirm_delete = () => {
		if (this.select_room !== null) {
			$.ajax({
				url: "http://localhost:8080/ptc/room/removeRoom",
				data: {
					roomName: this.state.seleted_room.roomName,
				},
				type: "post",
				dataType: "json",
				traditional: true,
				success: (resp) => {
					if (resp.code === 1) {
						this.setState({
							error_msg1: resp.msg,
						});
					} else {
						this.setState({
							error_msg1: resp.msg,
						});
					}
				},
				error: (resp) => {
					this.setState({
						error_msg1: "网络出错了",
					});
				},
			});
		}
	};

	handle_search_room = () => {
		if (this.state.roomName === null || this.state.roomName === "") {
			this.setState({
				error_msg1: "输入的教室号不能为空",
			});
		} else {
			$.ajax({
				url: "http://localhost:8080/ptc/room/getSingleRoomInfo",
				data: {
					roomName: this.state.roomName,
				},
				type: "post",
				dataType: "json",
				traditional: true,
				success: (resp) => {
					if (resp.code === 1) {
						this.setState({
							rooms: resp.data,
							error_msg1: "",
						});
					} else {
						this.setState({
							error_msg1: resp.msg,
						});
					}
				},
				error: (resp) => {
					this.setState({
						error_msg1: "网络出错了",
					});
				},
			});
		}
	};

	handle_search_building = () => {
		this.setState({
			error_msg2: "",
		});
		if (this.state.buildingName === null) {
			this.setState({
				error_msg2: "输入的楼栋名称不能为空",
			});
		} else {
			$.ajax({
				url: "http://localhost:8080/ptc/room/getRoomsInOneBuilding",
				data: {
					buildingName: this.state.buildingName,
				},
				type: "post",
				dataType: "json",
				traditional: true,
				success: (resp) => {
					if (resp.code === 1) {
						this.setState({
							rooms: resp.data,
						});
					} else {
						this.setState({
							error_msg2: resp.msg,
						});
					}
				},
				error: (resp) => {
					this.setState({
						error_msg2: "网络出错了",
					});
				},
			});
		}
	};
	render() {
		return (
			<React.Fragment>
				<BaseCord>
					<div className='container'>
						<div className='row'>
							<div className='col-1'></div>
							<div className='col-3'>
								<input
									type='text'
									className='form-control'
									placeholder='查询某个教室的信息'
									aria-label='buildingName'
									aria-describedby='button-addon1'
									onChange={(e) => this.setState({ roomName: e.target.value })}
								/>
							</div>
							<div className='col-1'>
								<button
									className='btn btn-outline-secondary'
									type='button'
									id='button-addon1'
									onClick={this.handle_search_room}>
									查询1
								</button>
							</div>
							<div className='col-2'></div>
							<div className='col-3'>
								<input
									type='text'
									className='form-control'
									placeholder='查询某栋楼的教室信息'
									aria-label='buildingName'
									aria-describedby='button-addon2'
									onChange={(e) => this.setState({ buildingName: e.target.value })}
								/>
							</div>
							<div className='col-1'>
								<button
									className='btn btn-outline-secondary'
									type='button'
									id='button-addon2'
									onClick={this.handle_search_building}>
									查询2
								</button>
							</div>
							<div className='col-1'></div>
						</div>

						<br />
						<div className='row'>
							<div className='col-1'></div>
							<div className='col-3'>{this.state.error_msg1}</div>
							<div className='col-3'></div>
							<div className='col-3'>{this.state.error_msg2}</div>
							<div className='col-1'></div>
						</div>
					</div>

					<React.Fragment>
						<table className='table table-bordered table-hover'>
							<thead>
								<tr>
									<th scope='col'>序号</th>
									<th scope='col'>楼栋号</th>
									<th scope='col'>教室号</th>
									<th scope='col'>容量</th>
									<th scope='col'>编辑</th>
								</tr>
							</thead>
							<tbody>
								{this.state.rooms.map((room, index) => (
									// 每一行都要有一个唯一的key
									<tr key={room.roomId}>
										<td>{index + 1}</td>
										<td>{room.buildingName}</td>
										<td>{room.roomName}</td>
										<td>{room.capacity}</td>
										<td>
											{/* <button
												type='button'
												className='btn btn-primary'
												data-bs-toggle='modal'
												onClick={() => this.select_room(room)}
												data-bs-target='#edit_modal'>
												编辑自习室
											</button> */}
											<button
												type='button'
												className='btn btn-primary'
												data-bs-toggle='modal'
												onClick={() => this.select_room(room)}
												data-bs-target='#delete_modal'>
												删除自习室
											</button>
											{/* <button
												type='button'
												className='btn btn-primary'
												data-bs-toggle='modal'
												onClick={() => this.select_room(room)}
												data-bs-target='#add_modal'>
												增加自习室
											</button> */}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='modal' id='add_modal'>
							<div className='modal-dialog'>
								<div className='modal-content'>
									<div className='modal-header'>
										<h4 className='modal-title'>修改教室信息</h4>
										<button type='button' className='btn-close' data-bs-dismiss='modal'></button>
									</div>
									<div className='modal-body'>是否确定删除该教室?</div>
									<div className='modal-footer'>
										<button
											type='button'
											onClick={this.comfirm_add}
											className='btn btn-danger'
											data-bs-dismiss='modal'>
											确定
										</button>
										<button type='button' className='btn btn-primary' data-bs-dismiss='modal'>
											取消
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className='modal' id='edit_modal'>
							<div className='modal-dialog'>
								<div className='modal-content'>
									<div className='modal-header'>
										<h4 className='modal-title'>修改教室信息</h4>
										<button type='button' className='btn-close' data-bs-dismiss='modal'></button>
									</div>
									<div className='modal-body'>是否确定删除该教室?</div>
									<div className='modal-footer'>
										<button
											type='button'
											onClick={this.comfirm_edit}
											className='btn btn-danger'
											data-bs-dismiss='modal'>
											确定
										</button>
										<button type='button' className='btn btn-primary' data-bs-dismiss='modal'>
											取消
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className='modal' id='delete_modal'>
							<div className='modal-dialog'>
								<div className='modal-content'>
									<div className='modal-header'>
										<h4 className='modal-title'>删除教室</h4>
										<button type='button' className='btn-close' data-bs-dismiss='modal'></button>
									</div>
									<div className='modal-body'>是否确定删除该教室?</div>
									<div className='modal-footer'>
										<button
											type='button'
											onClick={this.comfirm_delete}
											className='btn btn-danger'
											data-bs-dismiss='modal'>
											确定
										</button>
										<button type='button' className='btn btn-primary' data-bs-dismiss='modal'>
											取消
										</button>
									</div>
								</div>
							</div>
						</div>
					</React.Fragment>
				</BaseCord>
			</React.Fragment>
		);
	}
}

export default Room1;
