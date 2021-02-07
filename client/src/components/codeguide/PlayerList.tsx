import React, { FC, useContext, useEffect, useState } from 'react'
import PlayerCard from './PlayerCard'
import { Button } from '@material-ui/core'
import HintList from './HintList'
import { FirebaseContext } from '../FirebaseContextProvider'
import { Player } from '../../types/Player'

type Props = {
    team: string
}

const PlayerList: FC<Props> = ({ team }) => {
    const { players, joinTeam, thisPlayer } = useContext(FirebaseContext)
    const [playersInLobby, setPlayersInLobby] = useState<Player[]>()
    const [isPlayerInLobby, setIsPlayerInLobby] = useState<boolean>()

    useEffect(() => {
        const playersInTeam = players.filter(player => player.team === team)
        setPlayersInLobby(playersInTeam)
        setIsPlayerInLobby(
            playersInTeam.some(player => player.id === thisPlayer.id)
        )
    }, [players, thisPlayer, team])

    return (
        <>
            <div className="flex flex-col">
                <h3>Team {team}</h3>
                {playersInLobby &&
                    playersInLobby.map(player => (
                        <PlayerCard player={player} key={player.id} />
                    ))}
            </div>
            <Button
                onClick={() => joinTeam(thisPlayer, team)}
                variant="contained"
                color="primary"
                disabled={isPlayerInLobby}
            >
                Join Team
            </Button>
            <HintList team={team} />
        </>
    )
}

export default PlayerList
