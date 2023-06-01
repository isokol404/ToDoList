import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import './App.css'
import TaskList  from "./components/TaskList/TaskList.jsx";
import reducer from './reducer';
// import TaskList from './TaskList';
import SortOptions from './components/SortOptions/SortOptions.jsx';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);
const store= createStore(reducer, middleware);

function App() {
    return (
        <Provider store={store}>
            <div style={{ width: '100%' }}>
                <SortOptions />
                <TaskList />
            </div>
        </Provider>
    );
}

export default App
