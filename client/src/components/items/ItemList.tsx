import React, { FC } from 'react'
import { Item } from '../../types/Item'

type Props = {
    items: Item[]
}

const ItemList: FC<Props> = props => {
    const items = props.items
    const listItems =
        items && items.map(item => <li key={item.id}>{item.text}</li>)
    return <ul>{listItems}</ul>
}

export default ItemList
