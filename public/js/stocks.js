
async function stocks(){
    const response = await fetch('/home/dashboard', {headers: { 'Accept': 'application/json' }})
    const datapoint = await response.json()

    const tickersArray = datapoint.nomes.map(obj => {
        return [obj.ticker]
    })

    let final = await getName(tickersArray)
    console.log(final)
}

async function getName(element){
    let value = []
    for(i = 0; i < 2; i++){
        stock = await fetch(`https://brapi.dev/api/quote/${element[i]}?range=1d&interval=1y&fundamental=true&dividends=true`, {headers: { 'Accept': 'application/json' }})
        .then(res => res.json())
        await stockPush(value, stock.results)
    }
    return value
}

async function stockPush(arr, data){
    const container = document.querySelector('#container')
    const div = document.createElement('div')
    div.textContent = data
    container.appendChild(div)
    arr.push(data)
    return arr
}



stocks()

