/* ═══════════════════════════════════════════
   DROPDOWN DO AVATAR (header)
═══════════════════════════════════════════ */
function toggleMenuPerfil() {
    document.getElementById('dropdown-perfil').classList.toggle('aberto');
    // fecha notificações se abrir avatar
    document.getElementById('dropdown-notif')?.classList.remove('aberto');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.avatar-wrapper')) {
        document.getElementById('dropdown-perfil')?.classList.remove('aberto');
    }
    if (!e.target.closest('.notif-wrapper')) {
        document.getElementById('dropdown-notif')?.classList.remove('aberto');
    }
});


/* ═══════════════════════════════════════════
   SININHO DE NOTIFICAÇÕES
═══════════════════════════════════════════ */
const notificacoes = [
    { icone: '💼', texto: 'Uma empresa visualizou seu perfil.', tempo: 'Agora há pouco', lida: false },
    { icone: '📩', texto: 'Você recebeu uma nova proposta de trabalho.', tempo: '2h atrás', lida: false },
    { icone: '✅', texto: 'Seu perfil foi aprovado na plataforma.', tempo: 'Ontem', lida: false },
];

function toggleNotificacoes() {
    const dropdown = document.getElementById('dropdown-notif');
    dropdown.classList.toggle('aberto');
    document.getElementById('dropdown-perfil')?.classList.remove('aberto');
}

function marcarTodasLidas() {
    notificacoes.forEach(n => n.lida = true);
    renderNotificacoes();
    atualizarBadge();
}

function renderNotificacoes() {
    const lista = document.getElementById('notif-lista');
    if (!lista) return;

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
    if (!badge) return;
    badge.textContent = naoLidas;
    badge.style.display = naoLidas > 0 ? 'flex' : 'none';
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
        const img = document.getElementById('avatar-preview');
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
   NOME EXIBIDO EM TEMPO REAL
═══════════════════════════════════════════ */
function atualizarNomeExibido(val) {
    const nome = val.trim() || 'Seu Nome';
    document.getElementById('perfil-nome-exibido').textContent = nome;
    document.getElementById('avatar-inicial').textContent = nome.charAt(0).toUpperCase();
    document.getElementById('avatar-letra').textContent  = nome.charAt(0).toUpperCase();
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
    const lista = document.getElementById('tags-lista');
    lista.innerHTML = tags.map((t, i) => `
        <span class="tag">
            ${t}
            <button onclick="removerTag(${i})" title="Remover">&times;</button>
        </span>
    `).join('');
}

document.querySelector('.tags-input-wrapper').addEventListener('click', () => {
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
   UPLOAD DE ARQUIVOS (portfólio e currículo)
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
        legenda: '',   // ← campo de legenda
        erro: erros[0] || null
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
        <div class="arquivo-item ${a.erro ? 'arquivo-erro' : ''}">
            <span class="arquivo-icone">📄</span>
            <div class="arquivo-info">
                <span class="arquivo-nome">${a.nome}</span>
                <span class="arquivo-tamanho">${a.tamanho}</span>
                ${!a.erro ? `
                <input
                    class="arquivo-legenda"
                    type="text"
                    maxlength="80"
                    placeholder="Adicione uma legenda (opcional)..."
                    value="${a.legenda}"
                    oninput="atualizarLegenda('${tipo}', ${i}, this.value)"
                >` : ''}
            </div>
            <span class="arquivo-status ${a.erro ? 'erro' : ''}">
                ${a.erro ? '⚠ ' + a.erro : '✓ Pronto'}
            </span>
            <button class="arquivo-remover" onclick="removerArquivo('${tipo}', ${i})" title="Remover">✕</button>
        </div>
    `).join('');
}

function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function dragLeave(e) {
    e.currentTarget.classList.remove('dragover');
}

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
    mostrarToast('✓ Perfil salvo com sucesso!');
    calcularCompletude();
}

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