import React, { FC, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { Hint } from '../../types/Hint'
import HintCard from './HintCard'
import { ServerContext } from '../ServerContextProvider'

type Props = {
    team: string
}

const HintList: FC<Props> = props => {
    const { hints } = useContext(ServerContext)

    const Hints =
        hints &&
        hints
            .filter(hint => hint.team === props.team)
            .map(hint => <HintCard hint={hint} key={hint.id} />)
    return (
        <Grid container spacing={1}>
            <h3>Hints</h3>
            {Hints}
        </Grid>
    )
}

export default HintList
