const ctx = document.getElementById('myChart').getContext('2d');
const cyber = [
  { area: 'Estágio', salario: [1200, 2000] },
  { area: 'Júnior', salario: [3500, 4500] },
  { area: 'Pleno', salario: [5500, 8000] },
  { area: 'Sênior', salario: [10000, 15000] },
  { area: 'Coordenador', salario: [14000, 18000] },
  { area: 'Gerente', salario: [15000, 22000] },
  { area: 'CISO', salario: [25000, 35000] },
];

let grafico;
let modoAtual = 'linha'; // linha ou barra
let indexAtual = 0;

// Função para criar ou recriar o gráfico
function criarGrafico(tipo, dados, labels, labelDoDataset, cores) {
  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: tipo,
    data: {
      labels: labels,
      datasets: [{
        label: labelDoDataset,
        data: dados,
        backgroundColor: cores,
        borderColor: '#6d28d9',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      color: '#ffffff',
      scales: {
        x: {
          ticks: {
            color: '#ffffff',
            font: {
              weight: 'bold'
            }
          },
          grid: {
            color: '#222'
          }
        },
        y: {
          ticks: {
            color: '#ffffff',
            font: {
              weight: 'bold'
            }
          },
          grid: {
            color: '#000000'
          }
        }
      },
      plugins: {
        tooltip: {
          titleColor: '#ffffff',
          bodyColor: '#b084f8',
          backgroundColor: '#111111',
          borderColor: '#6d28d9',
          borderWidth: 1,
          callbacks: {
            label: function (context) {
              if (modoAtual === 'linha') {
                const index = context.dataIndex;
                const item = cyber[index];
                return `Salário Máximo: R$ ${item.salario[1]}`;
              } else {
                const valor = context.raw;
                const label = context.label;
                return `${label}: R$ ${valor}`;
              }
            },
            title: function (tooltipItems) {
              if (modoAtual === 'linha') {
                const index = tooltipItems[0].dataIndex;
                const item = cyber[index];
                return `${item.area}\nSalário Mínimo: R$ ${item.salario[0]}`;
              } else {
                return `${cyber[indexAtual].area}`;
              }
            }
          }
        }
      }
    }
  });
}

// Gráfico inicial (linha)
const labels = cyber.map(item => item.area); // novo array
const maxSalarios = cyber.map(item => item.salario[1]);
criarGrafico('line', maxSalarios, labels, 'Salário Máximo', 'rgb(109, 40, 217)');


// Quando o usuário muda a área de atuação
document.getElementById('areasDaCiber').addEventListener('change', function () {
  const selectAtuacao = parseInt(this.value) - 1; // vai pegar o event do select como onchange

  if (selectAtuacao !== 'Text' && cyber[selectAtuacao]) {
    const faixa = cyber[selectAtuacao].salario;
    indexAtual = selectAtuacao;
    modoAtual = 'barra';

    criarGrafico(
      'bar',
      faixa,
      ['Salário Mínimo', 'Salário Máximo'],
      `Faixa Salarial - ${cyber[selectAtuacao].area}`,
      ['#483681', '#7d28d9']
    );
  }
});


function atualizarGrafico(comunidade) {

  const dash = document.getElementById('myChart1').getContext('2d');
  // const comunidade = [
  //   { poster: 'Hacker 1', media: 2, users: 3 },
  //   { poster: 'Hacker 2', media: 3, users: 3 },
  //   { poster: 'Hacker 3', media: 5, users: 3 },
  //   { poster: 'Hacker 4', media: 4, users: 3 },
  //   { poster: 'Hacker 5', media: 8, users: 3 },
  //   { poster: 'Hacker 6', media: 7, users: 3 },
  //   { poster: 'Hacker 7', media: 6, users: 3 },
  //   { poster: 'Hacker 8', media: 2, users: 3 }
  // ];

  // Novo grafico da page insight
  const labelsPoster = comunidade.map(item => item.poster);
  const media = comunidade.map(item => item.media);
  const quantosUsersAvaliaram = comunidade.map(item => item.users);
  
  grafico = new Chart(dash, {
    type: 'bar',
    data: {
      labels: labelsPoster,
      datasets: [{
        label: "Média de Avaliações",
        data: media,
        backgroundColor: '#483681',
        borderColor: '#6d28d9',
        borderRadius: 100,
        barThickness: 30,
      },
      {
        label: "Quantos Usuarios Avaliaram",
        data: quantosUsersAvaliaram,
        backgroundColor: '#cccc',
        borderColor: '#6d28d9',
        borderRadius: 10,
        barThickness: 30,
      }]
    },
    options: {
      responsive: true,
      color: '#ffffff',
      scales: {
        x: {
          ticks: {
            color: '#ffffff',
            font: {
              weight: 'bold',
              size: 14
            }
          },
          grid: {
            color: '#222'
          }
        },
        y: {
          ticks: {
            color: '#ffffff',
            font: {
              weight: 'bold',
              size: 14
            }
          },
          grid: {
            color: '#000000'
          }
        }
      },
      plugins: {
        tooltip: {
          titleColor: '#ffffff',
          bodyColor: '#b084f8',
          backgroundColor: '#111111',
          borderColor: '#6d28d9',
        }
      }
    }
  });
}