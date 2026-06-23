/* ═══════════════════════════════════════════
   DADOS DE EXEMPLO — TRABALHADORES
   Backend: substituir pelo retorno da API
   (perfis públicos de trabalhadores).
═══════════════════════════════════════════ */
const trabalhadoresDB = [
    {
        id: 1, nome: 'Daniel Souza', inicial: 'D', cor: '#0037ff',
        titulo: 'Desenvolvedor Front-end', area: 'Tecnologia da Informação',
        disponibilidade: 'Integral', nivel: 'Júnior (1–2 anos)',
        cidade: 'São Paulo, SP', salario: 'R$ 3.000 ou A combiner',
        bio: 'Desenvolvedor front-end apaixonado por criar interfaces limpas e acessíveis. Experiência com React e ecossistema moderno de JS.',
        habilidades: ['React', 'JavaScript', 'CSS', 'Git'],
        projetos: [
            { titulo: 'Landing page para clínica odontológica', area: 'Tecnologia da Informação' },
            { titulo: 'Dashboard de vendas para e-commerce', area: 'Tecnologia da Informação' },
        ],
        portfolioCount: 3,
    },
    {
        id: 2, nome: 'Marina Castro', inicial: 'M', cor: '#2ecc40',
        titulo: 'UI/UX Designer', area: 'Design & UX',
        disponibilidade: 'Freelance / Projeto', nivel: 'Pleno (3–5 anos)',
        cidade: 'Remoto', salario: 'R$ 2.500 por projeto',
        bio: 'Designer focada em pesquisa de usuário e prototipagem. Já trabalhei com startups de educação e saúde.',
        habilidades: ['Figma', 'UX Research', 'Prototipagem'],
        projetos: [
            { titulo: 'Redesign de app de meditação', area: 'Design & UX' },
        ],
        portfolioCount: 5,
    },
    {
        id: 3, nome: 'João Pereira', inicial: 'J', cor: '#f59e0b',
        titulo: 'Eletricista Residencial', area: 'Construção Civil',
        disponibilidade: 'Freelance / Projeto', nivel: 'Sênior (5+ anos)',
        cidade: 'Rio de Janeiro, RJ', salario: 'R$ 150/dia',
        bio: 'Eletricista certificado NR10 com mais de 8 anos de experiência em instalações residenciais e comerciais.',
        habilidades: ['NR10', 'Instalação elétrica', 'Manutenção'],
        projetos: [
            { titulo: 'Instalação elétrica completa - condomínio', area: 'Construção Civil' },
        ],
        portfolioCount: 2,
    },
    {
        id: 4, nome: 'Carla Mendes', inicial: 'C', cor: '#8b5cf6',
        titulo: 'Social Media & Copywriter', area: 'Marketing & Comunicação',
        disponibilidade: 'Remoto', nivel: 'Júnior (1–2 anos)',
        cidade: 'Remoto', salario: 'R$ 1.800/mês',
        bio: 'Especialista em conteúdo para redes sociais, com foco em moda e lifestyle. Domínio de Canva e Adobe.',
        habilidades: ['Canva', 'Instagram', 'Copywriting', 'Adobe'],
        projetos: [],
        portfolioCount: 4,
    },
    {
        id: 5, nome: 'Rafael Lima', inicial: 'R', cor: '#e53e3e',
        titulo: 'Desenvolvedor Full Stack', area: 'Tecnologia da Informação',
        disponibilidade: 'Remoto', nivel: 'Pleno (3–5 anos)',
        cidade: 'Remoto', salario: 'R$ 6.000 – R$ 8.000/mês',
        bio: 'Full stack com foco em Node.js e React. Já atuei em fintechs e marketplaces de médio porte.',
        habilidades: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
        projetos: [
            { titulo: 'API de pagamentos para fintech', area: 'Tecnologia da Informação' },
            { titulo: 'Marketplace B2B completo', area: 'Tecnologia da Informação' },
        ],
        portfolioCount: 6,
    },
    {
        id: 6, nome: 'Beatriz Alves', inicial: 'B', cor: '#06b6d4',
        titulo: 'Professora de Matemática', area: 'Educação',
        disponibilidade: 'Fins de semana', nivel: 'Estágio / Iniciante',
        cidade: 'Teresina, PI', salario: 'R$ 50/hora',
        bio: 'Estudante de licenciatura em matemática, com experiência em reforço escolar para ensino médio.',
        habilidades: ['Matemática', 'Didática'],
        projetos: [],
        portfolioCount: 0,
    },
];

let filtroRapidoTrabAtivo = '';
let viewAtual = 'painel';

// Armazena o histórico das conversas na memória
let conversasDB = [
    {
        trabalhadorId: 1,
        mensagens: [
            { enviadoPor: 'trabalhador', texto: 'Olá Francisco! Vi que você favoritou meu perfil. Fico à disposição para tirar dúvidas!', data: '20/06/2026' }
        ]
    }
];
let chatAtivoTrabalhadorId = null;

// Candidatos por vaga
const candidatos = [
    { vagaId: 101, vagaTitulo: 'Desenvolvedor Front-end Júnior', trabalhadorId: 1, status: 'analise', data: '20/06/2026' },
    { vagaId: 101, vagaTitulo: 'Desenvolvedor Front-end Júnior', trabalhadorId: 5, status: 'analise', data: '21/06/2026' },
    { vagaId: 102, vagaTitulo: 'UI/UX Designer Pleno', trabalhadorId: 2, status: 'contratado', data: '15/06/2026' },
];

const CAND_STATUS = {
    analise:    { label: 'Em análise',  cor: '#d97706', bg: '#fffbeb' },
    contratado: { label: 'Contratado ✓', cor: '#1a7d1a', bg: '#e8f8ea' },
    dispensado: { label: 'Dispensado',  cor: '#e53e3e', bg: '#fef2f2' },
};


/* ═══════════════════════════════════════════
   NAVEGAÇÃO PRINCIPAL (sidebar)
═══════════════════════════════════════════ */
function irView(view, linkEl) {
    viewAtual = view;
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('ativo'));
    if (linkEl) linkEl.classList.add('ativo');

    document.getElementById('view-painel').style.display      = view === 'painel' ? 'flex' : 'none';
    document.getElementById('view-candidatos').style.display  = view === 'candidatos' ? 'flex' : 'none';
    document.getElementById('view-suporte').style.display     = view === 'suporte' ? 'flex' : 'none';
    document.getElementById('view-mensagens').style.display   = view === 'mensagens' ? 'flex' : 'none';

    if (view === 'candidatos') renderCandidatos();
    if (view === 'mensagens') renderMensagensView(); // Chama a renderização do chat
}


/* ═══════════════════════════════════════════
   RENDER: LISTA DE TRABALHADORES
═══════════════════════════════════════════ */
function renderTrabalhadores(lista) {
    const container = document.getElementById('lista-trabalhadores');
    const semRes    = document.getElementById('sem-resultados');
    const count     = document.getElementById('trab-count');

    if (!container) return;

    if (!lista.length) {
        container.innerHTML = '';
        semRes.style.display = 'flex';
        count.textContent = '0 profissionais encontrados';
        return;
    }
    semRes.style.display = 'none';
    count.textContent = `${lista.length} profissional${lista.length !== 1 ? 'is' : ''} encontrado${lista.length !== 1 ? 's' : ''}`;

    container.innerHTML = lista.map(t => `
        <div class="vaga-card trab-card">
            <div class="vaga-card-top">
                <div class="vaga-empresa-logo" style="background:${t.cor}">${t.inicial}</div>
                <div class="vaga-info">
                    <h3>${t.nome}</h3>
                    <span class="vaga-empresa-nome">${t.titulo} · ${t.cidade}</span>
                </div>
            </div>

            <div class="vaga-tags">
                <span class="vaga-tag">${t.area}</span>
                <span class="vaga-tag">${t.disponibilidade}</span>
                <span class="vaga-tag">${t.nivel}</span>
            </div>

            <p class="vaga-desc">${t.bio}</p>

            <div class="vaga-habilidades">
                ${t.habilidades.map(h => `<span class="vaga-habilidade">${h}</span>`).join('')}
            </div>

            <div class="trab-resumo">
                <span>🗂️ ${t.portfolioCount} arquivo${t.portfolioCount !== 1 ? 's' : ''} no portfólio</span>
                <span>🚀 ${t.projetos.length} projeto${t.projetos.length !== 1 ? 's' : ''} concluído${t.projetos.length !== 1 ? 's' : ''}</span>
            </div>

            <div class="vaga-card-footer">
                <div class="vaga-valores">
                    <span class="vaga-orcamento">💰 ${t.salario}</span>
                </div>
                <div style="display:flex; gap:10px;">
                    <button class="btn-ver-perfil" onclick="abrirPerfilTrabalhador(${t.id})">Ver perfil completo</button>
                    <button class="btn-candidatar" onclick="abrirModalMensagem(${t.id})">Convidar</button>
                </div>
            </div>
        </div>
    `).join('');
}


/* ═══════════════════════════════════════════
   MODAL: PERFIL COMPLETO DO TRABALHADOR
═══════════════════════════════════════════ */
function abrirPerfilTrabalhador(id) {
    const t = trabalhadoresDB.find(x => x.id === id);
    if (!t) return;

    document.getElementById('modal-perfil-conteudo').innerHTML = `
        <div class="modal-perfil-header">
            <div class="vaga-empresa-logo" style="background:${t.cor}; width:64px; height:64px; font-size:26px;">${t.inicial}</div>
            <div>
                <h2>${t.nome}</h2>
                <span>${t.titulo} · ${t.cidade}</span>
                <div class="vaga-tags" style="margin-top:8px">
                    <span class="vaga-tag">${t.area}</span>
                    <span class="vaga-tag">${t.disponibilidade}</span>
                    <span class="vaga-tag">${t.nivel}</span>
                </div>
            </div>
        </div>

        <div class="modal-perfil-secao">
            <h4>Sobre</h4>
            <p>${t.bio}</p>
        </div>

        <div class="modal-perfil-secao">
            <h4>Habilidades</h4>
            <div class="vaga-habilidades">
                ${t.habilidades.map(h => `<span class="vaga-habilidade">${h}</span>`).join('')}
            </div>
        </div>

        <div class="modal-perfil-secao">
            <h4>Pretensão</h4>
            <p class="modal-perfil-salario">💰 ${t.salario}</p>
        </div>

        <div class="modal-perfil-secao">
            <h4>Projetos concluídos (${t.projetos.length})</h4>
            ${t.projetos.length
                ? `<div class="modal-perfil-projetos">
                    ${t.projetos.map(p => `
                        <div class="modal-projeto-item">
                            <strong>${p.titulo}</strong>
                            <span>${p.area}</span>
                        </div>`).join('')}
                   </div>`
                : '<p class="campo-view-vazio">Nenhum projeto cadastrado ainda.</p>'}
        </div>

        <div class="modal-perfil-secao">
            <h4>Portfólio</h4>
            <p>${t.portfolioCount > 0 ? `📁 ${t.portfolioCount} arquivo${t.portfolioCount !== 1 ? 's' : ''} disponível${t.portfolioCount !== 1 ? 'eis' : ''} para download.` : 'Nenhum arquivo de portfólio enviado.'}</p>
        </div>

        <div class="modal-perfil-actions">
            <button class="btn-cancelar-form" onclick="fecharModalPerfil()">Fechar</button>
            <button class="btn-salvar-proj" onclick="fecharModalPerfil(); abrirModalMensagem(${t.id})">Convidar profissional</button>
        </div>
    `;

    document.getElementById('modal-perfil-trabalhador').style.display = 'flex';
}

function fecharModalPerfil() {
    document.getElementById('modal-perfil-trabalhador').style.display = 'none';
}


/* ═══════════════════════════════════════════
   MODAL: CONVIDAR / ENVIAR MENSAGEM
═══════════════════════════════════════════ */
let trabalhadorSelecionadoId = null;

function abrirModalMensagem(id) {
    const t = trabalhadoresDB.find(x => x.id === id);
    if (!t) return;
    trabalhadorSelecionadoId = id;

    document.getElementById('modal-msg-nome').textContent = t.nome;
    document.getElementById('modal-msg-area').textContent = t.titulo;
    document.getElementById('modal-msg-texto').value =
        `Olá ${t.nome.split(' ')[0]}! Vi seu perfil na WorkNOW e gostaria de conversar sobre uma oportunidade na área de ${t.area}. Você teria disponibilidade para uma conversa?`;

    document.getElementById('modal-mensagem').style.display = 'flex';
}

function fecharModalMensagem() {
    document.getElementById('modal-mensagem').style.display = 'none';
    trabalhadorSelecionadoId = null;
}

function enviarMensagem() {
    const texto = document.getElementById('modal-msg-texto').value.trim();
    if (!texto) { mostrarToast('⚠ Escreva uma mensagem antes de enviar.'); return; }

    const t = trabalhadoresDB.find(x => x.id === trabalhadorSelecionadoId);
    
    // Se não existir histórico com esse trabalhador, cria um novo canal de chat
    let conversa = conversasDB.find(c => c.trabalhadorId === trabalhadorSelecionadoId);
    if (!conversa) {
        conversa = { trabalhadorId: trabalhadorSelecionadoId, mensagens: [] };
        conversasDB.push(conversa);
    }
    
    // Adiciona o texto enviado no banco simulado
    conversa.mensagens.push({
        enviadoPor: 'empregador',
        texto: texto,
        data: 'Hoje'
    });

    fecharModalMensagem();
    mostrarToast(`📨 Mensagem enviada para ${t ? t.nome : 'o profissional'}!`);
    atualizarBadgeMensagens();
}


/* ═══════════════════════════════════════════
   BUSCA E FILTROS DE TRABALHADORES
═══════════════════════════════════════════ */
function buscarTrabalhadores() { filtrarTrabalhadores(); }

function filtrarTrabalhadores() {
    const termo          = document.getElementById('busca-header').value.toLowerCase().trim();
    const area            = document.getElementById('filtro-area').value;
    const disponibilidad = document.getElementById('filtro-disponibilidade').value;
    const nivel           = document.getElementById('filtro-nivel').value;

    const resultado = trabalhadoresDB.filter(t => {
        const matchTermo = !termo || [t.nome, t.titulo, t.bio, ...t.habilidades]
            .some(c => c.toLowerCase().includes(termo));
        return matchTermo &&
            (!area || t.area === area) &&
            (!disponibilidad || t.disponibilidade === disponibilidad) &&
            (!nivel || t.nivel === nivel) &&
            (!filtroRapidoTrabAtivo || t.disponibilidade === filtroRapidoTrabAtivo || t.nivel === filtroRapidoTrabAtivo);
    });

    renderTrabalhadores(resultado);
}

function filtroRapidoTrab(btn, valor) {
    document.querySelectorAll('.tag-filtro').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    filtroRapidoTrabAtivo = valor;
    filtrarTrabalhadores();
}

function limparFiltrosTrabalhadores() {
    document.getElementById('busca-header').value = '';
    ['filtro-area','filtro-disponibilidade','filtro-nivel'].forEach(id => document.getElementById(id).selectedIndex = 0);
    filtroRapidoTrabAtivo = '';
    document.querySelectorAll('.tag-filtro').forEach(b => b.classList.remove('ativo'));
    document.querySelector('.tag-filtro').classList.add('ativo');
    renderTrabalhadores(trabalhadoresDB);
}


/* ═══════════════════════════════════════════
   CANDIDATOS
═══════════════════════════════════════════ */
function renderCandidatos() {
    const container = document.getElementById('lista-vagas-candidatos');
    const vazio      = document.getElementById('candidatos-vazio');

    if (!container) return;

    if (!candidatos.length) {
        container.innerHTML = '';
        vazio.style.display = 'flex';
        atualizarStatsCandidatos();
        return;
    }
    vazio.style.display = 'none';

    const porVaga = {};
    candidatos.forEach(c => {
        if (!porVaga[c.vagaId]) porVaga[c.vagaId] = { titulo: c.vagaTitulo, lista: [] };
        porVaga[c.vagaId].lista.push(c);
    });

    container.innerHTML = Object.entries(porVaga).map(([vagaId, grupo]) => `
        <div class="vaga-candidatos-grupo">
            <div class="vaga-candidatos-titulo">
                <h3>${grupo.titulo}</h3>
                <span class="vaga-tag">${grupo.lista.length} candidato${grupo.lista.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="lista-vagas">
                ${grupo.lista.map(c => {
                    const t = trabalhadoresDB.find(x => x.id === c.trabalhadorId);
                    if (!t) return '';
                    const status = CAND_STATUS[c.status];
                    return `
                    <div class="cand-card candidato-card">
                        <div class="cand-card-top">
                            <div class="vaga-empresa-logo" style="background:${t.cor}">${t.inicial}</div>
                            <div class="cand-info">
                                <h3>${t.nome}</h3>
                                <span>${t.titulo} · ${t.cidade}</span>
                                <span class="cand-data">Candidatou-se em ${c.data}</span>
                            </div>
                            <span class="cand-status" style="color:${status.cor}; background:${status.bg}">${status.label}</span>
                        </div>

                        <div class="vaga-tags" style="margin-top:10px">
                            <span class="vaga-tag">${t.disponibilidade}</span>
                            <span class="vaga-tag">${t.nivel}</span>
                        </div>

                        <div class="vaga-habilidades" style="margin-top:10px">
                            ${t.habilidades.slice(0, 4).map(h => `<span class="vaga-habilidade">${h}</span>`).join('')}
                        </div>

                        <div class="candidato-acoes">
                            <button class="btn-ver-perfil-mini" onclick="abrirPerfilTrabalhador(${t.id})">Ver perfil</button>

                            ${c.status === 'analise' ? `
                                <div class="candidato-acoes-direita">
                                    <button class="btn-conversar" onclick="irView('mensagens'); abrirChatIndividual(${t.id});">💬 Conversar</button>
                                    <button class="btn-contratar" onclick="contratarCandidato(${c.vagaId}, ${t.id})">✓ Contratar</button>
                                    <button class="btn-dispensar" onclick="dispensarCandidato(${c.vagaId}, ${t.id})" title="Dispensar">✕</button>
                                </div>
                            ` : ''}
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>
    `).join('');

    atualizarStatsCandidatos();
    atualizarBadgeCandidatos();
}

function contratarCandidato(vagaId, trabalhadorId) {
    const c = candidatos.find(x => x.vagaId === vagaId && x.trabalhadorId === trabalhadorId);
    if (!c) return;
    c.status = 'contratado';

    candidatos.forEach(x => {
        if (x.vagaId === vagaId && x.trabalhadorId !== trabalhadorId && x.status === 'analise') {
            x.status = 'dispensado';
        }
    });

    renderCandidatos();
    mostrarToast('✓ Profissional contratado! A vaga foi encerrada automaticamente.');
}

function dispensarCandidato(vagaId, trabalhadorId) {
    const c = candidatos.find(x => x.vagaId === vagaId && x.trabalhadorId === trabalhadorId);
    if (!c) return;
    c.status = 'dispensado';
    renderCandidatos();
    mostrarToast('Candidato dispensado.');
}

function atualizarStatsCandidatos() {
    const total       = candidatos.length;
    const emAnalise    = candidatos.filter(c => c.status === 'analise').length;
    const contratados  = candidatos.filter(c => c.status === 'contratado').length;

    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('cand-total', total);
    set('cand-analise', emAnalise);
    set('cand-contratados', contratados);
    set('stat-candidatos-total', total);
    set('stat-contratados', contratados);
}

function atualizarBadgeCandidatos() {
    const badge = document.getElementById('badge-candidatos');
    if (!badge) return;
    const emAnalise = candidatos.filter(c => c.status === 'analise').length;
    badge.textContent = emAnalise;
    badge.style.display = emAnalise > 0 ? 'inline-flex' : 'none';
}


/* ═══════════════════════════════════════════
   PAINEL DIREITO — Vagas Ativas e Destaques
═══════════════════════════════════════════ */
function renderPainelDireito() {
    const vagasAtivasMock = [
        { titulo: 'Desenvolvedor Front-end Júnior', candidatos: 2 },
        { titulo: 'UI/UX Designer Pleno', candidatos: 1 },
    ];

    const miniVagas = document.getElementById('vagas-ativas-mini');
    if (miniVagas) {
        miniVagas.innerHTML = vagasAtivasMock.map(v => `
            <div class="recomendada-item">
                <div class="recomendada-logo" style="background:#2ecc40">📋</div>
                <div class="recomendada-info">
                    <strong>${v.titulo}</strong>
                    <span>${v.candidatos} candidato${v.candidatos !== 1 ? 's' : ''}</span>
                </div>
            </div>
        `).join('');
    }
    
    const statVagas = document.getElementById('stat-vagas-ativas');
    if (statVagas) statVagas.textContent = vagasAtivasMock.length;

    const destaques = [...trabalhadoresDB]
        .sort((a, b) => (b.projetos.length + b.portfolioCount) - (a.projetos.length + a.portfolioCount))
        .slice(0, 3);

    const containerDestaques = document.getElementById('trabalhadores-destaque');
    if (containerDestaques) {
        containerDestaques.innerHTML = destaques.map(t => `
            <div class="recomendada-item" onclick="abrirPerfilTrabalhador(${t.id})">
                <div class="recomendada-logo" style="background:${t.cor}">${t.inicial}</div>
                <div class="recomendada-info">
                    <strong>${t.nome}</strong>
                    <span>${t.titulo}</span>
                    <span class="recomendada-match">✓ ${t.projetos.length} projeto${t.projetos.length !== 1 ? 's' : ''} concluído${t.projetos.length !== 1 ? 's' : ''}</span>
                </div>
            </div>
        `).join('');
    }
}


/* ═══════════════════════════════════════════
   NOTIFICAÇÕES
═══════════════════════════════════════════ */
const notificacoes = [
    { icone: '👤', texto: 'Daniel Souza se candidatou à sua vaga.', tempo: 'Agora há pouco', lida: false },
    { icone: '💼', texto: 'Sua vaga foi visualizada 12 vezes hoje.', tempo: '2h atrás', lida: false },
    { icone: '✅', texto: 'Vaga de UI/UX Designer publicada com sucesso.', tempo: 'Ontem', lida: true },
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
    if (b) {
        b.textContent = n; 
        b.style.display = n > 0 ? 'flex' : 'none';
    }
}


/* ═══════════════════════════════════════════
   DROPDOWN AVATAR
═══════════════════════════════════════════ */
function toggleMenuPerfil() {
    document.getElementById('dropdown-perfil').classList.toggle('aberto');
    document.getElementById('dropdown-notif')?.classList.remove('aberto');
}
document.addEventListener('click', e => {
    if (!e.target.closest('.avatar-wrapper'))  document.getElementById('dropdown-perfil')?.classList.remove('aberto');
    if (!e.target.closest('.notif-wrapper'))   document.getElementById('dropdown-notif')?.classList.remove('aberto');
});


/* ═══════════════════════════════════════════
   SUPORTE
═══════════════════════════════════════════ */
function enviarSuporte(e) {
    e.preventDefault();
    mostrarToast('✓ Mensagem enviada! Nossa equipe responderá em breve.');
    document.getElementById('form-suporte').reset();
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
   SISTEMA DE CHAT E MENSAGENS COMPLETO (CORRIGIDO)
═══════════════════════════════════════════ */

function atualizarBadgeMensagens() {
    const badge = document.getElementById('badge-mensagens');
    if (badge) badge.textContent = conversasDB.length;
}

function renderMensagensView() {
    const listaContatos = document.getElementById('lista-chats-contatos');
    if (!listaContatos) return;

    if (!conversasDB.length) {
        listaContatos.innerHTML = '<p style="font-size: 12px; color: var(--text-soft); padding: 20px; text-align:center;">Nenhum chat ativo.</p>';
        return;
    }

    listaContatos.innerHTML = conversasDB.map(c => {
        const t = trabalhadoresDB.find(x => x.id === c.trabalhadorId);
        if (!t) return '';
        const ultimaMsg = c.mensagens[c.mensagens.length - 1];
        
        const classeAtivo = chatAtivoTrabalhadorId === t.id ? 'ativo' : '';
        const estiloInline = chatAtivoTrabalhadorId === t.id ? 'background: var(--green-light); border-left: 4px solid var(--green-dark);' : '';
        
        return `
            <div class="chat-item ${classeAtivo}" style="${estiloInline}" onclick="abrirChatIndividual(${t.id})">
                <div class="vaga-empresa-logo" style="background:${t.cor}; width:36px; height:36px; font-size:14px; flex-shrink:0;">${t.inicial}</div>
                <div class="chat-item-info">
                    <div class="chat-item-top">
                        <strong>${t.nome}</strong>
                        <span>${ultimaMsg ? ultimaMsg.data : ''}</span>
                    </div>
                    <p style="font-size:11px; font-weight:600; color:var(--green-dark); margin:0;">${t.titulo}</p>
                    <p>${ultimaMsg ? ultimaMsg.texto : 'Conversa iniciada'}</p>
                </div>
            </div>
        `;
    }).join('');
}

function abrirChatIndividual(id) {
    chatAtivoTrabalhadorId = id;
    
    const janelaVazia = document.getElementById('chat-janela-vazia');
    const janelaAtiva = document.getElementById('chat-janela-ativa');
    
    if (janelaVazia) janelaVazia.style.display = 'none';
    if (janelaAtiva) janelaAtiva.style.display = 'flex';

    const t = trabalhadoresDB.find(x => x.id === id);
    if (!t) return;

    // CORREÇÃO: Se não existir um chat com este candidato no array, cria um vazio para evitar tela em branco
    let conversa = conversasDB.find(c => c.trabalhadorId === id);
    if (!conversa) {
        conversa = { trabalhadorId: id, mensagens: [] };
        conversasDB.push(conversa);
    }

    const headerNome = document.getElementById('chat-header-nome');
    // CORREÇÃO: Buscando pelo ID correto ('chat-header-logo') que está no seu HTML
    const headerAvatar = document.getElementById('chat-header-logo');
    
    if (headerNome) headerNome.textContent = t.nome;
    if (headerAvatar) {
        headerAvatar.textContent = t.inicial;
        headerAvatar.style.background = t.cor;
    }

    const historico = document.getElementById('chat-historico');
    if (historico) {
        if (conversa.mensagens.length === 0) {
            historico.innerHTML = '<p style="font-size: 12px; color: var(--text-soft); padding: 20px; text-align:center;">Inicie sua conversa enviando uma mensagem abaixo!</p>';
        } else {
            historico.innerHTML = conversa.mensagens.map(m => {
                const souEu = m.enviadoPor === 'empregador';
                const estiloBalao = souEu 
                    ? 'background: var(--green); color: #fff; align-self: flex-end; border-top-right-radius: 0;' 
                    : 'background: var(--gray); color: var(--text); align-self: flex-start; border-top-left-radius: 0;';
                
                return `
                    <div class="msg-bubble" style="${estiloBalao} max-width: 75%; padding: 8px 14px; font-size: 13px; line-height: 1.4; display: inline-block; word-break: break-word; border-radius: 14px;">
                        <p style="margin:0;">${m.texto}</p>
                        <span style="font-size: 9px; opacity: 0.6; display: block; text-align: right; margin-top: 4px;">${m.data}</span>
                    </div>
                `;
            }).join('');
        }
        historico.scrollTop = historico.scrollHeight;
    }

    renderMensagensView();
    atualizarBadgeMensagens();
}

function enviarMensagemChat(e) {
    if (e) e.preventDefault();
    
    const input = document.getElementById('input-chat-texto');
    if (!input) return;

    const texto = input.value.trim();
    if (!texto || !chatAtivoTrabalhadorId) return;

    const conversa = conversasDB.find(c => c.trabalhadorId === chatAtivoTrabalhadorId);
    if (!conversa) return;

    const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    conversa.mensagens.push({
        enviadoPor: 'empregador',
        texto: texto,
        data: horaFormatada
    });

    input.value = '';
    abrirChatIndividual(chatAtivoTrabalhadorId);
}


/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
   renderTrabalhadores(trabalhadoresDB);
    renderPainelDireito();
    renderNotificacoes();
    atualizarBadge();
    atualizarBadgeCandidatos();
    atualizarBadgeMensagens(); // <-- ADICIONE ESTA LINHA
    atualizarStatsCandidatos();
    
});