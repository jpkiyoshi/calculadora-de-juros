// LISTEN FOR SUBMIT
document.getElementById('loan-form').addEventListener('submit', function(e){
  // HIDE RESULTS
  document.getElementById('results').style.display = 'none';

  // SHOW LOADER
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// CALCULATE RESULTS
function calculateResults() {
  console.log('test0');
  // UI VARIABLES
  const amount = document.getElementById('amount');
  const juros = document.getElementById('juros');
  const anos = document.getElementById('anos');
  const pagamentoMensal = document.getElementById('pagamento-mensal');
  const pagamentoTotal = document.getElementById('pagamento-total');
  const jurosTotais = document.getElementById('juros-totais');

  const principal = parseFloat(amount.value);
  const jurosCalculado = parseFloat(juros.value) / 100 / 12;
  const pagamentoCalculado = parseFloat(anos.value) * 12;

  // COMPUTE MONTHLY PAYMENTS
  const x = Math.pow(1 + jurosCalculado, pagamentoCalculado);
  const mensal = (principal * x * jurosCalculado) / (x-1);

  if(isFinite(mensal)) {
    pagamentoMensal.value = mensal.toFixed(2);
    pagamentoTotal.value = (mensal * pagamentoCalculado).toFixed(2);
    jurosTotais.value = ((mensal * pagamentoCalculado) - principal).toFixed(2);

    //SHOW RESULTS
    document.getElementById('results').style.display = 'block';

    // HIDE LOADER
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Por favor, verifique os valores digitados');
  }

}

// SHOW ERROR
function showError(error) {
  // HIDE RESULTS
  document.getElementById('results').style.display = 'none';

  // HIDE LOADER
  document.getElementById('loading').style.display = 'none';

  // CREATE A DIV
  const errorDiv = document.createElement('div');

  // GET ELEMENTS
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // ADD CLASS
  errorDiv.className = 'alert alert-danger';

  // CREATE TEXT NODE AND APPEND TO DIV
  errorDiv.appendChild(document.createTextNode(error));

  // INSERT ERROR ABOVE HEADING
  card.insertBefore(errorDiv, heading); // esse método pega o parent element e insere o conteúdo que voce quer colocar antes do elemento child do parent. (nesse caso, inserindo a div (1º argumento) antes da heading (2º argumento))

  // CLEAR ERROR AFTER 3 SECONDS
  setTimeout(clearError, 3000); // executa a função passada no primeiro parâmetro depois de 3000 milisegundos (3 segundos)
}

// CLEAR ERROR 
function clearError() {
  document.querySelector('.alert').remove();
}