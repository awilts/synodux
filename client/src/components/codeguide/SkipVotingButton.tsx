import React, { FC, useContext } from 'react'
import { Button } from '@material-ui/core'
import { ServerContext } from '../ServerContextProvider'

const SkipVotingButton: FC = () => {

    const {forceAdvanceGame } = useContext(ServerContext)

    return (
        <Button onClick={() => forceAdvanceGame()} variant="contained" color="primary">
            Skip Voting
        </Button>
    )
}

export default SkipVotingButton
