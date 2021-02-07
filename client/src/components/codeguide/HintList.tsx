import React, { FC, useContext } from 'react'
import HintCard from './HintCard'
import { FirebaseContext } from '../FirebaseContextProvider'

type Props = {
    team: string
}

const HintList: FC<Props> = ({ team }) => {
    const { hints } = useContext(FirebaseContext)

    const Hints =
        hints &&
        hints
            .filter(hint => hint.team === team)
            .map(hint => <HintCard hint={hint} key={hint.id} />)
    return (
        <>
            <h3>Hints: </h3>
            {Hints}
        </>
    )
}

export default HintList
