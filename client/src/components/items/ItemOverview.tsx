import React, { FC } from 'react'
import ItemList from './ItemList'
import CreateItemForm from './CreateItemForm'
import ClearItemsButton from './ClearItemsButton'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { State } from '../../store/state'

const ItemOverview: FC = () => {
    useFirestoreConnect('items')
    const items = useSelector((state: State) => state.firestore.ordered.items)

    return (
        <>
            <ItemList items={items} />
            <CreateItemForm />
            <ClearItemsButton />
        </>
    )
}

export default ItemOverview
