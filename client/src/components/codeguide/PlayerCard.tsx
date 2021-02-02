import React, { FC } from 'react'
import { Card, createStyles, Theme } from '@material-ui/core'
import { Player } from '../../types/Player'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'
import { makeStyles } from '@material-ui/core/styles'
import { FirebaseReducer } from 'react-redux-firebase'

type Props = {
    player: Player
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        green: {
            backgroundColor: 'green',
        },
    })
)

const PlayerCard: FC<Props> = props => {
    let styles = useStyles()

    const user: FirebaseReducer.AuthState | undefined = useSelector(
        (state: State) => state.firebase?.auth
    )

    let isCurrentUser = false
    if (props.player.name === user?.displayName) {
        isCurrentUser = true
    }

    if (isCurrentUser) {
        return (
            <Grid item xs={12}>
                <Card className={styles.green}>
                    <Typography>{props.player.name}</Typography>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid item xs={12}>
                <Card>
                    <Typography>{props.player.name}</Typography>
                </Card>
            </Grid>
        )
    }
}

export default PlayerCard
