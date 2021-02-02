import React, { FC, useContext, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { ServerContext } from '../ServerContextProvider'

const StartGameButton: FC = () => {

    const { currentTeam, startGame } = useContext(ServerContext)
    const [isGameRunning, setGameRunning] = useState<boolean>(false)

    useEffect(() => {
        console.log(currentTeam)
        setGameRunning(!!currentTeam)
    }, [currentTeam])


    if (isGameRunning) {
        return <></>
    }
    return (
        <Button onClick={() => startGame()} variant="contained" color="primary">
            start game
        </Button>
    )
}

export default StartGameButton
