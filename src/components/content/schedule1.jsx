import React, { Component } from "react";
import BaseCord from "./baseCord";
import $ from "jquery";

class Schedule1 extends Component {
	state = {
		schedules: [],
		roomName: "",
		buildingName: "",
		error_msg1: "",
		error_msg2: "",
	};

	get_schedule_byroomName = () => {
		if (this.state.roomName === "") {
			this.setState({
				error_msg1: "输入的房间号不能为空",
			});
		} else {
			console.log(this.state.roomName);
			$.ajax({
				url: "http://localhost:8080/ptc/schedule/getByRoomName",
				data: {
					roomName: this.state.roomName,
				},
				type: "post",
				dataType: "json",
				// traditional: true,
				success: (resp) => {
					console.log(resp);
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
	get_schedule_byBuildingName = () => {
		if (this.state.buildingName === "") {
			this.setState({
				error_msg2: "输入的楼栋号不能为空",
			});
		} else {
			$.ajax({
				url: "http://localhost:8080/ptc/schedule/getByBuildingName",
				data: {
					buildingName: this.state.buildingName,
				},
				type: "post",
				dataType: "json",
				// traditional: true,
				success: (resp) => {
					console.log(resp);
					if (resp.code === 1) {
						this.setState({
							schedules: resp.data,
							error_msg2: "",
						});
					} else {
						this.setState({
							error_msg2: resp.msg,
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
									placeholder='查询某个教室的课表'
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
									onClick={this.get_schedule_byroomName}>
									查询1
								</button>
							</div>
							<div className='col-2'></div>
							<div className='col-3'>
								<input
									type='text'
									className='form-control'
									placeholder='查询某栋楼的所有教室的课表'
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
									onClick={this.get_schedule_byBuildingName}>
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
					<table className='table table-bordered table-hover'>
						<thead>
							<tr>
								<th scope='col'>序号</th>
								<th scope='col'>楼栋号</th>
								<th scope='col'>教室号</th>
								<th scope='col'>容量</th>
								<th scope='col'>日期</th>
								<th scope='col'>第几节</th>
								<th scope='col'>课程名称</th>
								<th scope='col'>是否可用</th>
							</tr>
						</thead>
						<tbody>
							{this.state.schedules.map((schedule, index) => (
								// 每一行都要有一个唯一的key
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{schedule.buildingName}</td>
									<td>{schedule.roomName}</td>
									<td>{schedule.capacity}</td>
									<td>{schedule.myDate}</td>
									<td>{schedule.orderOfLesson}</td>
									<td>{schedule.lessonName}</td>
									<td>{schedule.state}</td>
									{/* <td>{rooms.roomSchedule.myDate}</td>
									<td>{rooms.roomSchedule.orderOfLesson}</td>
									<td>{rooms.roomSchedule.state}</td> */}
									<td>
										<button
											type='button'
											className='btn btn-primary'
											data-bs-toggle='modal'
											onClick={() => {}}
											data-bs-target='#delete_modal'>
											删除自习室
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
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
				</BaseCord>
			</React.Fragment>
		);
	}
}

export default Schedule1;
