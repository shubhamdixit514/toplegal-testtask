import ReactDOM from 'react-dom/client';
import { client } from 'graphql/graphqlClient';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from 'redux/store'

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </Provider>
);
