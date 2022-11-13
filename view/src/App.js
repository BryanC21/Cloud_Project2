import React from 'react';
import { BrowserRouter } from "react-router-dom";
import URLPaths from "./components/routes";
import "./assets/css/styles.css";
import "./assets/fonts/ionicons.min.css";
import store from './store';
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store} >
            <BrowserRouter>
                <URLPaths />
            </BrowserRouter>
        </Provider>
    );
}
export default App;
