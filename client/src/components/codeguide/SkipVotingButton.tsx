import React, { FC } from 'react'
import { Button } from '@material-ui/core'
import { useFirebase } from 'react-redux-firebase'
import { functions } from 'firebase'
import { Lobby } from '../../types/Lobby'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'

const SkipVotingButton: FC = () => {
    const firebase = useFirebase()

    const lobby: Lobby = useSelector(
        // @ts-ignore
        (state: State) => state.firestore.ordered.lobby[0]
    )

    const forceAdvanceGame = async () => {
        const forceAdvanceGameFunction = firebase
            // @ts-ignore
            .functions()
            .httpsCallable('forceAdvanceGame')
        forceAdvanceGameFunction({ lobbyId: lobby.id }).then(function (
            result: functions.HttpsCallableResult
        ) {
            const sanitizedMessage = result.data
            console.log(sanitizedMessage)
        })
    }

    return (
        <Button onClick={forceAdvanceGame} variant="contained" color="primary">
            Skip Voting
        </Button>
    )
}

export default SkipVotingButton
