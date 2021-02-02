import React, { FC, useState } from 'react'
import { Item } from '../../types/Item'
import { useFirestore } from 'react-redux-firebase'

const CreateItemForm: FC = () => {
    const [newItemText, setNewItemText] = useState<string>('')

    const firestore = useFirestore()
    const addItemToDb = (item: Item) => {
        firestore
            .collection('items')
            .add(item)
            .then(docRef => {
                console.log(docRef)
            })
    }

    function handleCreateItem(event: any) {
        event.preventDefault()
        const item: Item = {
            groupId: 'gid',
            userId: 'uid',
            text: newItemText,
        }
        addItemToDb(item)
        setNewItemText('')
    }

    return (
        <form onSubmit={handleCreateItem}>
            <input
                type="text"
                value={newItemText}
                onChange={event => setNewItemText(event.target.value)}
            />
            <button>submit</button>
        </form>
    )
}

export default CreateItemForm
