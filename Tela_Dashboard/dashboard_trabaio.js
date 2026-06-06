/* ═══════════════════════════════════════════
   DADOS DE EXEMPLO 

   Backend:
   Substituir este array pelos dados retornados
   do banco de dados.

   Estrutura esperada:
   {
      id,
      empresa,
      titulo,
      area,
      tipo,
      modalidade,
      nivel,
      local,
      orcamento,
      prazo,
      descricao,
      habilidades[],
      destaque
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
        habilidades: ['React', 'TypeScript', 'CSS', 'Git'],
        destaque: true,
    },
    {
        id: 2, empresa: 'EdTech Solutions', inicialEmpresa: 'E', corEmpresa: '#2ecc40',
        titulo: 'UI/UX Designer – Plataforma Educacional',
        area: 'Design & UX', tipo: 'Freelance / Projeto', modalidade: 'Remoto',
        nivel: 'Pleno (3–5 anos)', local: 'Remoto',
        orcamento: 'R$ 2.500 por projeto', prazo: '30 dias',
        descricao: 'Redesign completo de plataforma EAD. Precisamos de alguém que domine Figma e tenha experiência com pesquisa de usuário.',
        habilidades: ['Figma', 'UX Research', 'Prototipagem'],
        destaque: false,
    },
    {
        id: 3, empresa: 'Construtora RJ', inicialEmpresa: 'C', corEmpresa: '#f59e0b',
        titulo: 'Eletricista Residencial',
        area: 'Construção Civil', tipo: 'Freelance / Projeto', modalidade: 'Presencial',
        nivel: 'Sem experiência / Iniciante', local: 'Rio de Janeiro, RJ',
        orcamento: 'R$ 150/dia', prazo: '2 semanas',
        descricao: 'Instalação e manutenção elétrica em condomínio residencial. Necessário NR10 e experiência comprovada.',
        habilidades: ['NR10', 'Instalação elétrica'],
        destaque: false,
    },
    {
        id: 4, empresa: 'Agência Criativa', inicialEmpresa: 'A', corEmpresa: '#8b5cf6',
        titulo: 'Social Media – Criação de Conteúdo',
        area: 'Marketing & Comunicação', tipo: 'PJ', modalidade: 'Remoto',
        nivel: 'Júnior (1–2 anos)', local: 'Remoto',
        orcamento: 'R$ 1.800/mês', prazo: 'Contrato por 6 meses',
        descricao: 'Produção de conteúdo para redes sociais de clientes do segmento de moda e lifestyle. Domínio de Canva e pacote Adobe.',
        habilidades: ['Canva', 'Instagram', 'Copywriting', 'Adobe'],
        destaque: false,
    },
    {
        id: 5, empresa: 'StartupXYZ', inicialEmpresa: 'S', corEmpresa: '#e53e3e',
        titulo: 'Desenvolvedor Full Stack',
        area: 'Tecnologia da Informação', tipo: 'CLT (Efetivo)', modalidade: 'Remoto',
        nivel: 'Pleno (3–5 anos)', local: 'Remoto',
        orcamento: 'R$ 6.000 – R$ 8.000/mês', prazo: 'Imediato',
        descricao: 'Vaga para dev full stack em startup de fintech. Stack: Node.js, React, PostgreSQL. Ambiente ágil e cultura de inovação.',
        habilidades: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
        destaque: true,
    },
    {
        id: 6, empresa: 'Escola Aprender', inicialEmpresa: 'E', corEmpresa: '#06b6d4',
        titulo: 'Professor de Reforço – Matemática',
        area: 'Educação', tipo: 'Freelance / Projeto', modalidade: 'Presencial',
        nivel: 'Sem experiência / Iniciante', local: 'Teresina, PI',
        orcamento: 'R$ 50/hora', prazo: 'Indeterminado',
        descricao: 'Aulas de reforço de matemática para alunos do ensino médio. Horários flexíveis, 2x por semana.',
        habilidades: ['Matemática', 'Didática'],
        destaque: false,
    },
    {
        id: 7, empresa: 'LogFast', inicialEmpresa: 'L', corEmpresa: '#111',
        titulo: 'Motorista Entregador',
        area: 'Logística & Transporte', tipo: 'Freelance / Projeto', modalidade: 'Presencial',
        nivel: 'Sem experiência / Iniciante', local: 'Teresina, PI',
        orcamento: 'R$ 80/dia + comissão', prazo: 'Imediato',
        descricao: 'Entregas de encomendas na região metropolitana. CNH B obrigatória. Moto própria é diferencial.',
        habilidades: ['CNH B', 'Roteirização'],
        destaque: false,
    },
    {
        id: 8, empresa: 'DesignStudio', inicialEmpresa: 'D', corEmpresa: '#ec4899',
        titulo: 'Estagiário de Design Gráfico',
        area: 'Design & UX', tipo: 'Estágio', modalidade: 'Híbrido',
        nivel: 'Sem experiência / Iniciante', local: 'São Paulo, SP',
        orcamento: 'R$ 900/mês + benefícios', prazo: 'Imediato',
        descricao: 'Estágio em studio criativo. Vai aprender branding, identidade visual e motion. Preferência para estudantes de Design.',
        habilidades: ['Illustrator', 'Photoshop', 'InDesign'],
        destaque: false,
    },
];

let filtroRapidoAtivo = '';
let vagasFavoritas = new Set();

/* ═══════════════════════════════════════════
   RENDERIZAR VAGAS
   Recebe uma lista de vagas e monta os cards
   exibidos para o usuário.

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
                <button class="btn-candidatar" onclick="candidatar(${v.id}, this)">
                    Ver detalhes / Candidatar-se
                </button>
            </div>
        </div>
    `).join('');
}

/* ═══════════════════════════════════════════
   BUSCA E FILTROS

   Utiliza os filtros selecionados pelo usuário
   e exibe apenas as vagas compatíveis.

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
    document.querySelector('.tag-filtro').classList.add('ativo'); // "Todos"
    renderVagas(vagasDB);
}

/* ═══════════════════════════════════════════
   FAVORITAR VAGA
    Backend:
   Salvar/remover favorito do usuário no banco.
   Exemplo:
   POST /favoritos
   DELETE /favoritos/{id}
═══════════════════════════════════════════ */
function toggleFavorito(id, btn) {
    if (vagasFavoritas.has(id)) {
        vagasFavoritas.delete(id);
        btn.textContent = '🤍';
        btn.classList.remove('favoritado');
    } else {
        vagasFavoritas.add(id);
        btn.textContent = '❤️';
        btn.classList.add('favoritado');
        mostrarToast('❤️ Vaga salva nos favoritos!');
    }
}

/* ═══════════════════════════════════════════
   CANDIDATAR-SE

   Backend:
   Inserir candidatura no banco e retornar
   confirmação ao usuário.
═══════════════════════════════════════════ */
function candidatar(id, btn) {
    btn.textContent = '✓ Candidatura enviada!';
    btn.classList.add('candidatado');
    btn.disabled = true;
    mostrarToast('🚀 Candidatura enviada com sucesso!');
}

/* ═══════════════════════════════════════════
   VAGAS RECOMENDADAS (painel direito)

   Atualmente usa habilidades fixas.

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
        <div class="recomendada-item" onclick="scrollParaVaga(${v.id})">
            <div class="recomendada-logo" style="background:${v.corEmpresa}">${v.inicialEmpresa}</div>
            <div class="recomendada-info">
                <strong>${v.titulo}</strong>
                <span>${v.empresa}</span>
                ${v.match > 0 ? `<span class="recomendada-match">✓ ${v.match} habilidade${v.match > 1 ? 's' : ''} em comum</span>` : ''}
            </div>
        </div>
    `).join('');
}

function scrollParaVaga(id) {
    // futuramente abre modal de detalhe da vaga
    mostrarToast('Em breve: detalhe da vaga 👀');
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
   DROPDOWN AVATAR ou  MENU DE PERFIL

   Responsável por abrir e fechar o menu
   do usuário no canto superior da tela.

   Backend:
   Os links podem futuramente apontar para:
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
    let toast = document.getElementById('toast-global');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-global';
        toast.className = 'toast';
        toast.innerHTML = `<div class="toast-dot"></div><span id="toast-msg"></span>`;
        document.body.appendChild(toast);
    }
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('visivel');
    setTimeout(() => toast.classList.remove('visivel'), 3000);
}

/* ═══════════════════════════════════════════
   INIT

   Executado quando a página termina de carregar.

   Backend:
   Aqui podem ser chamadas APIs para buscar:
   - Dados do usuário
   - Vagas
   - Notificações
   - Favoritos
═══════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
    renderVagas(vagasDB);
    renderRecomendadas();
    renderNotificacoes();
    atualizarBadge();
});