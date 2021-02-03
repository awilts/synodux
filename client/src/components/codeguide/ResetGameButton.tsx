import React, { FC, useContext } from 'react'
import { Button } from '@material-ui/core'
import { Word } from '../../types/Word'
import { CardColor } from '../../types/CardColor'
import { Player } from '../../types/Player'
import { Hint } from '../../types/Hint'
import { WordOwner } from '../../types/WordOwner'
import { each } from 'async'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import { ServerContext } from '../ServerContextProvider'

type Props = {
}

const ResetGameButton: FC<Props> = props => {
    const firestore = firebase.firestore()

    const { hints, players, wordOwners, words } = useContext(ServerContext)
    const addPlayer = (player: Player) => {
        firestore
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('players')
            .add(player)
    }
    const deletePlayer = (player: Player) => {
        if (player.id != null) {
            firestore
                .collection('lobbies')
                .doc('GeyDTo9SUstY3JhlofJj')
                .collection('players')
                .doc(player.id)
                .delete()
        }
    }

    function resetPlayers(players: Player[]) {
        players.forEach(player => {
            deletePlayer(player)
        })
        addPlayer({
            vote: '',
            name: 'Theo Türkis',
            color: 'teal',
            team: 'red',
        })
        addPlayer({
            vote: '',
            name: 'Bernd Brot',
            color: 'brown',
            team: 'red',
        })
        addPlayer({
            vote: '',
            name: 'Günther Grün',
            color: 'green',
            team: 'red',
        })
        addPlayer({
            vote: '',
            name: 'Viola Violett',
            color: 'violet',
            team: 'blue',
        })
        addPlayer({
            vote: '',
            name: 'Stefan Schwarz',
            color: 'black',
            team: 'blue',
        })
        addPlayer({
            vote: '',
            name: 'Olaf Orange',
            color: 'orange',
            team: 'blue',
        })
    }

    const addWord = (word: Word) => {
        firestore
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('words')
            .add(word)
            .then(docRef => {
                console.log('credted word with id: ' + docRef.id)
                addWordOwner(docRef.id)
            })
    }
    const deleteWord = (word: Word) => {
        if (word.id != null) {
            firestore
                .collection('lobbies')
                .doc('GeyDTo9SUstY3JhlofJj')
                .collection('words')
                .doc(word.id)
                .delete()
        }
    }

    function resetWords(words: Word[]) {
        words.forEach(word => {
            deleteWord(word)
        })
        addWord({ text: 'Kuh', boardId: '0', team: CardColor.red })
        addWord({ text: 'Pferd', boardId: '1', team: CardColor.blue })
        addWord({ text: 'Hund', boardId: '2', team: CardColor.unknown })
        addWord({ text: 'Katze', boardId: '3', team: CardColor.unknown })
        addWord({ text: 'Schwein', boardId: '4', team: CardColor.unknown })
        addWord({ text: 'Rind', boardId: '5', team: CardColor.unknown })
        addWord({ text: 'Eber', boardId: '6', team: CardColor.unknown })
        addWord({ text: 'Ferkel', boardId: '7', team: CardColor.unknown })
        addWord({ text: 'Huhn', boardId: '8', team: CardColor.unknown })
        addWord({ text: 'Ei', boardId: '9', team: CardColor.unknown })
        addWord({ text: 'Elephant', boardId: '10', team: CardColor.unknown })
        addWord({ text: 'Schaf', boardId: '11', team: CardColor.unknown })
        addWord({ text: 'Lamm', boardId: '12', team: CardColor.unknown })
        addWord({ text: 'Fohlen', boardId: '13', team: CardColor.unknown })
        addWord({ text: 'Ziege', boardId: '14', team: CardColor.unknown })
        addWord({ text: 'Hahn', boardId: '15', team: CardColor.unknown })
        addWord({ text: 'Küken', boardId: '16', team: CardColor.unknown })
        addWord({ text: 'Bauer', boardId: '17', team: CardColor.unknown })
        addWord({ text: 'Scheune', boardId: '18', team: CardColor.unknown })
        addWord({ text: 'Milch', boardId: '19', team: CardColor.unknown })
    }

    const addHint = (hint: Hint) => {
        firestore
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('hints')
            .add(hint)
    }
    const deleteHint = (hint: Hint) => {
        if (hint.id != null) {
            firestore
                .collection('lobbies')
                .doc('GeyDTo9SUstY3JhlofJj')
                .collection('hints')
                .doc(hint.id)
                .delete()
        }
    }

    function resetHints(hints: Hint[]) {
        hints.forEach(hint => {
            deleteHint(hint)
        })
        addHint({ position: '0', team: 'red', text: 'some little hint' })
        addHint({
            position: '0',
            team: 'blue',
            text: 'some hint of other team',
        })
    }

    function deleteWordOwner(wordOwner: WordOwner) {
        if (wordOwner.id != null) {
            firestore
                .collection('lobbies')
                .doc('GeyDTo9SUstY3JhlofJj')
                .collection('wordOwners')
                .doc(wordOwner.id)
                .delete()
        }
    }

    function addWordOwner(wordId: string) {
        const rnd = Math.floor(Math.random() * 2)
        let wordOwner
        if (rnd === 0) {
            wordOwner = {
                team: 'blue',
            }
        } else {
            wordOwner = {
                team: 'red',
            }
        }
        firestore
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('wordOwners')
            .doc(wordId)
            .set(wordOwner)
    }

    function resetWordOwners(wordOwners: WordOwner[]) {
        wordOwners.forEach(hint => {
            deleteWordOwner(hint)
        })
    }

    function resetCurrentTeam() {
        firestore
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .update({ currentTeam: '' })
    }

    function resetLobby() {
        firestore
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .set({ foo: 'bar' })
    }

    async function generateWords() {
        const conf = require('../../devlocal').conf
        const words: string[] = conf.words
        console.log(words)
        await firestore
            .collection('wordsets')
            .doc('defaultwordsetid')
            .set({ foo: 'bar' })
        const wordColl = firestore
            .collection('wordsets')
            .doc('defaultwordsetid')
            .collection('fooWords')
        console.log('start')
        await each(words, addNewWord)
        console.log('roflmao')
    }

    function addNewWord(word: string, callback: () => any) {
        firestore
            .collection('wordsets')
            .doc('defaultwordsetid')
            .collection('fooWords')
            .add({ word: word })
            .then(() => callback())
    }

    const resetGame = async () => {
        console.log('resetting game')
        await generateWords()
        resetLobby()
        resetWordOwners(JSON.parse(JSON.stringify(wordOwners)))
        resetPlayers(JSON.parse(JSON.stringify(players)))
        resetHints(JSON.parse(JSON.stringify(hints)))
        resetWords(JSON.parse(JSON.stringify(words)))
        resetCurrentTeam()

        const host: Player = {
            team: 'blue',
            vote: '',
            name: 'Alexander Wilts',
            color: 'grey',
            host: 'true',
            guide: 'true',
        }

        firestore
            .collection('lobbies')
            .doc('GeyDTo9SUstY3JhlofJj')
            .collection('players')
            .doc('OU4NoSgRUbPqLIUXgizOqWLFTd33')
            .set(host)
    }

    return (
        <Button onClick={resetGame} variant="contained" color="primary">
            Reset game
        </Button>
    )
}

export default ResetGameButton
