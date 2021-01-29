import React, { FC } from 'react'
import { Player } from '../../types/Player'
import Grid from '@material-ui/core/Grid'
import PlayerCard from './PlayerCard'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { FirebaseReducer, useFirebase } from 'react-redux-firebase'
import { functions } from 'firebase'
import HintList from './HintList'
import { Hint } from '../../types/Hint'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'

type Props = {
    players: Player[]
    team: string
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        padding: 20,
    },
})

const PlayerList: FC<Props> = ({ team, players }) => {
    const hints: Hint[] = useSelector(
        (state: State) => state.firestore.ordered.hints
    )

    const classes = useStyles()
    const firebase = useFirebase()
    const callJoinTeam = firebase
        // @ts-ignore
        .functions()
        .httpsCallable('joinTeam')

    const user: FirebaseReducer.AuthState | undefined = useSelector(
        (state: State) => state.firebase?.auth
    )

    const isPlayerInCurrentLobby = players
        .filter(player => player.team === team)
        .map(player => player.id)
        .includes(user?.uid)

    const joinTeam = async () => {
        console.log(`joining team ${team}`)
        const lobbyId = 'GeyDTo9SUstY3JhlofJj'
        try {
            const result: functions.HttpsCallableResult = await callJoinTeam({
                team: team,
                lobbyId,
            })

            const sanitizedMessage = result.data
            console.log(sanitizedMessage)
        } catch (err) {
            console.log('BAD', err)
        }
    }

    return (
        <Grid item xs={2}>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <h3>Team {team}</h3>
                    {players &&
                        players
                            .filter(player => player.team === team)
                            .map(player => (
                                <PlayerCard player={player} key={player.id} />
                            ))}
                </Grid>
                <Button
                    onClick={joinTeam}
                    variant="contained"
                    color="primary"
                    disabled={isPlayerInCurrentLobby}
                >
                    Join Team
                </Button>
                <HintList hints={hints} team={team} />
            </div>
        </Grid>
    )
}

export default PlayerList
