import React, { FC, useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import PlayerCard from './PlayerCard'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import HintList from './HintList'
import { Hint } from '../../types/Hint'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'
import { PlayerListContext } from '../PlayerListContextProvider'
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
    const hints: Hint[] = useSelector(
        (state: State) => state.firestore.ordered.hints
    )

    const { playerList, joinTeam, player } = useContext(PlayerListContext)

    const [playersInLobby, setPlayersInLobby] = useState<Player[]>()
    const [isPlayerInLobby, setIsPlayerInLobby] = useState<boolean>()

    const classes = useStyles()

    useEffect(() => {
        const newPlayersInLobby = playerList.filter(
            player => player.team === team
        )
        setPlayersInLobby(newPlayersInLobby)
        setIsPlayerInLobby(playerList.includes(player))
    }, [playerList, player])

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
                <p>{JSON.stringify(playerList)}</p>
                <Button
                    onClick={() => joinTeam(player, team)}
                    variant="contained"
                    color="primary"
                    disabled={isPlayerInLobby}
                >
                    Join Team
                </Button>
                <HintList hints={hints} team={team} />
            </div>
        </Grid>
    )
}

export default PlayerList
