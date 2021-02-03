import React, { FC, useContext } from 'react'
import { Button } from '@material-ui/core'
import { FirebaseContext } from '../FirebaseContextProvider'

const SkipVotingButton: FC = () => {

    const {forceAdvanceGame } = useContext(FirebaseContext)

    return (
        <Button onClick={() => forceAdvanceGame()} variant="contained" color="primary">
            Skip Voting
        </Button>
    )
}

export default SkipVotingButton
