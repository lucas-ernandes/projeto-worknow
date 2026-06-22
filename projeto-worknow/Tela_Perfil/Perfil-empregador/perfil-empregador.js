/* ═══════════════════════════════════════════
   MODO VISUALIZAÇÃO / EDIÇÃO
═══════════════════════════════════════════ */
let modoEdicao = false;
let dadosSnapshot = {};

function ativarEdicao() {
    modoEdicao = true;
    dadosSnapshot = capturarDados();

    document.querySelectorAll('.campo-view').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.campo-editavel').forEach(el => el.style.display = '');

    document.getElementById('btn-editar').style.display = 'none';
    document.getElementById('btn-salvar-topo').style.display = '';
    document.getElementById('btn-cancelar-topo').style.display = '';

    document.querySelectorAll('.vaga-acoes').forEach(el => el.style.display = '');

    atualizarSubtitulos(true);
}

function cancelarEdicao() {
    restaurarDados(dadosSnapshot);
    voltarModoView();
}

function voltarModoView() {
    modoEdicao = false;

    document.querySelectorAll('.campo-editavel').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.campo-view').forEach(el => el.style.display = '');

    document.getElementById('btn-editar').style.display = '';
    document.getElementById('btn-salvar-topo').style.display = 'none';
    document.getElementById('btn-cancelar-topo').style.display = 'none';

    document.querySelectorAll('.vaga-acoes').forEach(el => el.style.display = 'none');

    atualizarSubtitulos(false);
    atualizarViews();
    calcularCompletude();
}

function atualizarSubtitulos(editando) {
    const sd = document.getElementById('subtitulo-dados');
    const sc = document.getElementById('subtitulo-contato');
    if (sd) sd.textContent = editando ? 'Edite suas informações abaixo.' : 'Visualizando seu perfil público.';
    if (sc) sc.textContent = editando ? 'Edite suas informações de contato.' : 'Visualizando suas informações de contato.';
}

function atualizarViews() {
    const set = (viewId, val) => {
        const el = document.getElementById(viewId);
        if (!el) return;
        el.textContent = val || '—';
    };

    set('view-nome', document.getElementById('campo-nome')?.value);
    set('view-ramo', document.getElementById('campo-ramo')?.value);
    set('view-cnpj', document.getElementById('campo-cnpj')?.value);
    set('view-porte', document.getElementById('campo-porte')?.value);
    set('view-bio', document.getElementById('campo-bio')?.value);
    set('view-cidade', document.getElementById('campo-cidade')?.value);
    set('view-modalidade', document.getElementById('campo-modalidade')?.value);
    set('view-email', document.getElementById('campo-email')?.value);
    set('view-telefone', document.getElementById('campo-telefone')?.value);
    set('view-site', document.getElementById('campo-site')?.value);
    set('view-linkedin', document.getElementById('campo-linkedin')?.value);

    // nome e inicial na sidebar
    const nome = document.getElementById('campo-nome')?.value.trim();
    document.getElementById('perfil-nome-exibido').textContent = nome || 'Seu nome completo';
    if (nome) {
        const inicial = nome.charAt(0).toUpperCase();
        document.getElementById('avatar-letra').textContent = inicial;
        document.getElementById('avatar-inicial').textContent = inicial;
    }
}

function capturarDados() {
    const g = id => document.getElementById(id)?.value || '';
    return {
        nome: g('campo-nome'), ramo: g('campo-ramo'), cnpj: g('campo-cnpj'),
        porte: g('campo-porte'), bio: g('campo-bio'), cidade: g('campo-cidade'),
        modalidade: g('campo-modalidade'), email: g('campo-email'),
        telefone: g('campo-telefone'), site: g('campo-site'), linkedin: g('campo-linkedin'),
    };
}

function restaurarDados(snap) {
    if (!snap) return;
    const s = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    s('campo-nome', snap.nome); s('campo-ramo', snap.ramo); s('campo-cnpj', snap.cnpj);
    s('campo-porte', snap.porte); s('campo-bio', snap.bio); s('campo-cidade', snap.cidade);
    s('campo-modalidade', snap.modalidade); s('campo-email', snap.email);
    s('campo-telefone', snap.telefone); s('campo-site', snap.site); s('campo-linkedin', snap.linkedin);
}


/* ═══════════════════════════════════════════
   DROPDOWN AVATAR
═══════════════════════════════════════════ */
function toggleMenuPerfil() {
    document.getElementById('dropdown-perfil').classList.toggle('aberto');
    document.getElementById('dropdown-notif')?.classList.remove('aberto');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.avatar-wrapper'))
        document.getElementById('dropdown-perfil')?.classList.remove('aberto');
    if (!e.target.closest('.notif-wrapper'))
        document.getElementById('dropdown-notif')?.classList.remove('aberto');
});


/* ═══════════════════════════════════════════
   NOTIFICAÇÕES
═══════════════════════════════════════════ */
const notificacoes = [
    { icone: '👤', texto: 'Um profissional se candidatou à sua vaga.', tempo: 'Agora há pouco', lida: false },
    { icone: '⭐', texto: 'Seu perfil foi destacado nas buscas esta semana.', tempo: '1h atrás', lida: false },
    { icone: '✅', texto: 'Cadastro aprovado na plataforma.', tempo: 'Ontem', lida: true },
];

function toggleNotificacoes() {
    document.getElementById('dropdown-notif').classList.toggle('aberto');
    document.getElementById('dropdown-perfil')?.classList.remove('aberto');
}
function marcarTodasLidas() { notificacoes.forEach(n => n.lida = true); renderNotificacoes(); atualizarBadge(); }
function renderNotificacoes() {
    const lista = document.getElementById('notif-lista');
    if (!lista) return;
    lista.innerHTML = notificacoes.map((n, i) => `
        <div class="notif-item ${n.lida ? 'lida' : ''}" onclick="lerNotificacao(${i})">
            <span class="notif-item-icone">${n.icone}</span>
            <div class="notif-item-info"><p>${n.texto}</p><span>${n.tempo}</span></div>
            ${!n.lida ? '<div class="notif-dot"></div>' : ''}
        </div>`).join('');
}
function lerNotificacao(idx) { notificacoes[idx].lida = true; renderNotificacoes(); atualizarBadge(); }
function atualizarBadge() {
    const n = notificacoes.filter(n => !n.lida).length;
    const b = document.getElementById('notif-badge');
    if (b) { b.textContent = n; b.style.display = n > 0 ? 'flex' : 'none'; }
}


/* ═══════════════════════════════════════════
   NAVEGAÇÃO POR ABAS
═══════════════════════════════════════════ */
function irAba(nome) {
    document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
    document.querySelectorAll('.perfil-nav-btn').forEach(b => b.classList.remove('ativo'));
    document.getElementById('aba-' + nome).classList.add('ativa');
    document.querySelector(`.perfil-nav-btn[onclick="irAba('${nome}')"]`)?.classList.add('ativo');
}


/* ═══════════════════════════════════════════
   FOTO / LOGO
═══════════════════════════════════════════ */
document.getElementById('upload-avatar').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('avatar-preview');
        img.src = e.target.result; img.style.display = 'block';
        document.getElementById('avatar-letra').style.display = 'none';
        const headerImg = document.getElementById('avatar-header-img');
        if (headerImg) { headerImg.src = e.target.result; headerImg.style.display = 'block'; document.getElementById('avatar-inicial').style.display = 'none'; }
    };
    reader.readAsDataURL(file);
});


/* ═══════════════════════════════════════════
   NOME EM TEMPO REAL
═══════════════════════════════════════════ */
function atualizarNomeExibido(val) {
    const nome = val.trim() || 'Seu nome completo';
    document.getElementById('perfil-nome-exibido').textContent = nome;
    const inicial = nome.charAt(0).toUpperCase();
    document.getElementById('avatar-inicial').textContent = inicial;
    document.getElementById('avatar-letra').textContent = inicial;
    calcularCompletude();
}


/* ═══════════════════════════════════════════
   CONTADORES
═══════════════════════════════════════════ */
document.getElementById('campo-bio').addEventListener('input', function () {
    document.getElementById('bio-count').textContent = this.value.length;
    calcularCompletude();
});
document.getElementById('vaga-descricao').addEventListener('input', function () {
    document.getElementById('desc-count').textContent = this.value.length;
});


/* ═══════════════════════════════════════════
   MÁSCARAS
═══════════════════════════════════════════ */
document.getElementById('campo-cnpj').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 14);
    if (v.length > 12) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    else if (v.length > 8) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
    else if (v.length > 5) v = v.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,3})/, '$1.$2');
    this.value = v;
});

document.getElementById('campo-telefone').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    else if (v.length > 0) v = '(' + v;
    this.value = v;
});


/* ═══════════════════════════════════════════
   TAGS DE HABILIDADES DA VAGA
═══════════════════════════════════════════ */
const tagsVaga = [];

function adicionarTagVaga(e) {
    if (e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();
    const input = document.getElementById('tag-vaga-input');
    const valor = input.value.trim().replace(/,$/, '');
    if (!valor || tagsVaga.includes(valor) || tagsVaga.length >= 10) return;
    tagsVaga.push(valor);
    renderTagsVaga();
    input.value = '';
}
function removerTagVaga(idx) { tagsVaga.splice(idx, 1); renderTagsVaga(); }
function renderTagsVaga() {
    document.getElementById('tags-vaga-lista').innerHTML = tagsVaga.map((t, i) => `
        <span class="tag">${t}<button onclick="removerTagVaga(${i})">&times;</button></span>`).join('');
}
document.querySelector('.tags-input-wrapper').addEventListener('click', () => {
    document.getElementById('tag-vaga-input').focus();
});


/* ═══════════════════════════════════════════
   VAGAS PUBLICADAS
═══════════════════════════════════════════ */
const vagas = [];

function publicarVaga() {
    // Limpa mensagens de erro anteriores
    document.getElementById('erro-orcamento').textContent = '';
    if (document.getElementById('erro-prazo')) document.getElementById('erro-prazo').textContent = '';

    // Captura dos valores
    const titulo = document.getElementById('vaga-titulo').value.trim();
    const area = document.getElementById('vaga-area').value;
    const tipo = document.getElementById('vaga-tipo').value;
    const descricao = document.getElementById('vaga-descricao').value.trim();
    const orcamentoRaw = document.getElementById('vaga-orcamento').value.trim();
    const prazo = document.getElementById('vaga-prazo').value.trim();
    const modalidade = document.getElementById('vaga-modalidade').value;
    const nivel = document.getElementById('vaga-nivel').value;
    const local = document.getElementById('vaga-local').value.trim();
    const qtd = document.getElementById('vaga-quantidade').value;
    const beneficios = document.getElementById('vaga-beneficios').value.trim();

    // Validações
    let temErro = false;

    if (!titulo || !descricao) {
        mostrarToast('⚠ Título e Descrição são campos obrigatórios.');
        return;
    }

    const valorOrcamento = parseFloat(orcamentoRaw);
    if (!orcamentoRaw) {
        document.getElementById('erro-orcamento').textContent = 'O orçamento proposto é obrigatório.';
        temErro = true;
    } else if (isNaN(valorOrcamento) || valorOrcamento <= 0) {
        document.getElementById('erro-orcamento').textContent = 'O orçamento deve ser um valor maior que zero.';
        temErro = true;
    }

    if (tagsVaga.length === 0) {
        mostrarToast('⚠ Adicione pelo menos uma competência exigida.');
        temErro = true;
    }

    if (temErro) return;

    // Formatação de moeda
    const orcamentoFormatado = valorOrcamento.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const agora = new Date();
    const dataHoraPublicacao = agora.toLocaleDateString('pt-BR') + ' às ' +
        agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const idEmpregadorLogado = 42;

    // Salvando a vaga
    vagas.push({
        id: Date.now(),
        empregadorId: idEmpregadorLogado,
        titulo,
        area,
        tipo,
        descricao,
        orcamento: orcamentoFormatado,
        prazo,
        modalidade,
        nivel,
        local,
        qtd: qtd || '1',
        beneficios,
        habilidades: [...tagsVaga],
        status: 'Aberta',
        data: dataHoraPublicacao,
        candidatos: 0,
    });

    renderVagas();
    atualizarStatVagas();
    limparFormVaga();
    irAba('vagas');
    mostrarToast('🚀 Vaga publicada com sucesso!');
}

function atualizarStatVagas() {
    const stat = document.getElementById('stat-vagas');
    if (stat) {
        stat.textContent = vagas.length;
    }
}


/* ═══════════════════════════════════════════
   BARRA DE COMPLETUDE
═══════════════════════════════════════════ */
function calcularCompletude() {
    const checks = [
        !!document.getElementById('campo-nome').value.trim(),
        !!document.getElementById('campo-ramo').value,
        !!document.getElementById('campo-bio').value.trim(),
        !!document.getElementById('campo-cidade').value.trim(),
        !!document.getElementById('campo-email').value.trim(),
        vagas.length > 0,
    ];
    const pct = Math.round((checks.filter(Boolean).length / checks.length) * 100);
    document.getElementById('pct-completude').textContent = pct + '%';
    document.getElementById('barra-fill').style.width = pct + '%';

    const dicas = [
        [!checks[0], 'Adicione seu nome.'],
        [!checks[1], 'Selecione o ramo de atuação.'],
        [!checks[2], 'Escreva sobre você.'],
        [!checks[3], 'Informe a cidade.'],
        [!checks[4], 'Adicione um e-mail de contato.'],
        [!checks[5], 'Publique sua primeira vaga.'],
    ];
    const proxima = dicas.find(([falta]) => falta);
    document.getElementById('completude-dica').textContent = proxima
        ? '👉 ' + proxima[1]
        : '🎉 Perfil completo! Você aparece nas buscas.';
}

['campo-nome', 'campo-ramo', 'campo-bio', 'campo-cidade', 'campo-email'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', calcularCompletude);
        if (el.tagName === 'SELECT') el.addEventListener('change', calcularCompletude);
    }
});


/* ═══════════════════════════════════════════
   SALVAR PERFIL
═══════════════════════════════════════════ */
function salvarPerfil() {
    voltarModoView();
    mostrarToast('✓ Perfil salvo com sucesso!');
}


/* ═══════════════════════════════════════════
   RENDERIZAR VAGAS
═══════════════════════════════════════════ */
function renderVagas() {
    const lista = document.getElementById('lista-vagas');
    if (!lista) return;

    if (vagas.length === 0) {
        lista.innerHTML = `
            <div class="vagas-empty">
                <span>📭</span>
                <p>Você ainda não publicou nenhuma vaga.</p>
                <button onclick="irAba('publicar')">Publicar primeira vaga</button>
            </div>`;
        return;
    }

    lista.innerHTML = vagas.map(v => `
        <div class="vaga-card" style="position: relative;">
            
            <!-- ⬇️ BOTÃO DE EXCLUSÃO REPOSICIONADO E DESTACADO -->
            <div class="vaga-acoes campo-editavel" style="display: ${modoEdicao ? 'block' : 'none'}; position: absolute; top: 15px; right: 15px; z-index: 10;">
                <button onclick="excluirVaga(${v.id})" 
                        style="background: #fdf2f2; color: #e74c3c; border: 1px solid #fde2e2; border-radius: 5px; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: all 0.2s;" 
                        title="Excluir Vaga"
                        onmouseover="this.style.background='#fadbd8'" 
                        onmouseout="this.style.background='#fdf2f2'">❌</button>
            </div>

            <div class="vaga-card-header" style="padding-right: 40px;">
                <h3>${v.titulo}</h3>
                <span class="vaga-status status-aberta">${v.status}</span>
            </div>
            
            <p class="vaga-area"><strong>Área:</strong> ${v.area} | <strong>Tipo:</strong> ${v.tipo}</p>
            <p class="vaga-desc">${v.descricao}</p>
            
            <div class="vaga-tags">
                ${v.habilidades.map(h => `<span class="vaga-tag-item">${h}</span>`).join('')}
            </div>
            
            <div class="vaga-card-footer">
                <span>💰 ${v.orcamento}</span>
                <span>📅 ${v.prazo}</span>
            </div>
            <small class="vaga-data">Publicada em ${v.data}</small>
        </div>
    `).join('');
}

/* ═══════════════════════════════════════════
   AUXILIARES (LIMPAR E FILTRAR)
═══════════════════════════════════════════ */
function limparFormVaga() {
    document.getElementById('vaga-titulo').value = '';
    document.getElementById('vaga-descricao').value = '';
    document.getElementById('vaga-orcamento').value = '';
    document.getElementById('vaga-prazo').value = '';
    document.getElementById('vaga-local').value = '';
    document.getElementById('vaga-quantidade').value = '';
    document.getElementById('vaga-beneficios').value = '';

    document.getElementById('vaga-area').selectedIndex = 0;
    document.getElementById('vaga-tipo').selectedIndex = 0;
    document.getElementById('vaga-modalidade').selectedIndex = 0;
    document.getElementById('vaga-nivel').selectedIndex = 0;

    tagsVaga.length = 0;
    renderTagsVaga();

    const descCount = document.getElementById('desc-count');
    if (descCount) descCount.textContent = '0';
}

function filtrarVagas(valor) {
    const termo = valor.toLowerCase().trim();
    const cards = document.querySelectorAll('.vaga-card');

    vagas.forEach((vaga, index) => {
        const card = cards[index];
        if (!card) return;

        const corresponde = vaga.titulo.toLowerCase().includes(termo) ||
            vaga.descricao.toLowerCase().includes(termo);

        card.style.display = corresponde ? '' : 'none';
    });
}

/* ═══════════════════════════════════════════
   apagar vaga
═══════════════════════════════════════════ */
function excluirVaga(id) {
    // Confirmação rápida de segurança para evitar exclusões por engano
    if (!confirm('Tem certeza de que deseja excluir permanentemente esta vaga publicada?')) {
        return;
    }

    const index = vagas.findIndex(v => v.id === id);
    if (index !== -1) {
        vagas.splice(index, 1); // Remove do array oficial
        
        // Atualiza tudo no seu sistema instantaneamente
        renderVagas();
        atualizarStatVagas();
        calcularCompletude();

        if (typeof mostrarToast === 'function') {
            mostrarToast('🗑️ Vaga removida com sucesso.');
        }
    }
}

/* ═══════════════════════════════════════════
   GERENCIAMENTO DE RASCUNHOS
═══════════════════════════════════════════ */
const rascunhosVagas = [];

function salvarRascunho() {
    const titulo = document.getElementById('vaga-titulo').value;

    // Validação super simples: pelo menos o título precisa estar preenchido para salvar
    if (!titulo || titulo.trim() === '') {
        const erroTitulo = document.getElementById('erro-titulo');
        if (erroTitulo) {
            erroTitulo.textContent = 'Dê pelo menos um título para salvar seu rascunho.';
            erroTitulo.style.display = 'block';
        }
        document.getElementById('vaga-titulo').focus();
        return;
    }

    // Captura os dados do formulário (mesmo que estejam parcialmente vazios)
    const novoRascunho = {
        id: Date.now(),
        titulo: titulo,
        descricao: document.getElementById('vaga-descricao').value,
        orcamento: document.getElementById('vaga-orcamento').value,
        prazo: document.getElementById('vaga-prazo').value,
        local: document.getElementById('vaga-local').value,
        quantidade: document.getElementById('vaga-quantidade').value,
        beneficios: document.getElementById('vaga-beneficios').value,
        area: document.getElementById('vaga-area').value,
        tipo: document.getElementById('vaga-tipo').value,
        modalidade: document.getElementById('vaga-modalidade').value,
        nivel: document.getElementById('vaga-nivel').value,
        tags: [...tagsVaga],
        dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    // Adiciona na nossa lista temporária de rascunhos
    rascunhosVagas.push(novoRascunho);

    // Limpa o formulário usando a função que você já tem criada!
    limparFormVaga();

    // Remove qualquer aviso de erro de validação antigo que tenha ficado na tela
    document.querySelectorAll('.campo-erro').forEach(el => el.style.display = 'none');

    // Usa a sua própria função de Toast para avisar o usuário
    if (typeof mostrarToast === 'function') {
        mostrarToast('✓ Rascunho guardado com sucesso!');
    } else {
        alert('✓ Rascunho guardado com sucesso!');
    }

    // Atualiza a listagem visual dos rascunhos
    renderizarRascunhos();

    // Redireciona o empregador para a nova aba de rascunhos para ele ver o card lá!
    if (typeof irAba === 'function') {
        irAba('rascunhos');
    }
}

function renderizarRascunhos() {
    const lista = document.getElementById('lista-rascunhos');
    const txtVazio = document.getElementById('rascunhos-vazio');

    if (!lista) return;

    if (rascunhosVagas.length === 0) {
        lista.innerHTML = '';
        if (txtVazio) txtVazio.style.display = 'block';
        return;
    }

    if (txtVazio) txtVazio.style.display = 'none';

    lista.innerHTML = rascunhosVagas.map(r => `
        <div class="vaga-card" style="border-left: 5px solid #002E93">
            <div class="vaga-header">
                <div>
                    <h3 class="vaga-titulo-card">${r.titulo} <span style="font-size: 0.75rem; background: #dbffe0; color: #002E93; border: 1px solid #ffe3e3; padding: 2px 6px; border-radius: 4px; margin-left: 8px;">Rascunho</span></h3>
                    <div class="vaga-meta">
                        <span>📂 ${r.area || 'Não definida'}</span>
                        <span>📍 ${r.local || 'Não definido'}</span>
                        <span>📅 Criado em: ${r.dataCriacao}</span>
                    </div>
                </div>
            </div>
            <div class="vaga-body">
                <p class="vaga-descricao-card">${r.descricao || '<i>Sem descrição detalhada ainda.</i>'}</p>
                
                <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="editarRascunho(${r.id})" style="background: #3498db; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 600;">✏️ Editar Rascunho</button>
                    <button onclick="publicarRascunhoDireto(${r.id})" style="background: #2ecc71; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 600;">🚀 Publicar Direto</button>
                    <button onclick="excluirRascunho(${r.id})" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 600;">🗑 Excluir</button>
                </div>
            </div>
        </div>
    `).join('');
}

function excluirRascunho(id) {
    const index = rascunhosVagas.findIndex(r => r.id === id);
    if (index !== -1) {
        rascunhosVagas.splice(index, 1);
        renderizarRascunhos();
        if (typeof mostrarToast === 'function') mostrarToast('🗑 Rascunho excluído.');
    }
}

function publicarRascunhoDireto(id) {
    const index = rascunhosVagas.findIndex(r => r.id === id);
    if (index === -1) return;

    const r = rascunhosVagas[index];

    // Trata o orçamento se ele veio limpo do rascunho
    let valorOrcamento = parseFloat(r.orcamento);
    if (isNaN(valorOrcamento) || valorOrcamento <= 0) {
        valorOrcamento = 0;
    }
    const orcamentoFormatado = valorOrcamento.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const agora = new Date();
    const dataHoraPublicacao = agora.toLocaleDateString('pt-BR') + ' às ' +
        agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Cria a vaga no formato oficial exigido pelo seu script
    const novaVagaOficial = {
        id: Date.now(),
        empregadorId: 42,
        titulo: r.titulo,
        area: r.area || 'Geral',
        tipo: r.tipo || 'CLT',
        descricao: r.descricao || 'Sem descrição.',
        orcamento: orcamentoFormatado,
        prazo: r.prazo || 'A combinar',
        modalidade: r.modalidade || 'Presencial',
        nivel: r.nivel || 'Não especificado',
        local: r.local || 'Não informado',
        qtd: r.quantidade || '1',
        beneficios: r.beneficios || 'Não informados',
        habilidades: r.tags.length > 0 ? r.tags : ['Geral'],
        status: 'Aberta',
        data: dataHoraPublicacao,
        candidatos: 0,
    };

    // Insere na lista oficial de vagas ativas
    vagas.push(novaVagaOficial);

    renderVagas();
    atualizarStatVagas();
    calcularCompletude();
    // Remove da lista de rascunhos
    rascunhosVagas.splice(index, 1);
    renderizarRascunhos();

    if (typeof mostrarToast === 'function') {
        mostrarToast('🚀 Vaga do rascunho publicada com sucesso!');
    }

    // Leva o usuário para a aba de "Vagas Divulgadas" (ou "vagas") para ver que funcionou
    if (typeof irAba === 'function') {
        irAba('vagas'); // ou o ID da aba onde lista suas vagas ativas
    }
}

/* ═══════════════════════════════════════════
   EDITAR RASCUNHO
═══════════════════════════════════════════ */
function editarRascunho(id) {
    const index = rascunhosVagas.findIndex(r => r.id === id);
    if (index === -1) return;

    const r = rascunhosVagas[index];

    // 1. Devolve os valores para o formulário oficial de publicação
    document.getElementById('vaga-titulo').value = r.titulo || '';
    document.getElementById('vaga-descricao').value = r.descricao || '';
    document.getElementById('vaga-orcamento').value = r.orcamento || '';
    document.getElementById('vaga-prazo').value = r.prazo || '';
    document.getElementById('vaga-local').value = r.local || '';
    document.getElementById('vaga-quantidade').value = r.quantidade || '';
    document.getElementById('vaga-beneficios').value = r.beneficios || '';

    // Devolve os selects selecionando o valor correto
    document.getElementById('vaga-area').value = r.area || document.getElementById('vaga-area').options[0].value;
    document.getElementById('vaga-tipo').value = r.tipo || document.getElementById('vaga-tipo').options[0].value;
    document.getElementById('vaga-modalidade').value = r.modalidade || document.getElementById('vaga-modalidade').options[0].value;
    document.getElementById('vaga-nivel').value = r.nivel || document.getElementById('vaga-nivel').options[0].value;

    // Recupera as tags antigas se houverem
    tagsVaga.length = 0; // limpa o array global atual
    if (r.tags && r.tags.length > 0) {
        r.tags.forEach(t => tagsVaga.push(t));
    }
    renderTagsVaga(); // redesenha as tags na tela

    // Atualiza o contador de caracteres da descrição
    const descCount = document.getElementById('desc-count');
    if (descCount) descCount.textContent = (r.descricao || '').length;

    // 2. Remove o rascunho da lista de guardados (pois ele voltou para edição ativa)
    rascunhosVagas.splice(index, 1);
    renderizarRascunhos();

    // 3. Leva o empregador de volta para a aba de formulário/publicação
    if (typeof irAba === 'function') {
        irAba('publicar');
    }
    
    if (typeof mostrarToast === 'function') {
        mostrarToast('Rascunho carregado no formulário!');
    }
}

/* ═══════════════════════════════════════════
   TOAST
═══════════════════════════════════════════ */
function mostrarToast(msg) {
    let t = document.getElementById('toast-global');
    if (!t) {
        t = document.createElement('div');
        t.id = 'toast-global'; t.className = 'toast';
        t.innerHTML = `<div class="toast-dot"></div><span id="toast-msg"></span>`;
        document.body.appendChild(t);
    }
    document.getElementById('toast-msg').textContent = msg;
    t.classList.add('visivel');
    setTimeout(() => t.classList.remove('visivel'), 3000);
}


/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
    voltarModoView(); // inicia em modo visualização
    calcularCompletude();
    renderNotificacoes();
    atualizarBadge();
    renderVagas();
});