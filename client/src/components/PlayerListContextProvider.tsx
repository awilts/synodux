import React, { createContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import { Player } from '../types/Player'

export type PlayerListContext = {
    playerList: Player[]
    joinTeam: (player: Player, team: string) => void
    player: Player
}

export const PlayerListContext = createContext<PlayerListContext>(
    {} as PlayerListContext
)

export function PlayerListContextProvider({ children }) {
    const [playerList, setPlayerList] = useState<Player[]>([])
    const [userId, setUserId] = useState<string>('')
    const [player, setPlayer] = useState<Player>({ name: '' })

    useEffect(() => {
        const curUser = firebase.auth().currentUser
        if (curUser) {
            setUserId(curUser.uid)
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid)
            }
        })
    }, [])

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

    useEffect(() => {
        if (userId && playerList.length > 0) {
            const playerCandidate = playerList.find(
                player => player.id === userId
            )
            if (playerCandidate) {
                setPlayer(playerCandidate)
            }
        }
    }, [userId, playerList])

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
        <PlayerListContext.Provider value={{ playerList, joinTeam, player }}>
            {children}
        </PlayerListContext.Provider>
    )
}
