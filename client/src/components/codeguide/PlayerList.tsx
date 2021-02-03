import React, { FC, useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import PlayerCard from './PlayerCard'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import HintList from './HintList'
import { FirebaseContext } from '../FirebaseContextProvider'
import { Player } from '../../types/Player'

type Props = {
    team: string
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        padding: 20,
    },
})

const PlayerList: FC<Props> = ({ team }) => {
    
    const { players, joinTeam, thisPlayer } = useContext(FirebaseContext)
    const [playersInLobby, setPlayersInLobby] = useState<Player[]>()
    const [isPlayerInLobby, setIsPlayerInLobby] = useState<boolean>()

    const classes = useStyles()

    useEffect(() => {
        const playersInTeam = players.filter(player => player.team === team)
        setPlayersInLobby(playersInTeam)
        setIsPlayerInLobby(playersInTeam.some(player => player.id === thisPlayer.id))
    }, [players, thisPlayer])

    return (
        <Grid item xs={2}>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <h3>Team {team}</h3>
                    {playersInLobby &&
                        playersInLobby.map(player => (
                            <PlayerCard player={player} key={player.id} />
                        ))}
                </Grid>
                <Button
                    onClick={() => joinTeam(thisPlayer, team)}
                    variant="contained"
                    color="primary"
                    disabled={isPlayerInLobby}
                >
                    Join Team
                </Button>
                <HintList team={team} />
            </div>
        </Grid>
    )
}

export default PlayerList
