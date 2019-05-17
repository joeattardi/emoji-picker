import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';

ReactGA.initialize('UA-80557105-6');
ReactGA.pageview('/');

ReactDOM.render(<App />, document.getElementById('root'));
