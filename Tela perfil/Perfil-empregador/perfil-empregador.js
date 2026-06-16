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

    set('view-nome',      document.getElementById('campo-nome')?.value);
    set('view-ramo',      document.getElementById('campo-ramo')?.value);
    set('view-cnpj',      document.getElementById('campo-cnpj')?.value);
    set('view-porte',     document.getElementById('campo-porte')?.value);
    set('view-bio',       document.getElementById('campo-bio')?.value);
    set('view-cidade',    document.getElementById('campo-cidade')?.value);
    set('view-modalidade',document.getElementById('campo-modalidade')?.value);
    set('view-email',     document.getElementById('campo-email')?.value);
    set('view-telefone',  document.getElementById('campo-telefone')?.value);
    set('view-site',      document.getElementById('campo-site')?.value);
    set('view-linkedin',  document.getElementById('campo-linkedin')?.value);

    // nome e inicial na sidebar
    const nome = document.getElementById('campo-nome')?.value.trim();
    document.getElementById('perfil-nome-exibido').textContent = nome || 'Seu nome completo';
    if (nome) {
        const inicial = nome.charAt(0).toUpperCase();
        document.getElementById('avatar-letra').textContent  = inicial;
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
    document.getElementById('avatar-letra').textContent  = inicial;
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
    if (v.length > 12)     v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    else if (v.length > 8) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/,        '$1.$2.$3/$4');
    else if (v.length > 5) v = v.replace(/(\d{2})(\d{3})(\d{0,3})/,               '$1.$2.$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,3})/,                      '$1.$2');
    this.value = v;
});

document.getElementById('campo-telefone').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10)     v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/,        '($1) $2');
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
    document.getElementById('erro-orcamento').textContent = '';
    document.getElementById('erro-prazo').textContent = '';

    const titulo    = document.getElementById('vaga-titulo').value.trim();
    const area      = document.getElementById('vaga-area').value;
    const tipo      = document.getElementById('vaga-tipo').value;
    const descricao = document.getElementById('vaga-descricao').value.trim();
    const orcamento = document.getElementById('vaga-orcamento').value.trim();
    const prazo     = document.getElementById('vaga-prazo').value.trim();
    const modalidade= document.getElementById('vaga-modalidade').value;
    const nivel     = document.getElementById('vaga-nivel').value;
    const local     = document.getElementById('vaga-local').value.trim();
    const qtd       = document.getElementById('vaga-quantidade').value;
    const beneficios= document.getElementById('vaga-beneficios').value.trim();

    let bloqueado = false;
    if (!orcamento) { document.getElementById('erro-orcamento').textContent = 'O orçamento proposto é obrigatório para publicar a vaga.'; bloqueado = true; }
    if (!prazo)     { document.getElementById('erro-prazo').textContent = 'O prazo esperado é obrigatório para publicar a vaga.'; bloqueado = true; }
    if (!titulo || !area || !tipo || !descricao) { mostrarToast('⚠ Preencha todos os campos obrigatórios.'); return; }
    if (bloqueado) return;

    vagas.push({
        id: Date.now(), titulo, area, tipo, descricao, orcamento, prazo,
        modalidade, nivel, local, qtd: qtd || '1', beneficios,
        habilidades: [...tagsVaga], status: 'ativa',
        data: new Date().toLocaleDateString('pt-BR'), candidatos: 0,
    });

    renderVagas();
    atualizarStatVagas();
    limparFormVaga();
    irAba('vagas');
    mostrarToast('🚀 Vaga publicada com sucesso!');
}

function salvarRascunho() {
    const titulo = document.getElementById('vaga-titulo').value.trim();
    if (!titulo) { mostrarToast('⚠ Adicione pelo menos um título para salvar o rascunho.'); return; }
    mostrarToast('💾 Rascunho salvo!');
}

function encerrarVaga(id) {
    const vaga = vagas.find(v => v.id === id);
    if (!vaga) return;
    vaga.status = vaga.status === 'ativa' ? 'encerrada' : 'ativa';
    renderVagas();
    mostrarToast(vaga.status === 'ativa' ? '✓ Vaga reativada!' : '✓ Vaga encerrada.');
}

function excluirVaga(id) {
    const idx = vagas.findIndex(v => v.id === id);
    if (idx === -1) return;
    vagas.splice(idx, 1);
    renderVagas();
    atualizarStatVagas();
    mostrarToast('🗑 Vaga removida.');
}

function renderVagas(lista = vagas) {
    const container = document.getElementById('lista-vagas');
    if (!lista.length) {
        container.innerHTML = `<div class="vagas-empty"><span>📭</span><p>Você ainda não publicou nenhuma vaga.</p><button onclick="irAba('publicar')">Publicar primeira vaga</button></div>`;
        return;
    }
    container.innerHTML = lista.map(v => `
        <div class="vaga-card ${v.status === 'encerrada' ? 'encerrada' : ''}">
            <div class="vaga-card-top">
                <div>
                    <h3>${v.titulo}</h3>
                    <div class="vaga-card-tags">
                        <span class="vaga-tag">${v.area}</span>
                        <span class="vaga-tag">${v.tipo}</span>
                        ${v.modalidade ? `<span class="vaga-tag">${v.modalidade}</span>` : ''}
                        <span class="vaga-tag vaga-tag-status ${v.status}">${v.status === 'ativa' ? '🟢 Ativa' : '🔴 Encerrada'}</span>
                    </div>
                </div>
                <div class="vaga-card-meta">
                    <span>💰 ${v.orcamento}</span>
                    <span>📅 ${v.prazo}</span>
                    <span>Publicada em ${v.data}</span>
                    <span>👥 ${v.candidatos} candidato(s)</span>
                </div>
            </div>
            <p class="vaga-card-desc">${v.descricao.length > 160 ? v.descricao.slice(0, 160) + '...' : v.descricao}</p>
            <div class="vaga-card-actions">
                <button class="btn-vaga-acao" onclick="encerrarVaga(${v.id})">${v.status === 'ativa' ? '⏹ Encerrar' : '▶ Reativar'}</button>
                <button class="btn-vaga-acao danger" onclick="excluirVaga(${v.id})">🗑 Excluir</button>
            </div>
        </div>`).join('');
}

function filtrarVagas(termo) {
    const filtradas = vagas.filter(v =>
        v.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        v.area.toLowerCase().includes(termo.toLowerCase()));
    renderVagas(filtradas);
}

function atualizarStatVagas() {
    document.getElementById('stat-vagas').textContent = vagas.length;
    document.getElementById('stat-candidatos').textContent = vagas.reduce((acc, v) => acc + v.candidatos, 0);
}

function limparFormVaga() {
    ['vaga-titulo','vaga-descricao','vaga-orcamento','vaga-prazo','vaga-local','vaga-quantidade','vaga-beneficios']
        .forEach(id => document.getElementById(id).value = '');
    ['vaga-area','vaga-tipo','vaga-modalidade','vaga-nivel']
        .forEach(id => document.getElementById(id).selectedIndex = 0);
    tagsVaga.length = 0;
    renderTagsVaga();
    document.getElementById('desc-count').textContent = '0';
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

['campo-nome','campo-ramo','campo-bio','campo-cidade','campo-email'].forEach(id => {
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