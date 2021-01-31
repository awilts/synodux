import React, { createContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'

export type Player = {
    id?: string
    name: string
    team: string
    color: string
    vote?: string
    host?: string
    guide?: string
}

export type PlayerListContext = {
    playerList: Player[]
    joinTeam: (player: Player, team: string) => void
}

export const PlayerListContext = createContext<PlayerListContext>({
    playerList: [],
    joinTeam: () => {},
})

export function PlayerListContextProvider({ children }) {
    const [playerList, setPlayerList] = useState<Player[]>([])

    useEffect(() => {
        firebase
            .firestore()
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('players')
            .onSnapshot(doc => {
                const players = doc.docs.map(doc => doc.data())
                console.log('received new playerlist data', players)
                setPlayerList(players as Player[])
            })
    }, [])

    function updatePlayer(player: Player) {
        setPlayerList([...playerList, player])
        firebase
            .firestore()
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('players')
            .doc(player.id)
            .update(player)
            .catch(err => console.log('BAD', err))
    }

    async function joinTeam(player: Player, team: string) {
        const updatedPlayer = { ...player, team }
        setPlayerList([...playerList, updatedPlayer])
        console.log(`joining team ${team}`)
        await firebase
            .functions()
            .httpsCallable('joinTeam')({
                team: team,
                lobbyId: 'GeyDTo9SUstY3JhlofJj',
            })
            .catch(err => console.log('BAD', err))
    }

    return (
        <PlayerListContext.Provider value={{ playerList, joinTeam }}>
            {children}
        </PlayerListContext.Provider>
    )
}
