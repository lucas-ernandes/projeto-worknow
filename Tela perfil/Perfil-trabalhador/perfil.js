/* ═══════════════════════════════════════════
   MODO: VISUALIZAÇÃO / EDIÇÃO
   Por padrão o perfil abre em modo visualização.
   O usuário clica em "Editar perfil" para
   desbloquear os campos.
═══════════════════════════════════════════ */
let modoEdicao = false;
 
// Snapshot dos dados antes de editar (para cancelar)
let dadosSnapshot = {};
 
function ativarEdicao() {
    modoEdicao = true;
 
    // salva snapshot antes de editar
    dadosSnapshot = capturarDados();
 
    // mostra campos de input, esconde textos de view
    document.querySelectorAll('.campo-view').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.campo-view-vazio').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.campo-editavel').forEach(el => el.style.display = '');
 
    // esconde botão editar, mostra salvar/cancelar
    document.getElementById('btn-editar').style.display = 'none';
    document.getElementById('btn-salvar-topo').style.display = '';
    document.getElementById('btn-cancelar-topo').style.display = '';
 
    // esconde áreas de view de portfolio/currículo
    document.getElementById('portfolio-view').style.display = 'none';
    document.getElementById('curriculo-view').style.display = 'none';
 
    atualizarSubtitulos(true);
    // registrar projeto  
    renderProjetosEdit(); // (14/06)

}
 
function cancelarEdicao() {
    modoEdicao = false;
 
    // restaura valores anteriores
    restaurarDados(dadosSnapshot);
    atualizarViews();
    voltarModoView();
}
 
function voltarModoView() {
    modoEdicao = false;
 
    document.querySelectorAll('.campo-editavel').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.campo-view').forEach(el => el.style.display = '');
    document.querySelectorAll('.campo-view-vazio').forEach(el => {
        // só mostra vazio se não houver conteúdo
    });
 
    document.getElementById('btn-editar').style.display = '';
    document.getElementById('btn-salvar-topo').style.display = 'none';
    document.getElementById('btn-cancelar-topo').style.display = 'none';
 
    document.getElementById('portfolio-view').style.display = '';
    document.getElementById('curriculo-view').style.display = '';
 
    atualizarSubtitulos(false);
    atualizarViews();
    calcularCompletude();
    renderProjetosView(); // (14/06)
}
 
function atualizarSubtitulos(editando) {
    document.getElementById('subtitulo-dados').textContent = editando
        ? 'Edite suas informações abaixo.'
        : 'Visualizando seu perfil público.';
    document.getElementById('subtitulo-profissional').textContent = editando
        ? 'Edite suas informações profissionais.'
        : 'Visualizando suas informações profissionais.';

    // registrar projetos
    const sp = document.getElementById('subtitulo-projetos'); // (14/06)
     if (sp) sp.textContent = editando// (14/06)
       ? 'Adicione e edite seus projetos concluídos.' // (14/06)
       : 'Compartilhe os trabalhos que você realizou.';  // (14/06)
}
 
/* Atualiza os textos de visualização com base nos inputs */
function atualizarViews() {
    const set = (viewId, val) => {
        const el = document.getElementById(viewId);
        if (!el) return;
        el.textContent = val || '—';
        el.classList.toggle('campo-view-vazio-text', !val);
    };
 
    set('view-nome',           document.getElementById('campo-nome')?.value);
    set('view-titulo',         document.getElementById('campo-titulo')?.value);
    set('view-bio',            document.getElementById('campo-bio')?.value);
    set('view-cidade',         document.getElementById('campo-cidade')?.value);
    set('view-telefone',       document.getElementById('campo-telefone')?.value);
    set('view-linkedin',       document.getElementById('campo-linkedin')?.value);
    set('view-site',           document.getElementById('campo-site')?.value);
    set('view-area',           document.getElementById('campo-area')?.value);
    set('view-disponibilidade',document.getElementById('campo-disponibilidade')?.value);
    set('view-salario',        document.getElementById('campo-salario')?.value);
    set('view-nivel',          document.getElementById('campo-nivel')?.value);
    set('view-experiencia',    document.getElementById('campo-experiencia')?.value);
    set('view-formacao',       document.getElementById('campo-formacao')?.value);
 
    // habilidades como tags visuais
    const viewHab = document.getElementById('view-habilidades');
    if (viewHab) {
        viewHab.innerHTML = tags.length
            ? tags.map(t => `<span class="habilidade-tag-view">${t}</span>`).join('')
            : '—';
    }
 
    // nome na sidebar
    const nome = document.getElementById('campo-nome')?.value.trim();
    document.getElementById('perfil-nome-exibido').textContent = nome || 'Seu Nome';
    if (nome) {
        document.getElementById('avatar-letra').textContent = nome.charAt(0).toUpperCase();
        document.getElementById('avatar-inicial')?.setAttribute &&
            (document.getElementById('avatar-inicial').textContent = nome.charAt(0).toUpperCase());
    }
 
    // portfolio e curriculo
    renderViewArquivos('portfolio');
    renderViewArquivos('curriculo');
}
 
function renderViewArquivos(tipo) {
    const viewEl   = document.getElementById(tipo + '-view');
    const vazioEl  = document.getElementById(tipo + '-view-vazio');
    const lista    = arquivos[tipo]?.filter(a => !a.erro) || [];
 
    if (!viewEl) return;
 
    if (!lista.length) {
        viewEl.innerHTML = '';
        if (vazioEl) vazioEl.style.display = '';
        return;
    }
 
    if (vazioEl) vazioEl.style.display = 'none';
    viewEl.innerHTML = lista.map(a => `
        <div class="arquivo-item">
            <span class="arquivo-icone">📄</span>
            <div class="arquivo-info">
                <span class="arquivo-nome">${a.nome}</span>
                <span class="arquivo-tamanho">${a.tamanho}</span>
                ${a.legenda ? `<span class="arquivo-legenda-view">${a.legenda}</span>` : ''}
            </div>
            <span class="arquivo-status">✓ Enviado</span>
        </div>
    `).join('');
}
 
/* Captura valores atuais para snapshot */
function capturarDados() {
    return {
        nome:           document.getElementById('campo-nome')?.value,
        titulo:         document.getElementById('campo-titulo')?.value,
        bio:            document.getElementById('campo-bio')?.value,
        cidade:         document.getElementById('campo-cidade')?.value,
        telefone:       document.getElementById('campo-telefone')?.value,
        linkedin:       document.getElementById('campo-linkedin')?.value,
        site:           document.getElementById('campo-site')?.value,
        area:           document.getElementById('campo-area')?.value,
        disponibilidade:document.getElementById('campo-disponibilidade')?.value,
        salario:        document.getElementById('campo-salario')?.value,
        nivel:          document.getElementById('campo-nivel')?.value,
        experiencia:    document.getElementById('campo-experiencia')?.value,
        formacao:       document.getElementById('campo-formacao')?.value,
        tags:           [...tags],
    };
}
 
function restaurarDados(snap) {
    if (!snap) return;
    const s = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    s('campo-nome',           snap.nome);
    s('campo-titulo',         snap.titulo);
    s('campo-bio',            snap.bio);
    s('campo-cidade',         snap.cidade);
    s('campo-telefone',       snap.telefone);
    s('campo-linkedin',       snap.linkedin);
    s('campo-site',           snap.site);
    s('campo-area',           snap.area);
    s('campo-disponibilidade',snap.disponibilidade);
    s('campo-salario',        snap.salario);
    s('campo-nivel',          snap.nivel);
    s('campo-experiencia',    snap.experiencia);
    s('campo-formacao',       snap.formacao);
    tags.length = 0;
    (snap.tags || []).forEach(t => tags.push(t));
    renderTags();
}
 /*ATE AQUIIIIIIIII===================================================================*/
 
/* ═══════════════════════════════════════════
   DROPDOWN AVATAR (header)
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
    { icone: '💼', texto: 'Uma empresa visualizou seu perfil.', tempo: 'Agora há pouco', lida: false },
    { icone: '📩', texto: 'Você recebeu uma nova proposta de trabalho.', tempo: '2h atrás', lida: false },
    { icone: '✅', texto: 'Seu perfil foi aprovado na plataforma.', tempo: 'Ontem', lida: true },
];
 
function toggleNotificacoes() {
    document.getElementById('dropdown-notif').classList.toggle('aberto');
    document.getElementById('dropdown-perfil')?.classList.remove('aberto');
}
function marcarTodasLidas() {
    notificacoes.forEach(n => n.lida = true);
    renderNotificacoes(); atualizarBadge();
}
function renderNotificacoes() {
    document.getElementById('notif-lista').innerHTML = notificacoes.map((n, i) => `
        <div class="notif-item ${n.lida ? 'lida' : ''}" onclick="lerNotificacao(${i})">
            <span class="notif-item-icone">${n.icone}</span>
            <div class="notif-item-info"><p>${n.texto}</p><span>${n.tempo}</span></div>
            ${!n.lida ? '<div class="notif-dot"></div>' : ''}
        </div>`).join('');
}
function lerNotificacao(idx) {
    notificacoes[idx].lida = true; renderNotificacoes(); atualizarBadge();
}
function atualizarBadge() {
    const n = notificacoes.filter(n => !n.lida).length;
    const b = document.getElementById('notif-badge');
    b.textContent = n; b.style.display = n > 0 ? 'flex' : 'none';
}
 
 
/* ═══════════════════════════════════════════
   NAVEGAÇÃO POR ABAS
═══════════════════════════════════════════ */
function irAba(nome) {
    document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
    document.querySelectorAll('.perfil-nav-btn').forEach(b => b.classList.remove('ativo'));
    document.getElementById('aba-' + nome).classList.add('ativa');
    document.querySelector(`.perfil-nav-btn[onclick="irAba('${nome}')"]`).classList.add('ativo');
}
 
 
/* ═══════════════════════════════════════════
   FOTO DE PERFIL
═══════════════════════════════════════════ */
document.getElementById('upload-avatar').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img   = document.getElementById('avatar-preview');
        const letra = document.getElementById('avatar-letra');
        img.src = e.target.result;
        img.style.display = 'block';
        letra.style.display = 'none';
        const headerImg = document.getElementById('avatar-header-img');
        if (headerImg) {
            headerImg.src = e.target.result;
            headerImg.style.display = 'block';
            document.getElementById('avatar-inicial').style.display = 'none';
        }
    };
    reader.readAsDataURL(file);
});
 
 
/* ═══════════════════════════════════════════
   NOME EM TEMPO REAL
═══════════════════════════════════════════ */
function atualizarNomeExibido(val) {
    const nome = val.trim() || 'Seu Nome';
    document.getElementById('perfil-nome-exibido').textContent = nome;
    document.getElementById('avatar-letra').textContent = nome.charAt(0).toUpperCase();
    calcularCompletude();
}
 
 
/* ═══════════════════════════════════════════
   CONTADOR DE CARACTERES BIO
═══════════════════════════════════════════ */
document.getElementById('campo-bio').addEventListener('input', function () {
    document.getElementById('bio-count').textContent = this.value.length;
    calcularCompletude();
});
 
 
/* ═══════════════════════════════════════════
   TAGS DE HABILIDADES
═══════════════════════════════════════════ */
const tags = [];
 
function adicionarTag(e) {
    if (e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();
    const input = document.getElementById('tag-input');
    const valor = input.value.trim().replace(/,$/, '');
    if (!valor || tags.includes(valor) || tags.length >= 15) return;
    tags.push(valor);
    renderTags();
    input.value = '';
    calcularCompletude();
}
 
function removerTag(idx) {
    tags.splice(idx, 1);
    renderTags();
    calcularCompletude();
}
 
function renderTags() {
    document.getElementById('tags-lista').innerHTML = tags.map((t, i) => `
        <span class="tag">
            ${t}
            <button onclick="removerTag(${i})" title="Remover">&times;</button>
        </span>`).join('');
}
 
document.querySelector('.tags-input-wrapper')?.addEventListener('click', () => {
    document.getElementById('tag-input').focus();
});
 
 
/* ═══════════════════════════════════════════
   MÁSCARA – TELEFONE
═══════════════════════════════════════════ */
document.getElementById('campo-telefone').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10)     v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/,        '($1) $2');
    else if (v.length > 0) v = '(' + v;
    this.value = v;
});
 
 
/* ═══════════════════════════════════════════
   UPLOAD DE ARQUIVOS
═══════════════════════════════════════════ */
const MAX_MB = 5;
const arquivos = { portfolio: [], curriculo: [] };
 
function processarArquivos(fileList, tipo) {
    Array.from(fileList).forEach(file => adicionarArquivo(file, tipo));
}
 
function adicionarArquivo(file, tipo) {
    if (tipo === 'curriculo') arquivos.curriculo = [];
    const erros = [];
    if (!file.name.toLowerCase().endsWith('.pdf')) erros.push('Formato inválido (apenas PDF)');
    if (file.size > MAX_MB * 1024 * 1024) erros.push(`Tamanho excede ${MAX_MB}MB`);
    arquivos[tipo].push({
        nome: file.name,
        tamanho: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        legenda: '',
        erro: erros[0] || null,
    });
    renderArquivos(tipo);
    calcularCompletude();
}
 
function removerArquivo(tipo, idx) {
    arquivos[tipo].splice(idx, 1);
    renderArquivos(tipo);
    calcularCompletude();
}
 
function atualizarLegenda(tipo, idx, valor) {
    arquivos[tipo][idx].legenda = valor;
}
 
function renderArquivos(tipo) {
    const lista = document.getElementById('lista-' + tipo);
    if (!arquivos[tipo].length) { lista.innerHTML = ''; return; }
    lista.innerHTML = arquivos[tipo].map((a, i) => `
        <div class="arquivo-item">
            <span class="arquivo-icone">📄</span>
            <div class="arquivo-info">
                <span class="arquivo-nome">${a.nome}</span>
                <span class="arquivo-tamanho">${a.tamanho}</span>
                ${!a.erro ? `<input class="arquivo-legenda" type="text" maxlength="80"
                    placeholder="Legenda (opcional)..." value="${a.legenda}"
                    oninput="atualizarLegenda('${tipo}', ${i}, this.value)">` : ''}
            </div>
            <span class="arquivo-status ${a.erro ? 'erro' : ''}">
                ${a.erro ? '⚠ ' + a.erro : '✓ Pronto'}
            </span>
            <button class="arquivo-remover" onclick="removerArquivo('${tipo}', ${i})">✕</button>
        </div>`).join('');
}
 
function dragOver(e)  { e.preventDefault(); e.currentTarget.classList.add('dragover'); }
function dragLeave(e) { e.currentTarget.classList.remove('dragover'); }
function dropArquivo(e, tipo) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    processarArquivos(e.dataTransfer.files, tipo);
}
 
 
/* ═══════════════════════════════════════════
   BARRA DE COMPLETUDE
═══════════════════════════════════════════ */
function calcularCompletude() {
    const checks = [
        !!document.getElementById('campo-nome').value.trim(),
        !!document.getElementById('campo-titulo').value.trim(),
        !!document.getElementById('campo-bio').value.trim(),
        !!document.getElementById('campo-cidade').value.trim(),
        !!document.getElementById('campo-area').value,
        tags.length > 0,
        arquivos.portfolio.some(a => !a.erro),
        arquivos.curriculo.some(a => !a.erro),
    ];
    const pct = Math.round((checks.filter(Boolean).length / checks.length) * 100);
    document.getElementById('pct-completude').textContent = pct + '%';
    document.getElementById('barra-fill').style.width = pct + '%';
    const dicas = [
        [!checks[0], 'Adicione seu nome completo.'],
        [!checks[1], 'Adicione um título profissional.'],
        [!checks[2], 'Escreva um pouco sobre você.'],
        [!checks[4], 'Selecione sua área de atuação.'],
        [!checks[5], 'Adicione pelo menos uma habilidade.'],
        [!checks[6], 'Envie um arquivo de portfólio.'],
    ];
    const proxima = dicas.find(([falta]) => falta);
    document.getElementById('completude-dica').textContent = proxima
        ? '👉 ' + proxima[1]
        : '🎉 Perfil completo! Você já aparece nas buscas.';
}
 
 
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
═══════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
     calcularCompletude();
    renderNotificacoes();
    atualizarBadge();

    const hash = window.location.hash.replace('#', '');

    if (hash === 'habilidade') {
        irAba('profissional');

        setTimeout(() => {
            document.getElementById('habilidade')
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
});