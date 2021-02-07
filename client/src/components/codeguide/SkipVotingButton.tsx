import { FC, useContext } from 'react'
import { FirebaseContext } from '../FirebaseContextProvider'

const SkipVotingButton: FC = () => {
    const { forceAdvanceGame } = useContext(FirebaseContext)

    return (
        <button
            onClick={() => forceAdvanceGame()}
            type="button"
            className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        >
            Skip Round
        </button>
    )
}

export default SkipVotingButton
