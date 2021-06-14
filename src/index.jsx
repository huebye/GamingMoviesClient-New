import  React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';
import Container from 'react-bootstrap/Container';

import  MainView  from './components/main-view/main-view';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

class GamingMoviesApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
              <Container style={{ fontFamily: 'Teko' , minHeight: '100vh', maxWidth: '100%'}}>
                <MainView />
              </Container>
            </Provider>
        );
    }
}

const container = document.getElementsByClassName('app-container') [0];

ReactDOM.render(React.createElement(GamingMoviesApplication), container);
