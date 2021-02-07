import { FC } from 'react'
import { Hint } from '../../types/Hint'

type Props = {
    hint: Hint
}

const HintCard: FC<Props> = props => {
    return <p>{props.hint.text}</p>
}

export default HintCard
