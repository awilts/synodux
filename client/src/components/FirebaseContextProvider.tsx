import React, { createContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import { Player } from '../types/Player'
import { Word } from '../types/Word'
import { Hint } from '../types/Hint'
import { WordOwner } from '../types/WordOwner'
import { Lobby } from '../types/Lobby'

export type FirebaseContext = {
    players: Player[]
    hints: Hint[]
    wordOwners: WordOwner[]
    words: Word[]
    thisPlayer: Player
    currentTeam: string
    lobby: Lobby
    joinTeam: (player: Player, team: string) => void
    voteForWord: (word: Word) => void
    startGame: () => void
    forceAdvanceGame: () => void
}

export const FirebaseContext = createContext<FirebaseContext>({} as FirebaseContext)


const conf = require('../devlocal').conf
const firebaseConfig = {
    apiKey: conf.apiKey,
    authDomain: conf.authDomain,
    projectId: conf.projectId,
}

firebase.initializeApp(firebaseConfig)

if (window.location.hostname === 'localhost') {
    firebase.firestore().settings({
        host: 'localhost:8080',
        ssl: false,
    })
    firebase.functions().useEmulator('localhost', 5001)
}

export function FirebaseContextProvider({ children }) {
    
    const [userId, setUserId] = useState<string>('')
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

    const [players, setPlayers] = useState<Player[]>([])
    useEffect(() => {
        firebase
            .firestore()
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('players')
            .onSnapshot(doc => {
                const players = doc.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                setPlayers(players as Player[])
            })
    }, [])

    const [lobby, setLobby] = useState<Lobby>({} as Lobby)
    useEffect(() => {
        firebase
            .firestore()
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .onSnapshot(doc => {
                const lobby = { ...doc.data(), id: doc.id }
                setLobby(lobby as Lobby)
            })
    }, [])

    const [hints, setHints] = useState<Hint[]>([])
    useEffect(() => {
        firebase
            .firestore()
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('hints')
            .onSnapshot(doc => {
                const hints = doc.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                setHints(hints as Hint[])
            })
    }, [])

    const [wordOwners, setWordOwners] = useState<WordOwner[]>([])
    useEffect(() => {
        firebase
            .firestore()
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('wordOwners')
            .onSnapshot(doc => {
                const wordOwners = doc.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                setWordOwners(wordOwners as WordOwner[])
            })
    }, [])

    const [words, setWords] = useState<Word[]>([])
    useEffect(() => {
        firebase
            .firestore()
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('words')
            .onSnapshot(doc => {
                const words = doc.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                setWords(words as Word[])
            })
    }, [])

    const [currentTeam, setCurrentTeam] = useState<string>('')
    useEffect(() => {
        firebase
            .firestore()
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .onSnapshot(doc => {
                setCurrentTeam(doc.data()?.currentTeam)
            })
    }, [])

    const [thisPlayer, setThisPlayer] = useState<Player>({ name: '' })
    useEffect(() => {
        if (userId && players.length > 0) {
            const playerCandidate = players.find(player => player.id === userId)
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

    async function voteForWord(word: Word) {
        console.log(`voting for card ${word}`)

        await firebase
            .functions()
            .httpsCallable('changeVote')({
                vote: word.id,
                lobbyId: 'GeyDTo9SUstY3JhlofJj',
            })
            .catch(err => console.log('BAD', err))
    }

    async function startGame() {
        console.log('starting game')

        await firebase
            .functions()
            .httpsCallable('startGame')({
                lobbyId: 'GeyDTo9SUstY3JhlofJj',
            })
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

    async function forceAdvanceGame() {
        await firebase
            .functions()
            .httpsCallable('forceAdvanceGame')({
                lobbyId: 'GeyDTo9SUstY3JhlofJj',
            })
            .catch(err => console.log('BAD', err))
    }

    return (
        <FirebaseContext.Provider
            value={{
                players,
                hints,
                thisPlayer,
                currentTeam,
                wordOwners,
                words,
                lobby,
                joinTeam,
                voteForWord,
                startGame,
                forceAdvanceGame,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )
}
