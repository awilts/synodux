import React, { FC, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import MyFirebaseAuthentication from './MyFirebaseAuthentication'

const Authentication: FC = (props) => {
    const [signedIn, setSignedIn] = useState<boolean>(false)

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
        ],
        credentialHelper: 'none',
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setSignedIn(!!user)
        })
    }, [])

    if (!signedIn) {
        return (
            <div>
                <MyFirebaseAuthentication
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        )
    }
    return <>{props.children}</>
}

export default Authentication
