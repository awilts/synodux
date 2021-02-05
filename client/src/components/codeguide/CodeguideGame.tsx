import React, { FC } from 'react'
import CodeguideBoard from './CodeguideBoard'
import ResetGameButton from './ResetGameButton'
import PlayerList from './PlayerList'
import SkipVotingButton from './SkipVotingButton'
import { Grid, Typography } from '@material-ui/core'
import StartGameButton from './StartGameButton'

const CodeguideGame: FC = () => {
    return (
        <>
            {/* <Grid container spacing={2}> */}
            <div className="flex flex-wrap">
                <PlayerList team={'blue'} />
                <CodeguideBoard />
                <PlayerList team={'red'} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <StartGameButton />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Host-Buttons:</Typography>
                        <ResetGameButton />
                        <SkipVotingButton />
                    </Grid>
                </Grid>
            </div>
            {/* </Grid> */}
        </>
    )
}

export default CodeguideGame
