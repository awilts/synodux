import React, { FC, useContext } from 'react'
import CodeguideCard from './CodeguideCard'
import { FirebaseContext } from '../FirebaseContextProvider'

const CodeguideBoard: FC = () => {
    const { lobby, words } = useContext(FirebaseContext)

    let titelText
    if (lobby && lobby.currentTeam) {
        titelText = 'Current team is: ' + lobby.currentTeam
    } else {
        titelText = 'Waiting for host to start game...'
    }

    return (
            <div>
                <h1 className="font-sans text-xl font-bold">{titelText}</h1>
                <div className="grid grid-cols-4 bg-">
                    {words &&
                        words.map(word => (
                            <CodeguideCard key={word.boardId} word={word} />
                        ))}
                </div>
            </div>
    )
}

export default CodeguideBoard
