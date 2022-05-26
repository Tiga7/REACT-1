import React, { Component } from 'react';
import Navbar from './navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import About from './content/about';
import Calculator from './content/calculator';
import Home from './content/home';
import Login from './content/login';
import NotFound from './content/notFound';
import Register from './content/register';
import BaseCord from './content/baseCord';
import Room from './content/room';
import Student from './content/student';

class App extends Component {
    state = { 
        username:'',
        is_login:false
     } 
    render() { 
        return (

            <React.Fragment>
                <Navbar is_login={'hhhh'} username={'gan'} />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<BaseCord>打卡系统</BaseCord>}></Route>
                        <Route path='/home' element={<Home></Home>}></Route>
                        <Route path='/calculator' element={<Calculator></Calculator>}></Route>
                        <Route path='/about' element={<About></About>}></Route>
                        <Route path='/student/*' element={<Student></Student>}></Route>
                        <Route path='/room' element={<Room></Room>}></Route>
                        <Route path='/login/*' element={this.state.is_login?<navigator replace to="/home"/>:<Login/>}></Route>
                        <Route path='/register' element={this.state.is_login?<navigator replace to="/home"/>:<Register/>}></Route>

                        <Route path='/404' element={<NotFound></NotFound>}></Route>
                        <Route path='*' element={<Navigate replace to={'/404'}></Navigate>}></Route>
                    </Routes>
                </div>
                
            </React.Fragment>
        );
    }
}
 
export default App;