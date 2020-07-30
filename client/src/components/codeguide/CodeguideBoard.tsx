import React, { FC } from 'react'
import { Word } from '../../types/Word'
import { Box, Grid, Typography } from '@material-ui/core'
import CodeguideCard from './CodeguideCard'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'
import { Lobby } from '../../types/Lobby'

type Props = {
    words: Word[]
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        padding: 20,
    },
})
const CodeguideBoard: FC<Props> = (props) => {
    const words = props.words
    const WordList =
        words &&
        words.map((word) => <CodeguideCard key={word.boardId} word={word} />)
    const classes = useStyles()
    const lobby: Lobby = useSelector(
        // @ts-ignore
        (state: State) => state.firestore.ordered.lobby[0]
    )

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
