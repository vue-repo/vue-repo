export const list = () => {
    return [
        {
            id: 1,
            name: 'first'
        },
        {
            id: 2,
            name: 'second'
        },
        {
            id: 3,
            name: 'third'
        }
    ]
}

export const add = () => {
    return {
        id: 4,
        name: 'fourth'
    }
}

export const edit = () => {
    return {
        id: 3,
        name: 'editedThird'
    }
}

export const editBatch = () => [
    edit,
    {
        id: 2,
        name: 'editedSecond'
    }
]

export const get = (id: number) => {
    return list().find(d => d.id === id)
}

export const newItem = () => {
    return {
        id: 5,
        name: 'newItem'
    }
}
