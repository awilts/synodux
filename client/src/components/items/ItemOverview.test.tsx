import React from 'react'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ItemOverview from './ItemOverview'
import { generateItem } from '../../test/utils/generators'
import { mocked } from 'ts-jest/utils'
import { useSelector } from 'react-redux'
import { Item } from '../../types/Item'

jest.mock('react-redux')
const mockedUseSelector = mocked(useSelector)

afterEach(() => {
    jest.resetAllMocks()
})

test('ItemOverview receives 1 item from backend', async () => {
    const item: Item = generateItem()
    mockedUseSelector.mockReturnValue([item])
    const itemOverview = render(<ItemOverview />)
    await waitFor(() =>
        expect(itemOverview.queryAllByRole('listitem')).toHaveLength(1)
    )
})

test('ItemOverview receives 0 items from backend', async () => {
    mockedUseSelector.mockReturnValue([])
    const itemOverview = render(<ItemOverview />)
    await waitFor(() =>
        expect(itemOverview.queryAllByRole('listitem')).toHaveLength(0)
    )
})
