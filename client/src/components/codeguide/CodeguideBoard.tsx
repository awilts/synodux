import React, { FC, useContext } from 'react'
import { Box, Grid } from '@material-ui/core'
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
        <Grid item xs={8}>
            <Box borderLeft={1} borderRight={1}>
                <h1 className="font-sans text-xl font-bold">{titelText}</h1>
                <div className="grid grid-cols-4">
                    {words &&
                        words.map(word => (
                            <CodeguideCard key={word.boardId} word={word} />
                        ))}
                </div>
            </Box>
        </Grid>
    )
}

export default CodeguideBoard
