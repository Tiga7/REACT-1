import React, { Component } from "react";
import BaseCord from "./baseCord";
class NotFound extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<BaseCord>404 NOT FOUND</BaseCord>
			</React.Fragment>
		);
	}
}

export default NotFound;
