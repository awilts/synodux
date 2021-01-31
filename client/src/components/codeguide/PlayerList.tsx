import React, { FC, useContext } from 'react'
import { Player } from '../../types/Player'
import Grid from '@material-ui/core/Grid'
import PlayerCard from './PlayerCard'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { FirebaseReducer } from 'react-redux-firebase'
import HintList from './HintList'
import { Hint } from '../../types/Hint'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'
import { PlayerListContext } from '../PlayerListContextProvider'

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

    const user: FirebaseReducer.AuthState | undefined = useSelector(
        (state: State) => state.firebase?.auth
    )

    const currentUser: Player = players.filter(player => player.id === user?.uid)[0]
    const {playerList, joinTeam} = useContext(PlayerListContext)
    const classes = useStyles()

    const isPlayerInCurrentLobby = players
        .filter(player => player.team === team)
        .map(player => player.id)
        .includes(user?.uid)

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
                <p>{JSON.stringify(playerList)}</p>
                <Button
                    onClick={() => joinTeam(currentUser, team)}
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
