import React, { FC, useContext } from 'react'
import { Word } from '../../types/Word'
import Card from '@material-ui/core/Card'
import { CardContent, createStyles, Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { CardColor } from '../../types/CardColor'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'
import { useFirebase } from 'react-redux-firebase'
import { Player } from '../../types/Player'
import { AvatarBar } from './AvatarBar'
import firebase from 'firebase/app'
import 'firebase/functions'
import { PlayerListContext } from '../PlayerListContextProvider'

type Props = {
    word: Word
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        blue: {
            backgroundColor: 'cornflowerblue',
        },
        red: {
            backgroundColor: 'red',
        },
    })
)
const CodeguideCard: FC<Props> = props => {
    const classes = useStyles()

    const firebase = useFirebase()
    const changeVote = firebase
        // @ts-ignore
        .functions()
        .httpsCallable('changeVote')

    const { players } = useContext(PlayerListContext)

    const voteForCard = async () => {
        const lobbyId = 'GeyDTo9SUstY3JhlofJj'
        console.log({ word })
        console.log(`voting for card ${word.text}`)
        changeVote({ vote: word.id, lobbyId }).then(function (
            result: firebase.functions.HttpsCallableResult
        ) {
            // Read result of the Cloud Function.
            const sanitizedMessage = result.data
            // ...
            console.log(sanitizedMessage)
        })
    }

    const word = props.word

    const playersOnThisCard = players.filter(player => player.vote === word.id)

    const color = word.team

    return (
        <Grid item xs={6} sm={3}>
            <Card
                onClick={voteForCard}
                className={clsx(classes.card, {
                    [classes.blue]: color === CardColor.blue,
                    [classes.red]: color === CardColor.red,
                })}
            >
                <AvatarBar playersToDisplay={playersOnThisCard} />
                <CardContent>{word.text}</CardContent>
            </Card>
        </Grid>
    )
}

export default CodeguideCard
