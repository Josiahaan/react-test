import '@/styles/globals.css'
import { Provider } from "react-redux";
import store from '@/store';

const App = props => {
  const { Component, pageProps } = props;
  return (
  <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
  )
}

export default App;
