import React, { Component } from "react";
import Navbar from "./navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import PTC from "./content/ptc";
import Calculator from "./content/room2";
import Home from "./content/home";
import Login from "./content/login";
import NotFound from "./content/notFound";
import Register from "./content/register";
import BaseCord from "./content/baseCord";
import Room from "./content/room1";
import Student from "./content/student";
import $ from "jquery";
import Room1 from "./content/room1";
import Room2 from "./content/room2";
import Schedule1 from "./content/schedule1";
import Schedule2 from "./content/schedule2";

class App extends Component {
	state = {
		user: JSON.parse(localStorage.getItem("userinfo")),
		charactor: localStorage.getItem("charactor"),
		userId: "",
		username: "",
		is_login: false,
	};

	//实现持久登录  用localstorage
	componentDidMount() {
		if (this.state.user !== null) {
			if (this.state.charactor === "student") {
				$.ajax({
					url: "http://localhost:8080/ptc/user/getState",
					type: "post",
					dataType: "json",
					data: {
						userId: this.state.user.userId,
					},
					success: (resp) => {
						// console.log(resp);
						if (resp.result === "login") {
							this.setState({
								userId: resp.data.userId,
								username: resp.data.username,
								is_login: true,
							});
						} else {
							this.setState({
								is_login: false,
							});
						}
					},
				});
			} else {
				this.setState({
					username: this.state.user.name,
					is_login: true,
				});
			}
		}
	}
	render() {
		return (
			<React.Fragment>
				<Navbar
					is_login={this.state.is_login}
					charactor={this.state.charactor}
					username={this.state.username}
				/>
				<div className='container'>
					<Routes>
						<Route path='/' element={<BaseCord>打卡系统</BaseCord>}></Route>
						<Route path='/home' element={<Home></Home>}></Route>

						<Route
							path='/room1/*'
							element={this.state.is_login ? <Room1 /> : <Navigate replace to='/login' />}></Route>
						<Route path='/room2/*' element={<Room2></Room2>}></Route>
						<Route
							path='/schedule1/*'
							element={
								this.state.is_login ? <Schedule1 /> : <Navigate replace to='/login' />
							}></Route>
						<Route path='/schedule2/*' element={<Schedule2></Schedule2>}></Route>

						<Route path='/ptc' element={<PTC></PTC>}></Route>

						<Route
							path='/student/*'
							element={
								this.state.is_login ? <Student /> : <Navigate replace to='/login' />
							}></Route>

						<Route path='/room/*' element={<Room></Room>}></Route>
						<Route
							path='/login/*'
							element={
								this.state.is_login ? (
									<Navigate replace to='/home' />
								) : (
									<Login handle_login={this.handle_login} />
								)
							}></Route>
						<Route
							path='/register'
							element={
								this.state.is_login ? <Navigate replace to='/home' /> : <Register />
							}></Route>

						<Route path='/404' element={<NotFound></NotFound>}></Route>
						<Route path='*' element={<Navigate replace to={"/404"}></Navigate>}></Route>
					</Routes>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
