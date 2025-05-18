const ctx = document.getElementById('myChart').getContext('2d');
const cyber =[
  { area: 'Estágio', salario: [1200, 2000] },
  { area: 'Júnior', salario: [3500, 4500] },
  { area: 'Pleno', salario: [5500, 8000] },
  { area: 'Sênior', salario: [10000, 15000] },
  { area: 'Coordenador', salario: [14000, 18000] },
  { area: 'Gerente', salario: [15000, 22000] },
  { area: 'CISO', salario: [25000, 35000], 'salario': [25000, 35000]},
  ];

  const grafico = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1 ano', '2 anos', '3 anos', '4 anos', '5 anos'],
    datasets: [{
      label: 'Faixa Salarial',
      data: [32, 323, 444],
      fill: false,
      backgroundColor: 'rgb(109, 40, 217)',
      borderColor: '#6d28d9',
      tension: 0,
      fontColor: '#ffffff',
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
  }
  });

  document.getElementById('areasDaCiber').addEventListener('change', function () {
    const selectAtuacao = parseInt(this.value);

    if (!selectAtuacao) {
    grafico.data.datasets[0].data = cyber[selectedIndex].salario;
    grafico.data.datasets[0].label = `Faixa Salarial - ${cyber[selectAtuacao].area}`;
    grafico.update();
  }
})