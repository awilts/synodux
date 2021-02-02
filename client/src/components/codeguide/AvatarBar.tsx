import * as React from 'react'
import { Avatar, createStyles, Theme } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { Player } from '../../types/Player'
import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
    playersToDisplay: Player[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        placeholder: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            visibility: 'hidden',
        },
    })
)

export const AvatarBar: FC<Props> = (props: Props) => {
    const classes = useStyles()

    if (props.playersToDisplay.length > 0) {
        return (
            <AvatarGroup>
                {props.playersToDisplay.map(player => {
                    return (
                        <Avatar className={classes.small} key={player.id}>
                            {player.name[0]}
                        </Avatar>
                    )
                })}
            </AvatarGroup>
        )
    } else {
        return (
            <AvatarGroup>
                <Avatar className={classes.placeholder}>F</Avatar>
            </AvatarGroup>
        )
    }
}
