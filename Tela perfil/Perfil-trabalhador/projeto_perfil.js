/* ═══════════════════════════════════════════
   PROJETOS CONCLUÍDOS
   Critérios de aceitação implementados:
   - Cenário 1: salvar projeto com campos válidos
   - Cenário 2: bloquear se título ou descrição vazios
   - Cenário 3: exibir projetos em modo visualização
   - Cenário 4: editar projeto existente
   - Cenário 5: excluir com confirmação
═══════════════════════════════════════════ */

const projetos = [];
let projetoEditandoId = null;
let imagemProjetoBase64 = null;

/* ── Abre o formulário para NOVO projeto ── */
function abrirFormProjeto() {
    projetoEditandoId = null;
    imagemProjetoBase64 = null;
    limparFormProjeto();
    document.getElementById('projeto-form-titulo').textContent = 'Novo projeto';
    document.getElementById('projeto-form').style.display = 'block';
    document.getElementById('proj-titulo').focus();
    document.getElementById('btn-add-projeto').style.display = 'none';
}

/* ── Abre o formulário para EDITAR projeto (Cenário 4) ── */
function editarProjeto(id) {
    const proj = projetos.find(p => p.id === id);
    if (!proj) return;

    projetoEditandoId = id;
    imagemProjetoBase64 = proj.imagem || null;

    document.getElementById('proj-titulo').value    = proj.titulo;
    document.getElementById('proj-descricao').value = proj.descricao;
    document.getElementById('proj-area').value      = proj.area || '';
    document.getElementById('proj-data').value      = proj.data || '';
    document.getElementById('proj-link').value      = proj.link || '';

    // preview da imagem se houver
    if (proj.imagem) {
        document.getElementById('proj-img-preview-wrap').innerHTML =
            `<img src="${proj.imagem}" style="width:100%;max-height:120px;object-fit:cover;border-radius:8px">`;
    }

    document.getElementById('projeto-form-titulo').textContent = 'Editar projeto';
    document.getElementById('projeto-form').style.display = 'block';
    document.getElementById('btn-add-projeto').style.display = 'none';
    document.getElementById('proj-titulo').focus();
}

/* ── Fecha o formulário ── */
function fecharFormProjeto() {
    document.getElementById('projeto-form').style.display = 'none';
    document.getElementById('btn-add-projeto').style.display = '';
    limparFormProjeto();
    projetoEditandoId = null;
    imagemProjetoBase64 = null;
}

function limparFormProjeto() {
    ['proj-titulo','proj-descricao','proj-link'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const area = document.getElementById('proj-area');
    if (area) area.selectedIndex = 0;
    const data = document.getElementById('proj-data');
    if (data) data.value = '';
    document.getElementById('proj-img-preview-wrap').innerHTML = '🖼️';
    document.getElementById('erro-proj-titulo').textContent = '';
    document.getElementById('erro-proj-descricao').textContent = '';
}

/* ── Preview da imagem de capa ── */
function previewImagemProjeto(input) {
    const file = input.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
        mostrarToast('⚠ Imagem muito grande. Máximo 3MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        imagemProjetoBase64 = e.target.result;
        document.getElementById('proj-img-preview-wrap').innerHTML =
            `<img src="${e.target.result}" style="width:100%;max-height:120px;object-fit:cover;border-radius:8px">`;
    };
    reader.readAsDataURL(file);
}

/* ── Salvar projeto (Cenário 1 + 2 + 4) ── */
function salvarProjeto() {
    const titulo    = document.getElementById('proj-titulo').value.trim();
    const descricao = document.getElementById('proj-descricao').value.trim();
    const area      = document.getElementById('proj-area').value;
    const data      = document.getElementById('proj-data').value;
    const link      = document.getElementById('proj-link').value.trim();

    // Cenário 2: validação de campos obrigatórios
    let valido = true;

    if (!titulo) {
        document.getElementById('erro-proj-titulo').textContent = 'O título do projeto é obrigatório.';
        valido = false;
    } else {
        document.getElementById('erro-proj-titulo').textContent = '';
    }

    if (!descricao) {
        document.getElementById('erro-proj-descricao').textContent = 'A descrição do projeto é obrigatória.';
        valido = false;
    } else {
        document.getElementById('erro-proj-descricao').textContent = '';
    }

    if (!valido) return;

    if (projetoEditandoId !== null) {
        // Edição
        const idx = projetos.findIndex(p => p.id === projetoEditandoId);
        if (idx !== -1) {
            projetos[idx] = { ...projetos[idx], titulo, descricao, area, data, link, imagem: imagemProjetoBase64 };
        }
        mostrarToast('✓ Projeto atualizado!');
    } else {
        // Novo projeto (Cenário 1)
        projetos.push({
            id: Date.now(),
            titulo, descricao, area, data, link,
            imagem: imagemProjetoBase64,
            criadoEm: new Date().toLocaleDateString('pt-BR'),
        });
        mostrarToast('✓ Projeto salvo com sucesso!');
    }

    fecharFormProjeto();
    renderProjetos();
}

/* ── Excluir projeto com confirmação (Cenário 5) ── */
function excluirProjeto(id) {
    const proj = projetos.find(p => p.id === id);
    if (!proj) return;

    // Cria modal de confirmação inline
    const modal = document.getElementById('modal-confirmacao');
    document.getElementById('modal-msg').textContent =
        `Tem certeza que deseja excluir "${proj.titulo}"? Essa ação não pode ser desfeita.`;
    document.getElementById('modal-confirmar').onclick = () => {
        const idx = projetos.findIndex(p => p.id === id);
        projetos.splice(idx, 1);
        fecharModal();
        renderProjetos();
        mostrarToast('🗑 Projeto removido.');
    };
    modal.style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-confirmacao').style.display = 'none';
}

/* ── Renderizar projetos ── */
function renderProjetos() {
    renderProjetosView();
    renderProjetosEdit();
}

// Modo visualização (Cenário 3)
function renderProjetosView() {
    const lista  = document.getElementById('lista-projetos-view');
    const vazio  = document.getElementById('projetos-view-vazio');
    if (!lista) return;

    if (!projetos.length) {
        lista.innerHTML = '';
        vazio.style.display = '';
        return;
    }

    vazio.style.display = 'none';
    lista.innerHTML = projetos.map(p => `
        <div class="projeto-card">
            ${p.imagem ? `<img src="${p.imagem}" class="projeto-capa" alt="Capa do projeto">` : ''}
            <div class="projeto-card-body">
                <div class="projeto-card-top">
                    <div>
                        <h3 class="projeto-titulo">${p.titulo}</h3>
                        <div class="projeto-meta">
                            ${p.area ? `<span class="projeto-tag">${p.area}</span>` : ''}
                            ${p.data ? `<span class="projeto-tag">📅 ${formatarData(p.data)}</span>` : ''}
                        </div>
                    </div>
                </div>
                <p class="projeto-desc">${p.descricao}</p>
                ${p.link ? `<a href="${p.link}" target="_blank" class="projeto-link">🔗 Ver projeto</a>` : ''}
                <span class="projeto-data-criacao">Adicionado em ${p.criadoEm}</span>
            </div>
        </div>
    `).join('');
}

// Modo edição — cards com botões editar/excluir
function renderProjetosEdit() {
    const lista = document.getElementById('lista-projetos-edit');
    if (!lista) return;

    lista.innerHTML = projetos.map(p => `
        <div class="projeto-card">
            ${p.imagem ? `<img src="${p.imagem}" class="projeto-capa" alt="Capa">` : ''}
            <div class="projeto-card-body">
                <div class="projeto-card-top">
                    <div>
                        <h3 class="projeto-titulo">${p.titulo}</h3>
                        <div class="projeto-meta">
                            ${p.area ? `<span class="projeto-tag">${p.area}</span>` : ''}
                            ${p.data ? `<span class="projeto-tag">📅 ${formatarData(p.data)}</span>` : ''}
                        </div>
                    </div>
                    <div class="projeto-acoes">
                        <button class="btn-proj-editar" onclick="editarProjeto(${p.id})">✏️ Editar</button>
                        <button class="btn-proj-excluir" onclick="excluirProjeto(${p.id})">🗑 Excluir</button>
                    </div>
                </div>
                <p class="projeto-desc">${p.descricao}</p>
                ${p.link ? `<a href="${p.link}" target="_blank" class="projeto-link">🔗 Ver projeto</a>` : ''}
            </div>
        </div>
    `).join('');
}

function formatarData(mesAno) {
    if (!mesAno) return '';
    const [ano, mes] = mesAno.split('-');
    const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    return `${meses[parseInt(mes) - 1]} ${ano}`;
}
