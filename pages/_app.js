import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import PageWrapper from '@/components/PageWrapper';

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
        <PageWrapper>
      <Component {...pageProps} />
      </PageWrapper>
    </Provider>
  );
};

export default App;
