import React, { createContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import { Player } from '../types/Player'

export type PlayerListContext = {
    players: Player[]
    joinTeam: (player: Player, team: string) => void
    thisPlayer: Player
}

export const PlayerListContext = createContext<PlayerListContext>(
    {} as PlayerListContext
)

export function PlayerListContextProvider({ children }) {
    const [players, setPlayers] = useState<Player[]>([])
    const [userId, setUserId] = useState<string>('')
    const [thisPlayer, setThisPlayer] = useState<Player>({ name: '' })

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
                const players = doc.docs.map(doc => {
                    return {...doc.data(), id: doc.id}
                })
                setPlayers(players as Player[])
            })
    }, [])

    useEffect(() => {
        if (userId && players.length > 0) {
            const playerCandidate = players.find(
                player => player.id === userId
            )
            if (playerCandidate) {
                setThisPlayer(playerCandidate)
            }
        }
    }, [userId, players])

    function updatePlayer(player: Player) {
        setPlayers([...players, player])
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
        setPlayers([...players, updatedPlayer])
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
        <PlayerListContext.Provider value={{ players: players, joinTeam, thisPlayer: thisPlayer }}>
            {children}
        </PlayerListContext.Provider>
    )
}
