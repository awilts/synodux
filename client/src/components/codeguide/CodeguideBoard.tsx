import React, { FC, useContext } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import CodeguideCard from './CodeguideCard'
import { makeStyles } from '@material-ui/core/styles'
import { FirebaseContext } from '../FirebaseContextProvider'


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        padding: 20,
    },
})
const CodeguideBoard: FC = () => {
    const { lobby, words } = useContext(FirebaseContext)
    const WordList =
        words &&
        words.map(word => <CodeguideCard key={word.boardId} word={word} />)
    const classes = useStyles()


    let titelText
    if (lobby && lobby.currentTeam) {
        titelText = 'Current team is: ' + lobby.currentTeam
    } else {
        titelText = 'Waiting for host to start game...'
    }

    return (
        <Grid item xs={8}>
            <Box borderLeft={1} borderRight={1}>
                <Typography align={'center'} variant={'h3'}>
                    {titelText}
                </Typography>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        {WordList}
                    </Grid>
                </div>
            </Box>
        </Grid>
    )
}

export default CodeguideBoard
