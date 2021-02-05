import React, { FC, useContext, useEffect, useState } from 'react'
import { Player } from '../../types/Player'
import { FirebaseContext } from '../FirebaseContextProvider'

type Props = {
    player: Player
}

const PlayerCard: FC<Props> = ({ player }) => {

    const { thisPlayer } = useContext(FirebaseContext)
    const [isThisPlayer, setIsThisPlayer] = useState<boolean>(false)

    useEffect(() => {
        if (player.id === thisPlayer.id) {
            setIsThisPlayer(true)
        } else {
            setIsThisPlayer(false)
        }
    }, [thisPlayer, player])

    if (isThisPlayer) {
        return (
            <div className="bg-green-500">
                <p>{player.name}</p>
            </div>
        )
    } else {
        return (
            <div className="bg-gray-500">
                <p>{player.name}</p>
            </div>
        )
    }
}

export default PlayerCard
