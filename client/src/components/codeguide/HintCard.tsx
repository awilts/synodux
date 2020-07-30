import React, { FC } from 'react'
import { Card } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Hint } from '../../types/Hint'

type Props = {
    hint: Hint
}

const HintCard: FC<Props> = (props) => {
    return (
        <Grid item xs={12}>
            <Card>
                <Typography>{props.hint.text}</Typography>
            </Card>
        </Grid>
    )
}

export default HintCard
