import { Item } from '../types/Item'
import { Word } from '../types/Word'
import { Player } from '../types/Player'
import { WordOwner } from '../types/WordOwner'
import { Hint } from '../types/Hint'
import { FirebaseReducer } from 'react-redux-firebase'

export const initialState: State = {
    firestore: {
        ordered: {
            lobby: {
                currentTeam: '',
            },
            items: [],
            words: [],
            players: [],
            wordOwners: [],
            hints: [],
        },
    },
}

export type State = {
    firestore: {
        ordered: {
            lobby: {
                currentTeam: string
            }
            items: Item[]
            words: Word[]
            players: Player[]
            hints: Hint[]
            wordOwners: WordOwner[]
        }
    }
    firebase?: FirebaseReducer.Reducer
}
