import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AddEvent from './components/AddEvent';

function ProtectedRoute({path, element}){
  const token = localStorage.getItem("token");
  console.log(token, "token");
  if (token) {
    console.log(token, "protected");
    return <Route path={path} element={element}></Route>;
  }else{
    return <Route path={path} element={element}></Route>;
  }
}

function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<UserDashboard/>} />
      <Route path='/addevent' element={<AddEvent/>} />
      {/* <ProtectedRoute path="/dashboard" element={<UserDashboard/>} /> */}
    </Routes>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
