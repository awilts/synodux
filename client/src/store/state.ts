import { Word } from '../types/Word'
import { Player } from '../types/Player'
import { WordOwner } from '../types/WordOwner'
import { Hint } from '../types/Hint'

export const initialState: State = {
    firestore: {
        ordered: {
            lobby: {
                currentTeam: '',
            },
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
            words: Word[]
            players: Player[]
            hints: Hint[]
            wordOwners: WordOwner[]
        }
    }
}
