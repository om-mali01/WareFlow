import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import RegisterForm from './pages/RegisterForm';
import Login from './pages/LoginForm';
import SideBar from './components/sideBar';

function App() {
    return (
        
        <Provider store={store}>
            <div className="App">
                {/* <RegisterForm />
                <Login /> */}
                <SideBar />
            </div>
        </Provider>
    );
}

export default App;
