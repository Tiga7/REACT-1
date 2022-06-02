import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

class Navbar extends Component {
	state = {};

	handle_logout = () => {
		localStorage.removeItem("userinfo");
		localStorage.removeItem("charactor");
		window.location.href = "/home";
	};
	show_user = () => {
		if (this.props.is_login) {
			return (
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<a className='navbar-brand' style={{ cursor: "pointer" }}>
							{this.props.username}
						</a>
					</li>
					<li className='nav-item'>
						<a onClick={this.handle_logout} className='navbar-brand' style={{ cursor: "pointer" }}>
							退出
						</a>
					</li>
				</ul>
			);
		} else {
			return (
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<Link className='navbar-brand' to='/login'>
							登录
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='navbar-brand' to='/register'>
							激活
						</Link>
					</li>
				</ul>
			);
		}
	};

	show_calculate = () => {
		if (this.props.is_login) {
			return (
				<li className='nav-item'>
					<Link className='nav-link' to='/calculator'>
						计算器
					</Link>
				</li>
			);
		} else {
			return "";
		}
	};
	show_student = () => {
		if (this.props.charactor === "admin") {
			return (
				<li className='nav-item'>
					<Link className='nav-link' to='/student'>
						学生管理
					</Link>
				</li>
			);
		} else {
			return "";
		}
	};
	show_room1 = () => {
		if (this.props.charactor === "admin") {
			return (
				<li className='nav-item'>
					<Link className='nav-link' to='/room1'>
						自习室管理
					</Link>
				</li>
			);
		} else {
			return "";
		}
	};
	show_schedule1 = () => {
		if (this.props.charactor === "admin") {
			return (
				<li className='nav-item'>
					<Link className='nav-link' to='/schedule1'>
						管理课表
					</Link>
				</li>
			);
		} else {
			return "";
		}
	};

	render() {
		return (
			<React.Fragment>
				<nav
					className='navbar navbar-light navbar-expand-lg navbar-light '
					style={{ backgroundColor: "#e3f2fd", borderRadius: "5px" }}>
					<div className='container'>
						<Link className='navbar-brand' to='/'>
							打卡
						</Link>
						<button
							className='navbar-toggler'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarText'
							aria-controls='navbarText'
							aria-expanded='false'
							aria-label='Toggle navigation'>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse' id='navbarText'>
							<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
								<li className='nav-item'>
									<Link className='nav-link' to='/home'>
										Home
									</Link>
								</li>

								<li className='nav-item'>
									<Link className='nav-link' to='/ptc'>
										打卡页面
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/room2'>
										用户自习室相关操作
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/schedule2'>
										用户课表相关操作
									</Link>
								</li>
								{/* 权限管理的操作*/}
								{/* {this.show_calculate()} */}
								{this.show_student()}
								{this.show_room1()}
								{this.show_schedule1()}

								{/* <li className='nav-item'>
									<Link className='nav-link' to='/student'>
										学生管理
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/room1'>
										自习室管理
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/schedule1'>
										管理课表
									</Link>
								</li> */}
							</ul>
							{this.show_user()}
						</div>
					</div>
				</nav>
			</React.Fragment>
		);
	}
}

export default Navbar;
