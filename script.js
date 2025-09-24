
const filterBtn = document.querySelectorAll(".filter-btn");
const filterPanel = document.querySelector(".filter-panel");

filterBtn.forEach(filtro => {
    filtro.addEventListener("click", () => {
        filterPanel.classList.toggle("active");
    });
});

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// =================================================================
// INÍCIO DA LÓGICA DE FILTRO UNIFICADA
// =================================================================

function configurarFiltros() {
    // Adiciona o "escutador de eventos" para cada tipo de filtro
    document.querySelector("#pesquisar").addEventListener("input", aplicarFiltros);
    document.querySelectorAll("input[name='regiao']").forEach(el => el.addEventListener('change', aplicarFiltros));
    document.querySelectorAll("input[name='bairros']").forEach(el => el.addEventListener('change', aplicarFiltros));
    document.querySelectorAll("input[name='unidades']").forEach(el => el.addEventListener('change', aplicarFiltros));
}

function aplicarFiltros() {
    // 1. PEGA OS VALORES DE TODOS OS FILTROS ATIVOS
    
    // Filtro de Pesquisa (Texto)
    const termoPesquisa = removerAcentos(document.querySelector("#pesquisar").value.toLowerCase());

    // Filtro de Região
    let regiaoSelecionada = "todos"; // Valor padrão
    const regiaoChecada = document.querySelector("input[name='regiao']:checked");
    if (regiaoChecada) {
        regiaoSelecionada = regiaoChecada.value;
    }

    // Filtro de Bairro
    let bairroSelecionado = "todos"; // Valor padrão
    const bairroChecado = document.querySelector("input[name='bairros']:checked");
    if (bairroChecado) {
        bairroSelecionado = bairroChecado.value;
    }

    // Filtro de Tipo de Unidade
    let tipoUnidadeSelecionado = "todos"; // Valor padrão
    const tipoUnidadeChecado = document.querySelector("input[name='unidades']:checked");
    if (tipoUnidadeChecado) {
        tipoUnidadeSelecionado = tipoUnidadeChecado.value;
    }

    // 2. PASSA POR CADA UNIDADE E APLICA TODAS AS REGRAS
    const todasAsUnidades = document.querySelectorAll(".unidade");

    todasAsUnidades.forEach(unidade => {
        // Começamos assumindo que a unidade deve ser mostrada
        let mostrar = true; 

        // --- Verificação da Pesquisa ---
        const textoDaUnidade = removerAcentos(unidade.textContent.toLowerCase());
        if (!textoDaUnidade.includes(termoPesquisa)) {
            mostrar = false; // Se não corresponde à pesquisa, não mostra
        }

        // --- Verificação da Região ---
        // Só aplica o filtro se uma região específica (diferente de "todos") foi selecionada
        if (regiaoSelecionada !== "todos" && !unidade.classList.contains(regiaoSelecionada)) {
            mostrar = false; // Se a unidade não tem a classe da região, não mostra
        }

        // --- Verificação do Bairro ---
        if (bairroSelecionado !== "todos" && !unidade.classList.contains(bairroSelecionado)) {
            mostrar = false; // Se a unidade não tem a classe do bairro, não mostra
        }

        // --- Verificação do Tipo de Unidade ---
        const paragrafoTipo = unidade.querySelector(".tipo-unidade");
        if (paragrafoTipo && tipoUnidadeSelecionado !== "todos") {
            const tipoDaUnidade = paragrafoTipo.dataset.value;
            if (tipoDaUnidade !== tipoUnidadeSelecionado) {
                mostrar = false; // Se o data-value não for igual ao selecionado, não mostra
            }
        }
        
        // 3. DECISÃO FINAL: MOSTRAR OU ESCONDER A UNIDADE
        // A unidade só será exibida se a variável 'mostrar' continuou 'true' após passar por todos os 'if's
        if (mostrar) {
            unidade.style.display = "flex";
        } else {
            unidade.style.display = "none";
        }
    });
}

// Inicia a configuração dos filtros quando a página carrega
configurarFiltros();


// =================================================================
// FIM DA LÓGICA DE FILTRO UNIFICADA
// =================================================================


// Esta função é para a interface (filtrar as opções de bairro) e pode continuar existindo!
function regiaoBairroSetup() {
    let regioes = document.querySelectorAll("input[name='regiao']")
    regioes.forEach(regiao => {
        regiao.addEventListener('change', regiaoBairro)
    })
}

function regiaoBairro() {
    let regiaoSelecionada = document.querySelector("input[name='regiao']:checked").value;
    const todosOsBairros = document.querySelectorAll(".opcao-bairro");

    todosOsBairros.forEach(containerDoBairro => {
        if (regiaoSelecionada === "todos" || containerDoBairro.dataset.regiao === regiaoSelecionada) {
            containerDoBairro.style.display = "flex";
        } else {
            containerDoBairro.style.display = "none";
        }
    });
}


regiaoBairroSetup();