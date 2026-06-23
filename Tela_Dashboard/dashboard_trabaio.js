/* ═══════════════════════════════════════════
   DADOS DE EXEMPLO

   Backend:
   Substituir este array pelos dados retornados
   do banco de dados.

   Estrutura esperada:
   {
      id, empresa, inicialEmpresa, corEmpresa,
      titulo, area, tipo, modalidade, nivel,
      local, orcamento, prazo, descricao,
      habilidades[], destaque
   }
═══════════════════════════════════════════ */
const vagasDB = [
    {
        id: 1, empresa: 'TechStore', inicialEmpresa: 'T', corEmpresa: '#0037ff',
        titulo: 'Desenvolvedor Front-end Júnior',
        area: 'Tecnologia da Informação', tipo: 'CLT (Efetivo)', modalidade: 'Híbrido',
        nivel: 'Júnior (1–2 anos)', local: 'São Paulo, SP',
        orcamento: 'R$ 3.000 – R$ 4.500/mês', prazo: 'Imediato',
        descricao: 'Buscamos um dev front-end para trabalhar com React e TypeScript em projetos de e-commerce de alta escala.',
        habilidades: ['React', 'TypeScript', 'CSS', 'Git'], destaque: true,
    },
    {
        id: 2, empresa: 'EdTech Solutions', inicialEmpresa: 'E', corEmpresa: '#2ecc40',
        titulo: 'UI/UX Designer – Plataforma Educacional',
        area: 'Design & UX', tipo: 'Freelance / Projeto', modalidade: 'Remoto',
        nivel: 'Pleno (3–5 anos)', local: 'Remoto',
        orcamento: 'R$ 2.500 por projeto', prazo: '30 dias',
        descricao: 'Redesign completo de plataforma EAD. Precisamos de alguém que domine Figma e tenha experiência com pesquisa de usuário.',
        habilidades: ['Figma', 'UX Research', 'Prototipagem'], destaque: false,
    },
    {
        id: 3, empresa: 'Construtora RJ', inicialEmpresa: 'C', corEmpresa: '#f59e0b',
        titulo: 'Eletricista Residencial',
        area: 'Construção Civil', tipo: 'Freelance / Projeto', modalidade: 'Presencial',
        nivel: 'Sem experiência / Iniciante', local: 'Rio de Janeiro, RJ',
        orcamento: 'R$ 150/dia', prazo: '2 semanas',
        descricao: 'Instalação e manutenção elétrica em condomínio residencial. Necessário NR10 e experiência comprovada.',
        habilidades: ['NR10', 'Instalação elétrica'], destaque: false,
    },
    {
        id: 4, empresa: 'Agência Criativa', inicialEmpresa: 'A', corEmpresa: '#8b5cf6',
        titulo: 'Social Media – Criação de Conteúdo',
        area: 'Marketing & Comunicação', tipo: 'PJ', modalidade: 'Remoto',
        nivel: 'Júnior (1–2 anos)', local: 'Remoto',
        orcamento: 'R$ 1.800/mês', prazo: 'Contrato por 6 meses',
        descricao: 'Produção de conteúdo para redes sociais de clientes do segmento de moda e lifestyle. Domínio de Canva e pacote Adobe.',
        habilidades: ['Canva', 'Instagram', 'Copywriting', 'Adobe'], destaque: false,
    },
    {
        id: 5, empresa: 'StartupXYZ', inicialEmpresa: 'S', corEmpresa: '#e53e3e',
        titulo: 'Desenvolvedor Full Stack',
        area: 'Tecnologia da Informação', tipo: 'CLT (Efetivo)', modalidade: 'Remoto',
        nivel: 'Pleno (3–5 anos)', local: 'Remoto',
        orcamento: 'R$ 6.000 – R$ 8.000/mês', prazo: 'Imediato',
        descricao: 'Vaga para dev full stack em startup de fintech. Stack: Node.js, React, PostgreSQL. Ambiente ágil e cultura de inovação.',
        habilidades: ['Node.js', 'React', 'PostgreSQL', 'Docker'], destaque: true,
    },
    {
        id: 6, empresa: 'Escola Aprender', inicialEmpresa: 'E', corEmpresa: '#06b6d4',
        titulo: 'Professor de Reforço – Matemática',
        area: 'Educação', tipo: 'Freelance / Projeto', modalidade: 'Presencial',
        nivel: 'Sem experiência / Iniciante', local: 'Teresina, PI',
        orcamento: 'R$ 50/hora', prazo: 'Indeterminado',
        descricao: 'Aulas de reforço de matemática para alunos do ensino médio. Horários flexíveis, 2x por semana.',
        habilidades: ['Matemática', 'Didática'], destaque: false,
    },
    {
        id: 7, empresa: 'LogFast', inicialEmpresa: 'L', corEmpresa: '#111',
        titulo: 'Motorista Entregador',
        area: 'Logística & Transporte', tipo: 'Freelance / Projeto', modalidade: 'Presencial',
        nivel: 'Sem experiência / Iniciante', local: 'Teresina, PI',
        orcamento: 'R$ 80/dia + comissão', prazo: 'Imediato',
        descricao: 'Entregas de encomendas na região metropolitana. CNH B obrigatória. Moto própria é diferencial.',
        habilidades: ['CNH B', 'Roteirização'], destaque: false,
    },
    {
        id: 8, empresa: 'DesignStudio', inicialEmpresa: 'D', corEmpresa: '#ec4899',
        titulo: 'Estagiário de Design Gráfico',
        area: 'Design & UX', tipo: 'Estágio', modalidade: 'Híbrido',
        nivel: 'Sem experiência / Iniciante', local: 'São Paulo, SP',
        orcamento: 'R$ 900/mês + benefícios', prazo: 'Imediato',
        descricao: 'Estágio em studio criativo. Vai aprender branding, identidade visual e motion. Preferência para estudantes de Design.',
        habilidades: ['Illustrator', 'Photoshop', 'InDesign'], destaque: false,
    },
];

// Status possíveis de candidatura
const STATUS = {
    enviada:  { label: 'Enviada',     cor: '#6b7280', bg: '#f3f4f6' },
    analise:  { label: 'Em análise',  cor: '#d97706', bg: '#fffbeb' },
    aprovada: { label: 'Aprovada ✓',  cor: '#1a7d1a', bg: '#e8f8ea' },
    recusada: { label: 'Recusada',    cor: '#e53e3e', bg: '#fef2f2' },
};

// Candidaturas do usuário { vagaId, status, data }
const candidaturas = [];

let filtroRapidoAtivo = '';
let vagasFavoritas = new Set();
let viewAtual = 'painel';
let abaAtiva = 'candidaturas';


/* ═══════════════════════════════════════════
   NAVEGAÇÃO DA SIDEBAR
   Alterna entre o Painel e Minhas Candidaturas
   sem recarregar a página.
═══════════════════════════════════════════ */
function irView(view, linkEl) {
    viewAtual = view;

    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('ativo'));
    if (linkEl) linkEl.classList.add('ativo');

    // Esconde todas as telas primeiro
    document.getElementById('view-painel').style.display = 'none';
    document.getElementById('view-candidaturas').style.display = 'none';
    document.getElementById('view-suporte').style.display = 'none';
    document.getElementById('view-mensagens').style.display = 'none'; // Adicionado

    // Mostra apenas a tela desejada
    if (view === 'painel') {
        document.getElementById('view-painel').style.display = 'flex';
    } else if (view === 'candidaturas') {
        document.getElementById('view-candidaturas').style.display = 'flex';
        renderCandidaturas();
    } else if (view === 'suporte') {
        document.getElementById('view-suporte').style.display = 'flex';
    } else if (view === 'mensagens') {
        document.getElementById('view-mensagens').style.display = 'flex'; // Adicionado
        renderConversas(); // Adicionado
    }
}

/* ═══════════════════════════════════════════
   ENVIO DO SUPORTE
═══════════════════════════════════════════ */
function enviarSuporte(event) {
    event.preventDefault(); // Evita que a página recarregue

    const assunto = document.getElementById('suporte-assunto').value;
    const mensagem = document.getElementById('suporte-mensagem').value;

    // Backend futuro: Aqui você faria um fetch(POST) enviando o assunto e a mensagem.
    console.log('Ticket de Suporte Criado:', { assunto, mensagem });

    // Limpa o formulário após o envio
    document.getElementById('form-suporte').reset();

    // Mostra o feedback visual usando o seu sistema de toast
    mostrarToast('🚀 Mensagem enviada! Retornaremos em breve.');
}

/* ═══════════════════════════════════════════
   ABAS SECUNDÁRIAS dentro de Minhas Candidaturas
═══════════════════════════════════════════ */
function irAbaSecundaria(aba) {
    abaAtiva = aba;

    // 1. Remove a classe 'ativo' de TODAS as abas secundárias
    document.querySelectorAll('#view-candidaturas .tag-filtro').forEach(t => {
        t.classList.remove('ativo');
    });
    
    // 2. Adiciona a classe 'ativo' apenas na aba que foi clicada
    if (aba === 'candidaturas') {
        document.getElementById('tab-candidaturas')?.classList.add('ativo');
    } else if (aba === 'favoritos') {
        document.getElementById('tab-favoritos')?.classList.add('ativo');
    }

    // 3. Mostra/oculta os painéis de conteúdo corretamente
    document.getElementById('painel-candidaturas').style.display = aba === 'candidaturas' ? 'block' : 'none';
    document.getElementById('painel-favoritos').style.display    = aba === 'favoritos'    ? 'block' : 'none';

    // 4. Renderiza os dados atualizados da aba escolhida
    if (aba === 'candidaturas') renderCandidaturas();
    if (aba === 'favoritos')    renderFavoritos();
}


/* ═══════════════════════════════════════════
   CANDIDATURAS – RENDER
   Exibe os cards das vagas em que o usuário
   se candidatou, com status e ações.

   Backend:
   Carregar candidaturas do usuário logado.
   POST /candidaturas → candidatar
   DELETE /candidaturas/{id} → cancelar
═══════════════════════════════════════════ */
function renderCandidaturas() {
    const container   = document.getElementById('lista-candidaturas');
    const vazio       = document.getElementById('candidaturas-vazio');
    const totalEl     = document.getElementById('cand-total');
    const andamentoEl = document.getElementById('cand-andamento');
    const aprovEl     = document.getElementById('cand-aprovadas');

    const emAndamento = candidaturas.filter(c => c.status === 'analise').length;
    const aprovadas   = candidaturas.filter(c => c.status === 'aprovada').length;

    if (totalEl)     totalEl.textContent     = candidaturas.length;
    if (andamentoEl) andamentoEl.textContent = emAndamento;
    if (aprovEl)     aprovEl.textContent     = aprovadas;

    if (!candidaturas.length) {
        container.innerHTML = '';
        vazio.style.display = 'flex';
        return;
    }

    vazio.style.display = 'none';

    container.innerHTML = candidaturas.map(c => {
        const vaga   = vagasDB.find(v => v.id === c.vagaId);
        const status = STATUS[c.status];
        if (!vaga) return '';

        return `
        <div class="cand-card">
            <div class="cand-card-top">
                <div class="vaga-empresa-logo" style="background:${vaga.corEmpresa}">${vaga.inicialEmpresa}</div>
                <div class="cand-info">
                    <h3>${vaga.titulo}</h3>
                    <span>${vaga.empresa} · ${vaga.local}</span>
                    <span class="cand-data">Enviada em ${c.data}</span>
                </div>
                <span class="cand-status" style="color:${status.cor}; background:${status.bg}">
                    ${status.label}
                </span>
            </div>

            <div class="vaga-tags" style="margin-top:10px">
                <span class="vaga-tag">${vaga.tipo}</span>
                <span class="vaga-tag">${vaga.modalidade}</span>
                <span class="vaga-tag">${vaga.nivel}</span>
            </div>

            <div class="cand-valores">
                <span>💰 ${vaga.orcamento}</span>
                <span>📅 Prazo: ${vaga.prazo}</span>
            </div>

            <div class="cand-acoes">
                ${c.status === 'enviada' || c.status === 'analise' ? `
                    <button class="btn-cancelar-cand" onclick="cancelarCandidatura(${c.vagaId})">
                        Cancelar candidatura
                    </button>` : ''}
                ${c.status === 'recusada' ? `
                    <button class="btn-candidatar" onclick="recandidatar(${c.vagaId})"
                            style="font-size:13px;padding:10px 18px">
                        Tentar novamente
                    </button>` : ''}
            </div>
        </div>`;
    }).join('');

    atualizarBadgeCandidaturas();
}

function cancelarCandidatura(vagaId) {
    const idx = candidaturas.findIndex(c => c.vagaId === vagaId);
    if (idx === -1) return;
    candidaturas.splice(idx, 1);

    // reativa o botão no painel de vagas
    const btnPainel = document.querySelector(`[data-vaga-id="${vagaId}"]`);
    if (btnPainel) {
        btnPainel.textContent = 'Ver detalhes / Candidatar-se';
        btnPainel.classList.remove('candidatado');
        btnPainel.disabled = false;
    }

    atualizarStatsCandidaturas();
    renderCandidaturas();
    mostrarToast('✓ Candidatura cancelada.');
}

function recandidatar(vagaId) {
    const cand = candidaturas.find(c => c.vagaId === vagaId);
    if (cand) cand.status = 'enviada';
    renderCandidaturas();
    mostrarToast('🚀 Candidatura reenviada!');
}

function atualizarBadgeCandidaturas() {
    const badge = document.getElementById('badge-candidaturas');
    if (!badge) return;
    badge.textContent = candidaturas.length;
    badge.style.display = candidaturas.length > 0 ? 'inline-flex' : 'none';
}

function atualizarStatsCandidaturas() {
    const totalEl     = document.getElementById('stat-candidaturas');
    const andamentoEl = document.getElementById('stat-andamento');
    if (totalEl)     totalEl.textContent     = candidaturas.length;
    if (andamentoEl) andamentoEl.textContent =
        candidaturas.filter(c => c.status === 'analise' || c.status === 'aprovada').length;
}


/* ═══════════════════════════════════════════
   RENDERIZAR VAGAS
   Recebe uma lista de vagas e monta os cards.

   Backend: não precisa alterar esta função.
   Basta fornecer os dados das vagas.
═══════════════════════════════════════════ */
function renderVagas(lista) {
    const container = document.getElementById('lista-vagas');
    const semRes    = document.getElementById('sem-resultados');
    const count     = document.getElementById('vagas-count');

    if (!lista.length) {
        container.innerHTML = '';
        semRes.style.display = 'flex';
        count.textContent = '0 vagas encontradas';
        return;
    }

    semRes.style.display = 'none';
    count.textContent = `${lista.length} vaga${lista.length !== 1 ? 's' : ''} encontrada${lista.length !== 1 ? 's' : ''}`;

    const jaCandidatou = id => candidaturas.some(c => c.vagaId === id);

    container.innerHTML = lista.map(v => `
        <div class="vaga-card ${v.destaque ? 'destaque' : ''}">
            ${v.destaque ? '<span class="vaga-destaque-badge">⭐ Destaque</span>' : ''}

            <div class="vaga-card-top">
                <div class="vaga-empresa-logo" style="background:${v.corEmpresa}">${v.inicialEmpresa}</div>
                <div class="vaga-info">
                    <h3>${v.titulo}</h3>
                    <span class="vaga-empresa-nome">${v.empresa} · ${v.local}</span>
                </div>
                <button class="btn-favorito ${vagasFavoritas.has(v.id) ? 'favoritado' : ''}"
                        onclick="toggleFavorito(${v.id}, this)" title="Salvar vaga">
                    ${vagasFavoritas.has(v.id) ? '❤️' : '🤍'}
                </button>
            </div>

            <div class="vaga-tags">
                <span class="vaga-tag">${v.tipo}</span>
                <span class="vaga-tag">${v.modalidade}</span>
                <span class="vaga-tag">${v.nivel}</span>
            </div>

            <p class="vaga-desc">${v.descricao}</p>

            <div class="vaga-habilidades">
                ${v.habilidades.map(h => `<span class="vaga-habilidade">${h}</span>`).join('')}
            </div>

            <div class="vaga-card-footer">
                <div class="vaga-valores">
                    <span class="vaga-orcamento">💰 ${v.orcamento}</span>
                    <span class="vaga-prazo">📅 ${v.prazo}</span>
                </div>
                <button
                    class="btn-candidatar ${jaCandidatou(v.id) ? 'candidatado' : ''}"
                    data-vaga-id="${v.id}"
                    onclick="candidatar(${v.id}, this)"
                    ${jaCandidatou(v.id) ? 'disabled' : ''}>
                    ${jaCandidatou(v.id) ? '✓ Candidatura enviada!' : 'Ver detalhes / Candidatar-se'}
                </button>
            </div>
        </div>
    `).join('');
}


/* ═══════════════════════════════════════════
   BUSCA E FILTROS

   Backend:
   Os filtros podem futuramente ser enviados
   para uma API ou consulta SQL.
═══════════════════════════════════════════ */
function buscarVagas() {
    filtrarVagas();
}

function filtrarVagas() {
    const termo      = document.getElementById('busca-header').value.toLowerCase().trim();
    const area       = document.getElementById('filtro-area').value;
    const tipo       = document.getElementById('filtro-tipo').value;
    const modalidade = document.getElementById('filtro-modalidade').value;
    const nivel      = document.getElementById('filtro-nivel').value;

    const resultado = vagasDB.filter(v => {
        const matchTermo = !termo || [v.titulo, v.empresa, v.descricao, ...v.habilidades]
            .some(campo => campo.toLowerCase().includes(termo));
        const matchArea       = !area || v.area === area;
        const matchTipo       = !tipo || v.tipo === tipo;
        const matchModalidade = !modalidade || v.modalidade === modalidade;
        const matchNivel      = !nivel || v.nivel === nivel;
        const matchRapido     = !filtroRapidoAtivo ||
            v.modalidade === filtroRapidoAtivo || v.tipo === filtroRapidoAtivo;

        return matchTermo && matchArea && matchTipo && matchModalidade && matchNivel && matchRapido;
    });

    renderVagas(resultado);
}

function filtroRapido(btn, valor) {
    document.querySelectorAll('.tag-filtro').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    filtroRapidoAtivo = valor;
    filtrarVagas();
}

function limparFiltros() {
    document.getElementById('busca-header').value = '';
    document.getElementById('filtro-area').selectedIndex = 0;
    document.getElementById('filtro-tipo').selectedIndex = 0;
    document.getElementById('filtro-modalidade').selectedIndex = 0;
    document.getElementById('filtro-nivel').selectedIndex = 0;
    filtroRapidoAtivo = '';
    document.querySelectorAll('.tag-filtro').forEach(b => b.classList.remove('ativo'));
    document.querySelector('.tag-filtro').classList.add('ativo');
    renderVagas(vagasDB);
}


/* ═══════════════════════════════════════════
   FAVORITAR VAGA

   Backend:
   POST /favoritos → salvar
   DELETE /favoritos/{id} → remover
═══════════════════════════════════════════ */
// Cenário 1 e 2: favoritar / desfavoritar
function toggleFavorito(id, btn) {
    if (vagasFavoritas.has(id)) {
        // Cenário 2: desfavoritar
        vagasFavoritas.delete(id);
        btn.textContent = '🤍';
        btn.classList.remove('favoritado');
        // se estiver na tela de favoritos, atualiza ao vivo
        if (abaAtiva === 'favoritos' && viewAtual === 'candidaturas') renderFavoritos();
    } else {
        // Cenário 1: favoritar
        vagasFavoritas.add(id);
        btn.textContent = '❤️';
        btn.classList.add('favoritado');
        mostrarToast('❤️ Vaga salva nos favoritos!');
    }
    atualizarBadgeCandidaturas();
}

// Cenário 3 e 5: exibir favoritos
function renderFavoritos() {
    const container = document.getElementById('lista-favoritos');
    const vazio     = document.getElementById('favoritos-vazio');
    if (!container) return;

    const listaFav = vagasDB.filter(v => vagasFavoritas.has(v.id));

    if (!listaFav.length) {
        // Cenário 5: lista vazia
        container.innerHTML = '';
        vazio.style.display = 'flex';
        return;
    }

    vazio.style.display = 'none';
    const jaCandidatou = id => candidaturas.some(c => c.vagaId === id);

    // Cenário 3: lista de vagas favoritadas
    container.innerHTML = listaFav.map(v => `
        <div class="cand-card fav-card">
            <div class="cand-card-top">
                <div class="vaga-empresa-logo" style="background:${v.corEmpresa}">${v.inicialEmpresa}</div>
                <div class="cand-info">
                    <h3>${v.titulo}</h3>
                    <span>${v.empresa} · ${v.local}</span>
                </div>
                <!-- botão de remover dos favoritos direto da lista -->
                <button class="btn-fav-remover" onclick="removerFavoritoDaLista(${v.id})" title="Remover dos favoritos">❤️</button>
            </div>

            <div class="vaga-tags" style="margin-top:10px">
                <span class="vaga-tag">${v.tipo}</span>
                <span class="vaga-tag">${v.modalidade}</span>
                <span class="vaga-tag">${v.nivel}</span>
            </div>

            <p class="vaga-desc">${v.descricao}</p>

            <div class="vaga-card-footer" style="margin-top:12px; padding-top:12px; border-top:1px solid #eee; display:flex; justify-content:space-between; align-items:center">
                <div>
                    <span class="vaga-orcamento">💰 ${v.orcamento}</span><br>
                    <span class="vaga-prazo" style="font-size:12px; color:#888">📅 ${v.prazo}</span>
                </div>
                <!-- Cenário 4: candidatar a partir dos favoritos -->
                <button
                    class="btn-candidatar ${jaCandidatou(v.id) ? 'candidatado' : ''}"
                    data-vaga-id="${v.id}"
                    onclick="candidatar(${v.id}, this)"
                    ${jaCandidatou(v.id) ? 'disabled' : ''}
                    style="font-size:13px; padding:10px 18px">
                    ${jaCandidatou(v.id) ? '✓ Candidatura enviada!' : 'Candidatar-se'}
                </button>
            </div>
        </div>
    `).join('');
}

// Remove dos favoritos direto da lista de favoritos
function removerFavoritoDaLista(id) {
    vagasFavoritas.delete(id);

    // sincroniza o coração no painel de vagas se estiver renderizado
    const btnPainel = document.querySelector(`.btn-favorito[data-fav-id="${id}"]`);
    if (btnPainel) {
        btnPainel.textContent = '🤍';
        btnPainel.classList.remove('favoritado');
    }

    atualizarBadgeCandidaturas();
    renderFavoritos();
    mostrarToast('Vaga removida dos favoritos.');
}

/* ═══════════════════════════════════════════
   CANDIDATAR-SE

   Backend:
   POST /candidaturas → inserir candidatura
   e retornar confirmação ao usuário.
═══════════════════════════════════════════ */
function candidatar(id, btn) {
    if (candidaturas.some(c => c.vagaId === id)) return;

    candidaturas.push({
        vagaId: id,
        status: 'enviada',
        data: new Date().toLocaleDateString('pt-BR'),
    });

    btn.textContent = '✓ Candidatura enviada!';
    btn.classList.add('candidatado');
    btn.disabled = true;

    atualizarStatsCandidaturas();
    atualizarBadgeCandidaturas();
    mostrarToast('🚀 Candidatura enviada! Veja em Minhas Candidaturas.');
}


/* ═══════════════════════════════════════════
   VAGAS RECOMENDADAS (painel direito)

   Backend:
   Carregar habilidades do perfil do usuário
   e calcular compatibilidade com as vagas.
═══════════════════════════════════════════ */
function renderRecomendadas() {
    const habilidadesUsuario = ['React', 'JavaScript', 'Figma', 'CSS', 'Node.js'];

    const pontuadas = vagasDB.map(v => ({
        ...v,
        match: v.habilidades.filter(h => habilidadesUsuario.includes(h)).length
    })).sort((a, b) => b.match - a.match).slice(0, 3);

    document.getElementById('vagas-recomendadas').innerHTML = pontuadas.map(v => `
        <div class="recomendada-item" onclick="mostrarToast('Em breve: detalhe da vaga 👀')">
            <div class="recomendada-logo" style="background:${v.corEmpresa}">${v.inicialEmpresa}</div>
            <div class="recomendada-info">
                <strong>${v.titulo}</strong>
                <span>${v.empresa}</span>
                ${v.match > 0 ? `<span class="recomendada-match">✓ ${v.match} habilidade${v.match > 1 ? 's' : ''} em comum</span>` : ''}
            </div>
        </div>
    `).join('');
}


/* ═══════════════════════════════════════════
   NOTIFICAÇÕES

   Backend:
   Carregar notificações do usuário logado.
   Marcação de leitura deve ser salva no banco.
═══════════════════════════════════════════ */
const notificacoes = [
    { icone: '💼', texto: 'TechStore visualizou seu perfil.', tempo: 'Agora há pouco', lida: false },
    { icone: '📩', texto: 'Nova vaga na área de Design & UX.', tempo: '1h atrás', lida: false },
    { icone: '✅', texto: 'Candidatura para EdTech confirmada.', tempo: 'Ontem', lida: true },
];

function toggleNotificacoes() {
    document.getElementById('dropdown-notif').classList.toggle('aberto');
    document.getElementById('dropdown-perfil')?.classList.remove('aberto');
}

function marcarTodasLidas() {
    notificacoes.forEach(n => n.lida = true);
    renderNotificacoes();
    atualizarBadge();
}

function renderNotificacoes() {
    const lista = document.getElementById('notif-lista');
    lista.innerHTML = notificacoes.map((n, i) => `
        <div class="notif-item ${n.lida ? 'lida' : ''}" onclick="lerNotificacao(${i})">
            <span class="notif-item-icone">${n.icone}</span>
            <div class="notif-item-info">
                <p>${n.texto}</p>
                <span>${n.tempo}</span>
            </div>
            ${!n.lida ? '<div class="notif-dot"></div>' : ''}
        </div>
    `).join('');
}

function lerNotificacao(idx) {
    notificacoes[idx].lida = true;
    renderNotificacoes();
    atualizarBadge();
}

function atualizarBadge() {
    const naoLidas = notificacoes.filter(n => !n.lida).length;
    const badge = document.getElementById('notif-badge');
    badge.textContent = naoLidas;
    badge.style.display = naoLidas > 0 ? 'flex' : 'none';
}

/* ═══════════════════════════════════════════
   SISTEMA DE MENSAGENS (CONTEXTO TRABALHADOR)
═══════════════════════════════════════════ */
let conversaAtivaId = null;

// Mock de dados com situações de entrevistas e propostas reais para o Daniel
const conversasDB = [
    {
        id: 1,
        empresa: 'TechStore',
        corEmpresa: '#0037ff',
        inicialEmpresa: 'T',
        mensagens: [
            { remetente: 'empresa', texto: 'Olá Daniel! Avaliamos seu perfil e curtimos muito seu portfólio em React e JavaScript. Você teria disponibilidade para um bate-papo técnico com nosso gestor nesta quinta às 14h?', tempo: '10:30' }
        ]
    },
    {
        id: 2,
        empresa: 'Agência Criativa',
        corEmpresa: '#8b5cf6',
        inicialEmpresa: 'A',
        mensagens: [
            { remetente: 'empresa', texto: 'Fala Daniel, tudo bem? Vimos seu interesse na vaga de criação de conteúdo. Você tem algum link com peças que já desenvolveu no Canva ou Illustrator para darmos uma olhada?', tempo: 'Ontem' },
            { remetente: 'trabalhador', texto: 'Olá! Tudo ótimo por aqui. Tenho sim, separei meus melhores layouts de identidades visuais e artes recentes. Posso enviar o link direto por aqui?', tempo: 'Ontem' },
            { remetente: 'empresa', texto: 'Com certeza! Pode mandar aqui que eu repasso direto para o pessoal do design avaliar. Valeu!', tempo: 'Ontem' }
        ]
    },
    {
        id: 3,
        empresa: 'StartupXYZ',
        corEmpresa: '#e53e3e',
        inicialEmpresa: 'S',
        mensagens: [
            { remetente: 'empresa', texto: 'Parabéns, Daniel! Sua candidatura avançou de fase. Acabamos de liberar o link do seu desafio técnico no seu e-mail cadastrado. Qualquer dúvida nos avise.', tempo: '2 dias atrás' }
        ]
    }
];

// Renderiza a lista lateral de conversas com as empresas
function renderConversas() {
    const lista = document.getElementById('chat-lista-conversas');
    if (!lista) return;

    lista.innerHTML = conversasDB.map(c => {
        const ultimaMsg = c.mensagens[c.mensagens.length - 1];
        const textoExibido = ultimaMsg ? ultimaMsg.texto : 'Nenhuma mensagem recente.';
        const tempoExibido = ultimaMsg ? ultimaMsg.tempo : '';
        const classeAtivo = conversaAtivaId === c.id ? 'ativo' : '';

        return `
            <div class="chat-item ${classeAtivo}" onclick="abrirConversa(${c.id})">
                <div class="vaga-empresa-logo" style="background:${c.corEmpresa}; font-size:14px; width:34px; height:34px; flex-shrink:0;">${c.inicialEmpresa}</div>
                <div class="chat-item-info">
                    <div class="chat-item-top">
                        <strong>${c.empresa}</strong>
                        <span>${tempoExibido}</span>
                    </div>
                    <p>${textoExibido}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Abre o histórico de mensagens da empresa selecionada
function abrirConversa(id) {
    conversaAtivaId = id;
    const conversa = conversasDB.find(c => c.id === id);
    if (!conversa) return;

    // Atualiza a seleção visual na barra lateral
    renderConversas();

    // Altera o estado das telas internas do chat
    document.getElementById('chat-janela-vazia').style.display = 'none';
    const janelaAtiva = document.getElementById('chat-janela-ativa');
    janelaAtiva.style.display = 'flex';

    // Sincroniza o topo do chat
    document.getElementById('chat-header-nome').textContent = conversa.empresa;
    const logoHeader = document.getElementById('chat-header-logo');
    logoHeader.textContent = conversa.inicialEmpresa;
    logoHeader.style.background = conversa.corEmpresa;

    // Renderiza as mensagens trocadas
    const feed = document.getElementById('chat-feed-mensagens');
    feed.innerHTML = conversa.mensagens.map(m => `
        <div class="msg-bubble ${m.remetente}">
            ${m.texto}
            <span class="msg-tempo">${m.tempo}</span>
        </div>
    `).join('');

    // Rola o feed automaticamente para a última mensagem enviada
    feed.scrollTop = feed.scrollHeight;
}

// Envia a mensagem inserida no input
function enviarMensagemChat(event) {
    event.preventDefault();
    const input = document.getElementById('chat-input-texto');
    const texto = input.value.trim();
    if (!texto || !conversaAtivaId) return;

    const conversa = conversasDB.find(c => c.id === conversaAtivaId);
    if (!conversa) return;

    const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Armazena no mock como resposta do trabalhador
    conversa.mensagens.push({
        remetente: 'trabalhador',
        texto: texto,
        tempo: horaFormatada
    });

    input.value = '';
    abrirConversa(conversaAtivaId); // Recarrega os balões na tela e desce o scroll
}


/* ═══════════════════════════════════════════
   DROPDOWN AVATAR / MENU DE PERFIL

   Backend:
   Links podem apontar para:
   - Perfil do usuário
   - Configurações
   - Logout
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

   Backend:
   Aqui podem ser chamadas APIs para buscar:
   - Dados do usuário
   - Vagas
   - Notificações
   - Favoritos
   - Candidaturas
═══════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
    renderVagas(vagasDB);
    renderRecomendadas();
    renderNotificacoes();
    atualizarBadge();
    atualizarBadgeCandidaturas();
});