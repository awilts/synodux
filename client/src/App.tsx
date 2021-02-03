import React, { FC } from 'react'
import './App.css'
import Authentication from './components/Authentication'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import CodeguideGame from './components/codeguide/CodeguideGame'
import { ServerContextProvider } from './components/ServerContextProvider'

const conf = require('./devlocal').conf
const fbConfig = {
    apiKey: conf.apiKey,
    authDomain: conf.authDomain,
    projectId: conf.projectId,
}

firebase.initializeApp(fbConfig)

if (window.location.hostname === 'localhost') {
    firebase.firestore().settings({
        host: 'localhost:8080',
        ssl: false,
    })
    firebase.functions().useEmulator('localhost', 5001)
}

const App: FC = () => {
    return (
        <div>
            <Authentication>
                <ServerContextProvider>
                    <CodeguideGame/>
                </ServerContextProvider>
            </Authentication>
        </div>
    )
}

export default App
