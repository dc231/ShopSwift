import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
// import store from './config/store'
import { Toaster } from 'react-hot-toast'
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
    </Provider>
)
