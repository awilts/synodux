import { Player } from '../../types/Player'
import { FC } from 'react'

type Props = {
    playersToDisplay: Player[]
}


export const AvatarBar: FC<Props> = ({ playersToDisplay }) => {
    if (playersToDisplay.length > 0) {
        return (
            <>
                {playersToDisplay.map(player => {
                    return <>{player.name[0]}</>
                })}
            </>
        )
    } else {
        return <></>
    }
}
