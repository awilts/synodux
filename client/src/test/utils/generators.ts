import { Item } from '../../types/Item'

export const generateItem = (): Item => {
    return {
        id: 'mid',
        userId: 'uid',
        groupId: 'gid',
        text: 'testItem',
    }
}
