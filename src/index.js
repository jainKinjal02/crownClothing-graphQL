import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';

import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import { ApolloClient , InMemoryCache, ApolloProvider } from '@apollo/client';

import { store ,persistor} from './store/store';
import reportWebVitals from './reportWebVitals';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';

const client = new ApolloClient({
  uri: 'https://crwn-clothing.com/', //graphql server url --playground
  cache: new InMemoryCache()
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Elements stripe={ stripePromise }>
                <App />
              </Elements>
            </BrowserRouter>
          </PersistGate>
        </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
