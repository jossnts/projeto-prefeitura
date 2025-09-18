
  const filterBtn = document.querySelector(".filter-btn");
  const filterPanel = document.querySelector(".filter-panel");

  filterBtn.addEventListener("click", () => {
    filterPanel.classList.toggle("active");
  });



function search() {
  let botaoPesquisa = document.querySelector("#pesquisar") //pega o botao pesquisar
  let dados = document.querySelectorAll(".unidade") //pega todas as unidades em uma lista

  botaoPesquisa.addEventListener("input", function () { //adiciona um evento de input(dispara quando o value dentro do botao muda)

  dados.forEach(dado => { //passa por todas as unidades, uma por uma, significa que dado, é 1 unidade

      let pesquisaMinusculo = botaoPesquisa.value.toLowerCase() //deixa todo o valor dentro da pesquisa em minusculo
      let dadosMinusculo = dado.textContent.toLowerCase() //deixa todo o texto das unidades em minusculo
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

  let bairros = document.querySelectorAll("input[name='bairros'])")

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
  let labelBairros= document.querySelectorAll("label:has(input[name='bairros'])")
  let regiaoSelecionada = ''

  regioes.forEach(regiao => {
    if(regiao.checked) {
      regiaoSelecionada = regiao.value
    }
  })

  labelBairros.forEach(bairroLabel => {
  const input = bairroLabel.querySelector("input[name='bairros']")

  if(input) {

    if (regiaoSelecionada === input.dataset.regiao) {
    bairroLabel.style.display = "flex"
  }
  else {
    bairroLabel.style.display = "none"
  }
} 
})
}



  //se a pessoa escolher central, nos bairros vai aparecer os bairros central, mas para acontecer isso precisa de DOM, se regiao for central, ele vai manipular a div que contém todos os bairros, e só vai mostrar os que tiver o valor central document.getelementbyid(divbairro), for each, if valor de regiao for igual a valor de bairro, os que nao tiverem some


  //se o valor de label for igual ao valor selecionado, aparece, se nao some


   

