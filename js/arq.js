let items = [];
let nextId = 1;

// Dados fakes, somente para demostração 
function inicializarExemplo() {
    items = [
        { id: nextId++, nome: 'Toner Preto', categoria: 'Toner', modelo: 'CF258A', cor: 'Preto', quantidade: 5, estoqueMinimo: 2, impressora: 'HP LaserJet Pro M404' },
        { id: nextId++, nome: 'Toner Ciano', categoria: 'Toner', modelo: 'TN-419C', cor: 'Ciano', quantidade: 3, estoqueMinimo: 1, impressora: 'Brother HL-L8360CDW' }
    ];
    renderizarTabela();
}


inicializarExemplo();

function renderizarTabela() {
    const tbody = document.getElementById('corpoTabela');
    tbody.innerHTML = '';
    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.categoria}</td>
            <td>${item.modelo}</td>
            <td>${item.cor}</td>
            <td>${item.quantidade}</td>
            <td>${item.estoqueMinimo}</td>
            <td>${item.impressora}</td>
            <td>
                <button onclick="alterarQuantidade(${item.id}, 1)">+1</button>
                <button onclick="alterarQuantidade(${item.id}, -1)">-1</button>
                <button onclick="definirQuantidade(${item.id})">Definir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function adicionarItem() {
    const nome = document.getElementById('nome').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const cor = document.getElementById('cor').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value) || 0;
    const estoqueMinimo = parseInt(document.getElementById('estoqueMinimo').value) || 0;
    const impressora = document.getElementById('impressora').value.trim();

    if (!nome) {
        alert('Nome é obrigatório');
        return;
    }

    items.push({
        id: nextId++,
        nome,
        categoria,
        modelo,
        cor,
        quantidade,
        estoqueMinimo,
        impressora
    });

    renderizarTabela();

    
    document.getElementById('nome').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('cor').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('estoqueMinimo').value = '';
    document.getElementById('impressora').value = '';
}

function alterarQuantidade(id, delta) {
    const item = items.find(i => i.id === id);
    if (item) {
        item.quantidade = Math.max(0, item.quantidade + delta);
        renderizarTabela();
    }
}

function definirQuantidade(id) {
    const item = items.find(i => i.id === id);
    if (item) {
        const nova = prompt('Nova quantidade:', item.quantidade);
        if (nova !== null) {
            const q = parseInt(nova);
            if (!isNaN(q) && q >= 0) {
                item.quantidade = q;
                renderizarTabela();
            } else {
                alert('Valor inválido');
            }
        }
    }
}