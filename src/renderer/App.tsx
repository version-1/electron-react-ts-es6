import React from 'react'
import { Provider } from 'react-redux'
import Index from 'containers/IndexContainer'
import store from 'modules/index'

function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  )
}

export default App
