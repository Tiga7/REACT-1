import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {
    state = {  }

    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-light navbar-expand-lg navbar-light " style={{backgroundColor:'#e3f2fd'}}>
                <div className="container">
                    <Link className="navbar-brand" to="/">打卡</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/calculator">计算器</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/about">关于</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/student">学生管理</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/room">自习室管理</Link>
                        </li>
                        

                    </ul>
               
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link className="nav-link" to="/login">登录</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/register">激活</Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
            </React.Fragment>
        );

    }
}
 
export default Navbar;