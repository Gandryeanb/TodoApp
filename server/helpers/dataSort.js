const dataSort = (by,data) => {
    if (by === 'ASC') {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (data[i].dueDate < data[j].dueDate) {
                    let temp = data[i]
                    data[i] = data[j]
                    data[j] = temp
                }
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (data[i].dueDate > data[j].dueDate) {
                    let temp = data[i]
                    data[i] = data[j]
                    data[j] = temp
                }
            }
        }
    }
    return data
}

module.exports = dataSort