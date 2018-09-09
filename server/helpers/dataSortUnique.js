
const dataSortUnique = (data) => {

    let year = [data[0]]
    let counter = 0
    
    for (let i = 0; i < data.length; i++) {
        if (String(data[i].dueDate.getFullYear()) !== String(year[counter].dueDate.getFullYear())) {
            counter++
            year.push(data[i])
        } else if (String(data[i].dueDate.getMonth()) !== String(year[counter].dueDate.getMonth())) {
            counter++
            year.push(data[i])
        } else if (String(data[i].dueDate.getDate()) !== String(year[counter].dueDate.getDate())) {
            counter++
            year.push(data[i])
        }
    }
    
    let res = []
    
    for (let i = 0; i < year.length; i++) {
        let  tmp = []
        for (let j = 0; j < data.length; j++) {
            if (String(year[i].dueDate.getFullYear()) == String(data[j].dueDate.getFullYear()) && String(year[i].dueDate.getMonth()) == String(data[j].dueDate.getMonth()) && String(year[i].dueDate.getDate()) == String(data[j].dueDate.getDate())) {
                tmp.push(data[j])
            } 
        }
        res.push(tmp)
    }

    return res

}


module.exports = dataSortUnique