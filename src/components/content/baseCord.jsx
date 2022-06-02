import React, { Component } from "react";
class BaseCord extends Component {
	state = {};
	render() {
		return (
			<div className='card' style={{ marginTop: "20px", backgroundColor: "#e3f2fd" }}>
				<div className='card-body'>{this.props.children}</div>
			</div>
		);
	}
}

export default BaseCord;
