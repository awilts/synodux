import React, { FC } from 'react'
import './App.css'
import Authentication from './components/Authentication'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import { createStore, combineReducers } from 'redux'
import {
    ReactReduxFirebaseProvider,
    firebaseReducer,
} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import { initialState } from './store/state'
import CodeguideGame from './components/codeguide/CodeguideGame'
import { ServerContextProvider } from './components/ServerContextProvider'

const conf = require('./devlocal').conf
const fbConfig = {
    apiKey: conf.apiKey,
    authDomain: conf.authDomain,
    projectId: conf.projectId,
}

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
}

firebase.initializeApp(fbConfig)
firebase.functions()
firebase.firestore()
// @ts-ignore
console.log('foo: ' + window.location.hostname)
if (window.location.hostname === 'localhost') {
    firebase.firestore().settings({
        host: 'localhost:8080',
        ssl: false,
    })
    firebase.functions().useEmulator('localhost', 5001)
}

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
})

const store = createStore(
    rootReducer,
    initialState,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
}

const showCodeguide = true

const App: FC = () => {
    return (
        <div>
            <Provider store={store}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                    <Authentication>
                        <ServerContextProvider>
                            {showCodeguide ? <CodeguideGame /> : <div />}
                        </ServerContextProvider>
                    </Authentication>
                </ReactReduxFirebaseProvider>
            </Provider>
        </div>
    )
}

export default App
