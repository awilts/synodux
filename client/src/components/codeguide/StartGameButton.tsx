import React, { FC } from 'react'
import { Button } from '@material-ui/core'
import { useFirebase } from 'react-redux-firebase'
import { Lobby } from '../../types/Lobby'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'
import firebase from 'firebase/app'
import 'firebase/functions'

const StartGameButton: FC = () => {
    const firebase = useFirebase()

    const lobby: Lobby = useSelector(
        // @ts-ignore
        (state: State) => state.firestore.ordered.lobby[0]
    )

    let showButton = true
    if (lobby && lobby.currentTeam) {
        showButton = false
    }

    const startGame = async () => {
        const startGameFunction = firebase
            // @ts-ignore
            .functions()
            .httpsCallable('startGame')
        startGameFunction({ lobbyId: 'GeyDTo9SUstY3JhlofJj' }).then(function (
            result: firebase.functions.HttpsCallableResult
        ) {
            const sanitizedMessage = result.data
            console.log(sanitizedMessage)
        })
    }

    if (!showButton) {
        return <></>
    }
    return (
        <Button onClick={startGame} variant="contained" color="primary">
            start game
        </Button>
    )
}

export default StartGameButton
