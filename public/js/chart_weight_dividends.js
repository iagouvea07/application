async function variables(){
    const response = await fetch('/home/dashboard', {headers: { 'Accept': 'application/json' }})
    const datapoint = await response.json()
    queries = [datapoint.resultado, datapoint.valor]
    return queries
}

variables().then(datapoint =>{
    const tickers = datapoint[0].map(data =>{
        return data.ticker
    })

    const values = datapoint[0].map(data =>{
        return data.value
    })

    const config = {
        type: 'pie',
        data: {
            labels: tickers,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(0, 206, 209, 0.2)',
                    'rgba(218, 165, 32, 0.2)',
                    'rgba(50, 205, 50, 0.2)',
                    'rgba(106, 90, 205, 0.2)',
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(210, 105, 30, 0.2)',
                    'rgba(255, 255, 0, 0.2)',
                    'rgba(186, 85, 211, 0.2)',
                    'rgba(0, 128, 0, 0.2)',
                    'rgba(112, 128, 144, 0.2)',
                    'rgba(123, 104, 238, 0.2)',
                    'rgba(238, 130, 238, 0.2)'
                ],
                borderColor: [
                    'rgba(0, 206, 209, 1)',
                    'rgba(218, 165, 32, 1)',
                    'rgba(50, 205, 50, 1)',
                    'rgba(106, 90, 205, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(210, 105, 30, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(186, 85, 211, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(112, 128, 144, 1)',
                    'rgba(123, 104, 238, 1)',
                    'rgba(238, 130, 238, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                    display: true,
                    text: 'Dividendos por Fundo',
                    fontSize: 20
                },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            }
        }
        }
        var ctx = document.getElementById('myChart_weight_dividends').getContext('2d');
        var myChart = new Chart(ctx, config);
})

