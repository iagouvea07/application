async function variables(){
    const response = await fetch('/home/dashboard', {headers: { 'Accept': 'application/json' }})
    const datapoint = await response.json()
    queries = [datapoint.resultado, datapoint.valor]
    return queries
}

variables().then(datapoint =>{
    const values = datapoint[1].map(data =>{
        return data.value
    })

    const month = datapoint[1].map(data =>{
        return data.date
    })

    const config = {
        type: 'bar',
        data: {
            labels: ['Jav', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 165, 0, 0.2)',
                    'rgba(255, 0, 255, 0.2)',
                    'rgba(255, 255, 0, 0.2)',
                    'rgba(230, 230, 250, 0.2)',
                    'rgba(139, 69, 19, 0.2)',
                    'rgba(60, 179, 113, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 165, 0, 0.2)',
                    'rgba(255, 0, 255, 0.2)',
                    'rgba(255, 255, 0, 0.2)',
                    'rgba(230, 230, 250, 0.2)',
                    'rgba(139, 69, 19, 0.2)',
                    'rgba(60, 179, 113, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Dividendos Mensais',
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

    var ctx = document.getElementById('myChart_dividends').getContext('2d');
    var myChart = new Chart(ctx, config);
})