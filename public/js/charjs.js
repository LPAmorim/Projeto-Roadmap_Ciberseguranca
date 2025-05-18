const ctx = document.getElementById('myChart');
const cyber =
  [{
    'area': [1200, 2000]
  }]

const grafico1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1 ano, 2 anos, 3 anos, 4 anos 5 anos'],
    datasets: [{
      label: 'Faixa Salarial',
      data: [32, 323, 444],
      fill: true,
      backgroundColor:'rgb(109, 40, 217)',
      borderColor: '#6d28d9',
      tension: 0.3,
      fontColor: '#ffffff' ,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      annotation: {
        annotations: {
          maxLine: {
            type: 'line',
            yMin: 1500,
            yMax: 1500,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: 'Lux Máximo',
              enabled: true,
              position: 'end'
            }
          },
          minLine: {
            type: 'line',
            yMin: 800,
            yMax: 800,
            borderColor: '',
            borderWidth: 2,
            label: {
              content: 'Lux Mínimo',
              enabled: true,
              position: 'start'
            }
          }
        }
      }
    }
  }
});

new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Faixa Salários',
      data: [],
      borderWidth: 2
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});