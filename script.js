
  const filterBtn = document.querySelector(".filter-btn");
  const filterPanel = document.querySelector(".filter-panel");

  filterBtn.addEventListener("click", () => {
    filterPanel.classList.toggle("active");
  });

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function search() {
  let botaoPesquisa = document.querySelector("#pesquisar") //pega o botao pesquisar
  let dados = document.querySelectorAll(".unidade") //pega todas as unidades em uma lista

  botaoPesquisa.addEventListener("input", function () { //adiciona um evento de input(dispara quando o value dentro do botao muda)

  dados.forEach(dado => { //passa por todas as unidades, uma por uma, significa que dado, é 1 unidade

      let pesquisaMinusculo = removerAcentos(botaoPesquisa.value.toLowerCase()) //deixa todo o valor dentro da pesquisa em minusculo e remove acentos
      let dadosMinusculo = removerAcentos(dado.textContent.toLowerCase()) //deixa todo o texto das unidades em minusculo e remove acentos 
      console.log(`Buscando por "${pesquisaMinusculo}" dentro de "${dadosMinusculo}"`) //testando pra ver se ta rodando

     if (dadosMinusculo.includes(pesquisaMinusculo)) { //SE A UNIDADE CONTEM O VALOR QUE ESTÁ DENTRO DA PESQUISA, APARECE ou se no livro(dadosMinusculo) contém o que foi digitado em (pesquisaMinusculo)
      dado.style.display = "flex"
    }
    
    else { //SE NÃO CONTÉM SOME 
      dado.style.display = "none"
    }}
   
  )}
)}

function regiaoSetup() {
  let regioes = document.querySelectorAll("input[name='regiao']")

  regioes.forEach(regiao1 => {
    regiao1.addEventListener('change', regiao)
  })
}

regiaoSetup()
function regiao() {
    
  let regioes = document.querySelectorAll("input[name='regiao']")

  let regiaoSelecionada = ''

  let unidades = document.querySelectorAll(".unidade")

    regioes.forEach(regiao => {

      if(regiao.checked) {
        regiaoSelecionada = regiao.value
      }
    })
    

    unidades.forEach(unidade => {

      if (regiaoSelecionada == "todos") {
        unidade.style.display = "flex"
      }
      else if (unidade.classList.contains(regiaoSelecionada)) {
          unidade.style.display = "flex"
      }
      else {
        unidade.style.display = "none"
      }
    })
}




function bairroSetup() {
   let bairros1 = document.querySelectorAll("input[name='bairros']")

   bairros1.forEach(bairro => {
    bairro.addEventListener('change', bairros)
})}
  


bairroSetup() 
function bairros() {

  let bairros = document.querySelectorAll("input[name='bairros']")

  let bairroSelecionado = ''

  let unidades = document.querySelectorAll(".unidade")

    bairros.forEach(bairro => {

      if(bairro.checked) {
        bairroSelecionado = bairro.value
      }
    })
    

    unidades.forEach(unidade => {
      if (unidade.classList.contains(bairroSelecionado)) {
          unidade.style.display = "flex"
      }
      else {
        unidade.style.display = "none"
      }
    })
}

function regiaoBairroSetup() {
   let regioes = document.querySelectorAll("input[name='regiao']")

    regioes.forEach(regiao => {
      regiao.addEventListener('change', regiaoBairro)
    }
  )}

regiaoBairroSetup()
function regiaoBairro() {
  let regioes = document.querySelectorAll("input[name='regiao']")
  let regiaoSelecionada = ''

  regioes.forEach(regiao => {
    if(regiao.checked) {
      regiaoSelecionada = regiao.value
    }
  })

  const todosOsBairros = document.querySelectorAll(".opcao-bairro")

  todosOsBairros.forEach(containerDoBairro => {

    if (regiaoSelecionada === "todos") {
      containerDoBairro.style.display = "flex"
    }
    else if (containerDoBairro.dataset.regiao === regiaoSelecionada) {
      containerDoBairro.style.display = "flex"
    }
    else {
      containerDoBairro.style.display = "none"
    }
  })} 

function unidadeCaisSetup() {
 let tipoDeUnidade = document.querySelectorAll("input[name='unidades']")

  tipoDeUnidade.forEach(unidades => {
    unidades.addEventListener("change", unidadeCais)
  })
} 

unidadeCaisSetup()

  function unidadeCais() {
    let unidades = document.querySelectorAll(".unidade") //dataset-value 
    let tipoDeUnidade = document.querySelectorAll("input[name='unidades']") //value
    let tipoUnidadeSelecionado = ''

    tipoDeUnidade.forEach(Tipounidade => {
      if(Tipounidade.checked) {
        tipoUnidadeSelecionado = Tipounidade.value
      }

      console.log(tipoUnidadeSelecionado)
    })  

    unidades.forEach(unidadeIndividual => {

      let paragrafoInterno = unidadeIndividual.querySelector(".tipo-unidade")

      if (paragrafoInterno) { 

        let paragrafoValue = paragrafoInterno.dataset.value

      if (paragrafoValue == tipoUnidadeSelecionado) {

        unidadeIndividual.style.display = "flex"
      }
      else {
        unidadeIndividual.style.display = "none"
      }

      console.log(paragrafoValue)
    }})
  }
      
    




  //se a pessoa escolher central, nos bairros vai aparecer os bairros central, mas para acontecer isso precisa de DOM, se regiao for central, ele vai manipular a div que contém todos os bairros, e só vai mostrar os que tiver o valor central document.getelementbyid(divbairro), for each, if valor de regiao for igual a valor de bairro, os que nao tiverem some


  //se o valor de label for igual ao valor selecionado, aparece, se nao some


   

