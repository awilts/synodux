import { FC, useContext, useEffect, useState } from 'react'
import PlayerCard from './PlayerCard'
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
            {!isPlayerInLobby && (
                <button
                    onClick={() => joinTeam(thisPlayer, team)}
                    type="button"
                    className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline "
                >
                    Join Team
                </button>
            )}

            <HintList team={team} />
        </>
    )
}

export default PlayerList
