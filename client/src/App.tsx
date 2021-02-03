import React, { FC } from 'react'
import './App.css'
import Authentication from './components/Authentication'
import CodeguideGame from './components/codeguide/CodeguideGame'
import { FirebaseContextProvider } from './components/FirebaseContextProvider'

const App: FC = () => {
    return (
        <div>
            <FirebaseContextProvider>
                <Authentication>
                    <CodeguideGame />
                </Authentication>
            </FirebaseContextProvider>
        </div>
    )
}

export default App
