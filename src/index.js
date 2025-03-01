import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';
import {FitnessCenterProvider} from './store/FitnessCenterContext';
import * as serviceWorker from './serviceWorker';

import './styles.css';

const rootElement = document.getElementById('root');

const Application = () => {
    return(
        <FitnessCenterProvider>
            <App />
        </FitnessCenterProvider>
    );
};

ReactDOM.render(<Application />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();