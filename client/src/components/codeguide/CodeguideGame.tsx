import React, { FC } from 'react'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'
import CodeguideBoard from './CodeguideBoard'
import { Word } from '../../types/Word'
import ResetGameButton from './ResetGameButton'
import PlayerList from './PlayerList'
import { Player } from '../../types/Player'
import SkipVotingButton from './SkipVotingButton'
import { Grid, Typography } from '@material-ui/core'
import { WordOwner } from '../../types/WordOwner'
import { Hint } from '../../types/Hint'
import StartGameButton from './StartGameButton'

const CodeguideGame: FC = () => {
    useFirestoreConnect({
        collection: 'lobbies',
        doc: 'GeyDTo9SUstY3JhlofJj',
        subcollections: [{ collection: 'words' }],
        storeAs: 'words',
    })
    const words: Word[] = useSelector(
        (state: State) => state.firestore.ordered.words
    )

    useFirestoreConnect({
        collection: 'lobbies',
        doc: 'GeyDTo9SUstY3JhlofJj',
        subcollections: [{ collection: 'players' }],
        storeAs: 'players',
    })
    const players: Player[] = useSelector(
        (state: State) => state.firestore.ordered.players
    )

    useFirestoreConnect({
        collection: 'lobbies',
        doc: 'GeyDTo9SUstY3JhlofJj',
        subcollections: [{ collection: 'wordOwners' }],
        storeAs: 'wordOwners',
    })
    const wordOwners: WordOwner[] = useSelector(
        (state: State) => state.firestore.ordered.wordOwners
    )

    useFirestoreConnect({
        collection: 'lobbies',
        doc: 'GeyDTo9SUstY3JhlofJj',
        subcollections: [{ collection: 'hints' }],
        storeAs: 'hints',
    })

    useFirestoreConnect({
        collection: 'lobbies',
        doc: 'GeyDTo9SUstY3JhlofJj',
        storeAs: 'lobby',
    })

    const hints: Hint[] = useSelector(
        (state: State) => state.firestore.ordered.hints
    )

    return (
        <>
            <Grid container spacing={2}>
                <PlayerList team={'blue'} />
                <CodeguideBoard words={words} />
                <PlayerList team={'red'} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <StartGameButton />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Host-Buttons:</Typography>
                        <ResetGameButton
                            hints={hints}
                            words={words}
                            players={players}
                            wordOwners={wordOwners}
                        />
                        <SkipVotingButton />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CodeguideGame
