import React, { FC, useContext, useEffect, useState } from 'react'
import { Word } from '../../types/Word'
import { AvatarBar } from './AvatarBar'
import { FirebaseContext } from '../FirebaseContextProvider'
import { Player } from '../../types/Player'

type Props = {
    word: Word
}

const CodeguideCard: FC<Props> = ({ word }) => {
    const { players, voteForWord } = useContext(FirebaseContext)
    const [playersOnThisCard, setPlayersOnThisCard] = useState<Player[]>([])
    const [cardColor, setCardColor] = useState<string>('')

    useEffect(() => {
        setPlayersOnThisCard(players.filter(player => player.vote === word.id))
    }, [players, word])

    useEffect(() => {
        if (word.team) {
            if (word.team === 'red') {
                setCardColor('bg-red-500')
                console.log(word, 'red')
            } else if (word.team === 'blue') {
                setCardColor('bg-blue-500')
            }
        }
    }, [word])

    return (
        <div
            onClick={() => voteForWord(word)}
            className={
                'm-3 border-4 border-black border-opacity-40 border-solid ' +
                cardColor
            }
        >
            <AvatarBar playersToDisplay={playersOnThisCard} />
            <p>{word.text}</p>
        </div>
    )
}

export default CodeguideCard
