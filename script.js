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
// LÓGICA PARA FILTRAR OS RESULTADOS (.unidade)
// (Esta parte já estava correta)
// =================================================================

function aplicarFiltros() {
    // 1. Pega os valores de todos os filtros de resultado
    const termoPesquisa = removerAcentos(document.querySelector("#pesquisar").value.toLowerCase());
    const regiaoChecada = document.querySelector("input[name='regiao']:checked");
    const bairroChecado = document.querySelector("input[name='bairros']:checked");
    const tipoUnidadeChecado = document.querySelector("input[name='unidades']:checked");

    const regiaoSelecionada = regiaoChecada ? regiaoChecada.value : "todos";
    const bairroSelecionado = bairroChecado ? bairroChecado.value : "todos";
    const tipoUnidadeSelecionado = tipoUnidadeChecado ? tipoUnidadeChecado.value : "todos";

    // 2. Passa por cada unidade e aplica as regras
    const todasAsUnidades = document.querySelectorAll(".unidade");

    //Inicia um contador para as unidades visíveis
    let unidadesVisiveis = 0;

    todasAsUnidades.forEach(unidade => {
        let mostrar = true;

        // Verificação da Pesquisa
        const textoDaUnidade = removerAcentos(unidade.textContent.toLowerCase());
        if (!textoDaUnidade.includes(termoPesquisa)) {
            mostrar = false;
        }

        // Verificação da Região
        if (regiaoSelecionada !== "todos" && !unidade.classList.contains(regiaoSelecionada)) {
            mostrar = false;
        }

        // Verificação do Bairro
        if (bairroSelecionado !== "todos" && !unidade.classList.contains(bairroSelecionado)) {
            mostrar = false;
        }

        // Verificação do Tipo de Unidade
        const paragrafoTipo = unidade.querySelector(".tipo-unidade");
        if (paragrafoTipo && tipoUnidadeSelecionado !== "todos") {
            if (paragrafoTipo.dataset.value !== tipoUnidadeSelecionado) {
                mostrar = false;
            }
        }

         if (mostrar) {
            unidade.style.display = "flex";
            unidadesVisiveis++; //  Incrementa o contador se a unidade for mostrada
        } else {
            unidade.style.display = "none";
        }
        
        // 3. Decisão Final
        unidade.style.display = mostrar ? "flex" : "none";
    });

     const mensagemUnidades = document.getElementById('mensagem-sem-unidades');
    if (unidadesVisiveis === 0) {
        mensagemUnidades.style.display = 'block'; // Ou 'flex' se preferir
    } else {
        mensagemUnidades.style.display = 'none';
    }
}


// =================================================================
// NOVO: LÓGICA UNIFICADA PARA ATUALIZAR A UI DOS FILTROS
// (Filtra as opções de bairro com base na região E tipo de unidade)
// =================================================================

function atualizarOpcoesDeBairro() {
    // 1. Pega os valores dos filtros que afetam a lista de bairros
    const regiaoChecada = document.querySelector("input[name='regiao']:checked");
    const tipoUnidadeChecado = document.querySelector("input[name='unidades']:checked");

    const regiaoSelecionada = regiaoChecada ? regiaoChecada.value : "todos";
    const tipoUnidadeSelecionado = tipoUnidadeChecado ? tipoUnidadeChecado.value : "todos";

    // 2. Passa por cada opção de bairro e aplica as regras
    const todasAsOpcoesBairro = document.querySelectorAll(".opcao-bairro");

     let bairrosVisiveis = 0;
    todasAsOpcoesBairro.forEach(opcaoBairro => {
        let mostrar = true;

        
        
        // Verifica a Região
        // A opção de bairro deve ser mostrada se a região for "todos" OU se o data-regiao da opção for igual à região selecionada.
        const correspondeRegiao = regiaoSelecionada === "todos" || opcaoBairro.dataset.regiao === regiaoSelecionada;

        // Verifica o Tipo de Unidade
        // A opção de bairro deve ser mostrada se o tipo for "todos" OU se o data-unidade da opção for igual ao tipo selecionado.
        const correspondeUnidade = tipoUnidadeSelecionado === "todos" || opcaoBairro.dataset.unidade === tipoUnidadeSelecionado;

        // A opção de bairro só aparece se corresponder A AMBAS as condições
        if (!correspondeRegiao || !correspondeUnidade) {
            mostrar = false;
        }


         if (mostrar) {
            opcaoBairro.style.display = 'flex';
            bairrosVisiveis++; // NOVO: Incrementa o contador
        } else {
            opcaoBairro.style.display = 'none';
        }

        // 3. Decisão Final
        opcaoBairro.style.display = mostrar ? "flex" : "none";
    });


      const mensagemBairros = document.getElementById('mensagem-sem-bairros');
    if (bairrosVisiveis === 0) {
        mensagemBairros.style.display = 'block';
    } else {
        mensagemBairros.style.display = 'none';
    }
}


// =================================================================
// CONFIGURAÇÃO CENTRALIZADA DOS EVENTOS
// =================================================================

function configurarTodosOsFiltros() {

    document.querySelector("input[name='regiao'][value='todos']").checked = true;
    document.querySelector("input[name='bairros'][value='todos']").checked = true;
    document.querySelector("input[name='unidades'][value='todos']").checked = true;

    document.getElementById('limpar-filtros-btn').addEventListener('click', limparFiltros);
    // Filtros que afetam APENAS os resultados
    document.querySelector("#pesquisar").addEventListener("input", aplicarFiltros);
    document.querySelectorAll("input[name='bairros']").forEach(el => el.addEventListener('change', aplicarFiltros));

    // Filtros que afetam os resultados E a UI de outros filtros
    document.querySelectorAll("input[name='regiao']").forEach(el => el.addEventListener('change', () => {
        aplicarFiltros(); // Atualiza os resultados
        atualizarOpcoesDeBairro(); // Atualiza a lista de bairros disponíveis
    }));

    document.querySelectorAll("input[name='unidades']").forEach(el => el.addEventListener('change', () => {
        aplicarFiltros(); // Atualiza os resultados
        atualizarOpcoesDeBairro(); // Atualiza a lista de bairros disponíveis
    }));
}

function limparFiltros() {
    document.querySelector("input[name='regiao'][value='todos']").checked = true;
    document.querySelector("input[name='bairros'][value='todos']").checked = true;
    document.querySelector("input[name='unidades'][value='todos']").checked = true;


    aplicarFiltros();
    atualizarOpcoesDeBairro();
}

// Inicia tudo quando a página carrega
configurarTodosOsFiltros();