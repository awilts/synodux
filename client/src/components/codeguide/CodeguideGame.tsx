import React, { FC } from 'react'
import CodeguideBoard from './CodeguideBoard'
import ResetGameButton from './ResetGameButton'
import PlayerList from './PlayerList'
import SkipVotingButton from './SkipVotingButton'
import StartGameButton from './StartGameButton'

const CodeguideGame: FC = () => {
    return (
        <>
            {/* <Grid container spacing={2}> */}
            <div className="flex">
                <div className="flex-none w-64 m-2">
                    <PlayerList team={'blue'} />
                </div>
                <div className="flex-grow m-2">
                    <CodeguideBoard />
                </div>
                <div className="flex-none w-64 m-2">
                    <PlayerList team={'red'} />
                </div>
            </div>
            <div className="flex">
                <StartGameButton />
                <ResetGameButton />
                <SkipVotingButton />
            </div>
        </>
    )
}

export default CodeguideGame
