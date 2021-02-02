import React, { FC, useContext, useEffect, useState } from 'react'
import { Card, createStyles, Theme } from '@material-ui/core'
import { Player } from '../../types/Player'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { ServerContext } from '../ServerContextProvider'

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

const PlayerCard: FC<Props> = ({ player }) => {
    let styles = useStyles()

    const { thisPlayer } = useContext(ServerContext)
    const [isThisPlayer, setIsThisPlayer] = useState<boolean>(false)

    useEffect(() => {
        if (player.id === thisPlayer.id) {
            setIsThisPlayer(true)
        } else{
            setIsThisPlayer(false)
        }
    }, [thisPlayer])
 

    if (isThisPlayer) {
        return (
            <Grid item xs={12}>
                <Card className={styles.green}>
                    <Typography>{player.name}</Typography>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid item xs={12}>
                <Card>
                    <Typography>{player.name}</Typography>
                </Card>
            </Grid>
        )
    }
}

export default PlayerCard
