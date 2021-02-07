import React, { FC, useContext, useEffect, useState } from 'react'
import { Word } from '../../types/Word'
import Card from '@material-ui/core/Card'
import { CardContent, createStyles, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { CardColor } from '../../types/CardColor'
import { AvatarBar } from './AvatarBar'
import { FirebaseContext } from '../FirebaseContextProvider'
import { Player } from '../../types/Player'

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
const CodeguideCard: FC<Props> = ({ word }) => {
    const classes = useStyles()
    const { players, voteForWord } = useContext(FirebaseContext)
    const [playersOnThisCard, setPlayersOnThisCard] = useState<Player[]>([])

    useEffect(() => {
        setPlayersOnThisCard(players.filter(player => player.vote === word.id))
    }, [players, word])
    const color = word.team

    return (
        <Card
            onClick={() => voteForWord(word)}
            className={clsx(classes.card, {
                [classes.blue]: color === CardColor.blue,
                [classes.red]: color === CardColor.red,
            })}
        >
            <AvatarBar playersToDisplay={playersOnThisCard} />
            <CardContent>{word.text}</CardContent>
        </Card>
    )
}

export default CodeguideCard
