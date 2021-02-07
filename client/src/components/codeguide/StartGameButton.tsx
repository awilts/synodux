import { FC, useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../FirebaseContextProvider'

const StartGameButton: FC = () => {
    const { currentTeam, startGame } = useContext(FirebaseContext)
    const [isGameRunning, setGameRunning] = useState<boolean>(false)

    useEffect(() => {
        console.log(currentTeam)
        setGameRunning(!!currentTeam)
    }, [currentTeam])

    if (isGameRunning) {
        return <></>
    }
    return (
        <button
            onClick={() => startGame()}
            type="button"
            className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
            Start Game
        </button>
    )
}

export default StartGameButton
