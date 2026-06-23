<?php
session_start();

$host = "localhost";
$banco = "worknow";
$usuario = "root";
$senha_banco = "";

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha_banco);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
    exit;
}

$usuario_id = $_SESSION['usuario_id'] ?? null;
$perfil = null;

if ($usuario_id) {
    // 1. Busca os dados do perfil do trabalhador
    $sql = "SELECT * FROM perfil_trabalhador WHERE usuario_id = :usuario_id LIMIT 1";
    $stmt = $conexao->prepare($sql);
    $stmt->bindParam(':usuario_id', $usuario_id);
    $stmt->execute();
    $perfil = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. Busca o NOME e o TELEFONE lá na tabela de usuários gerais
    $sql_nome = "SELECT nome, telefone FROM usuario WHERE id = :usuario_id LIMIT 1";
    $stmt_nome = $conexao->prepare($sql_nome);
    $stmt_nome->bindParam(':usuario_id', $usuario_id);
    $stmt_nome->execute();
    $usuario_geral = $stmt_nome->fetch(PDO::FETCH_ASSOC);
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WorkNOW – Perfil Trabalhador</title>
    <link rel="stylesheet" href="../../style.css">
    <link rel="stylesheet" href="perfil.css">
    <link rel="icon" type="image/png" href="../../img/logo.png">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Spinnaker&display=swap"
        rel="stylesheet">
</head>

<body>

    <header>
        <h1><span class="logo-work">Work</span><span class="logo-now">NOW</span></h1>
        <nav>
            <!--NOtificaçãoooo-->
            <div class="notif-wrapper">
                <button class="btn-notificacao" onclick="toggleNotificacoes()" aria-label="Notificações">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2">
                        <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                    <span class="notif-badge" id="notif-badge">3</span>
                </button>

                <!-- Dropdown de notificações -->
                <div class="dropdown-notif" id="dropdown-notif">
                    <div class="notif-header">
                        <strong>Notificações</strong>
                        <button onclick="marcarTodasLidas()">Marcar todas como lidas</button>
                    </div>
                    <div class="notif-lista" id="notif-lista"></div>
                    <div class="notif-footer">
                        <a href="#">Ver todas</a>
                    </div>
                </div>
            </div>
            <a href="../../Tela_Dashboard/dashboard_trabalhador.php"><button>Início</button></a>

            <div class="avatar-wrapper" onclick="toggleMenuPerfil()">
                <img src="../../img/avatar-default.png" alt="Foto de perfil" class="avatar-header" id="avatar-header-img"
                    onerror="this.src=''; this.style.display='none'; document.getElementById('avatar-inicial').style.display='flex'">
                <div class="avatar-inicial" id="avatar-inicial">U</div>
                <div class="dropdown-perfil" id="dropdown-perfil">
                    <a href="#">👤 Meu Perfil</a>
                    <hr>
                    <a href="../../index.html" class="sair">🚪 Sair</a>
                </div>
            </div>
        </nav>
    </header>
    <!--Mudei aq ate-->
    <div class="perfil-container">
        <div class="perfil-card-unico">

            <aside class="perfil-sidebar">
                <div class="avatar-area">
                    <div class="avatar-grande" id="avatar-grande">
                        <img src="" alt="Foto de perfil" id="avatar-preview" onerror="this.style.display='none'">
                        <span id="avatar-letra">U</span>
                        <label for="upload-avatar" class="btn-trocar-foto campo-editavel" title="Trocar foto"
                            style="display:none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5" width="16" height="16">
                                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                        </label>
                        <input type="file" id="upload-avatar" accept="image/*" style="display:none">
                    </div>
                    <h2 class="perfil-nome" id="perfil-nome-exibido"><?php echo $_SESSION['usuario_nome']; ?></h2>
                    <span class="perfil-badge">👨‍💻 Trabalhador</span>

                    <button class="btn-modo-editar" id="btn-editar" onclick="ativarEdicao()"> Editar perfil</button>
                    <button class="btn-modo-salvar campo-editavel" id="btn-salvar-topo" onclick="salvarPerfil()"
                        style="display:none">💾 Salvar alterações</button>
                    <button class="btn-modo-cancelar campo-editavel" id="btn-cancelar-topo" onclick="cancelarEdicao()"
                        style="display:none">✕ Cancelar</button>
                </div>

                <div class="perfil-completude">
                    <div class="completude-header">
                        <span>Perfil completo</span>
                        <strong id="pct-completude">0%</strong>
                    </div>
                    <div class="barra-completude">
                        <div class="barra-fill" id="barra-fill"></div>
                    </div>
                    <p class="completude-dica" id="completude-dica">Preencha seu perfil para aparecer nas buscas.</p>
                </div>

                <nav class="perfil-nav">
                    <button class="perfil-nav-btn ativo" onclick="irAba('dados')">📋 Dados pessoais</button>
                    <button class="perfil-nav-btn" onclick="irAba('profissional')">💼 Perfil profissional</button>
                    <button class="perfil-nav-btn" onclick="irAba('portfolio')">🗂️ Portfólio</button>
                    <button class="perfil-nav-btn" onclick="irAba('curriculo')">📄 Currículo</button>
                    <button class="perfil-nav-btn" onclick="irAba('projetos')">🚀 Projetos</button>
                </nav>
                <button class="btn-sidebar-verde" onclick="irParaNovoProjeto()">
                    ＋ Publicar Projeto
                </button>
            </aside>

            <main class="perfil-main">
                <form action="trabalhadorBD.php" method="POST" enctype="multipart/form-data">

                    <section class="aba ativa" id="aba-dados">
                    
                    <div class="aba-header">
                        <h2>Dados pessoais</h2>
                        <p id="subtitulo-dados">Visualizando seu perfil público.</p>
                    </div>

                    <div class="form-grid">
                        
                        <div class="campo">
                            <label>Nome completo</label>
                            <p class="campo-view" id="view-nome">—</p>
                            <input class="campo-editavel" type="text" name="nome" id="campo-nome" value="<?php echo htmlspecialchars($usuario_geral['nome'] ?? ''); ?>" placeholder="Seu nome completo" 
                                oninput="atualizarNomeExibido(this.value)" style="display:none">
                        </div>
                        
                        <div class="campo">
                            <label>Título profissional</label>
                            <p class="campo-view" id="view-titulo">—</p>
                            <input class="campo-editavel" type="text" name="titulo" id="campo-titulo" value="<?php echo htmlspecialchars($perfil['titulo'] ?? ''); ?>" placeholder="Ex: Desenvolvedor Full Stack, Designer UX..." style="display:none">
                        </div>
                        
                        <div class="campo campo-full">
                            <label>Sobre mim</label>
                            <p class="campo-view" id="view-bio">—</p>
                            <textarea class="campo-editavel" name="biografia" id="campo-bio" placeholder="Conte um pouco sobre você..."
                                rows="4" maxlength="500" style="display:none"><?php echo htmlspecialchars($perfil['bio'] ?? ''); ?></textarea>
                            <span class="char-count campo-editavel" style="display:none">
                                <span id="bio-count">0</span>/500
                            </span>
                        </div>

                        <div class="campo">
                            <label>Cidade</label>
                            <p class="campo-view" id="view-cidade">—</p>
                            <input class="campo-editavel" type="text" name="cidade" id="campo-cidade" placeholder="Ex: São Paulo, SP" value="<?php echo htmlspecialchars($perfil['cidade'] ?? ''); ?>" style="display:none">
                        </div>

                        <div class="campo">
                            <label>Telefone</label>
                            <p class="campo-view" id="view-telefone">—</p>
                            <input class="campo-editavel" type="text" name="telefone" id="campo-telefone" value="<?php echo htmlspecialchars($usuario_geral['telefone'] ?? ''); ?>" placeholder="(00) 00000-0000" maxlength="15"inputmode="numeric" style="display:none">
                        </div>

                        <div class="campo">
                            <label>LinkedIn</label>
                            <p class="campo-view" id="view-linkedin">—</p>
                            <input class="campo-editavel" type="url" name="url_linkedin" id="campo-linkedin" value="<?php echo htmlspecialchars($perfil['link_linkedin'] ?? ''); ?>" placeholder="https://linkedin.com/in/seu-perfil" style="display:none">
                        </div>

                        <div class="campo">
                            <label>Portfólio / Site</label>
                            <p class="campo-view" id="view-site">—</p>
                            <input class="campo-editavel" type="url" name="url_portfolio" id="campo-site" value="<?php echo htmlspecialchars($perfil['link_portfolio'] ?? ''); ?>" placeholder="https://seusite.com" style="display:none">
                        </div>
                    </div>

                    <div class="aba-actions campo-editavel" style="display:none">
                        <button type="submit" class="btn-salvar" onclick="salvarPerfil()">Salvar dados</button>
                    </div>
                </section>

                <section class="aba" id="aba-profissional">
                    <div class="aba-header">
                        <h2>Perfil profissional</h2>
                        <p id="subtitulo-profissional">Visualizando suas informações profissionais.</p>
                    </div>

                    <div class="form-grid">
                        <div class="campo">
                            <label>Área de atuação</label>
                            <p class="campo-view" id="view-area">—</p>
                            <select class="campo-editavel" name="area_atuacao" id="campo-area" style="display:none">
                                <option value="" disabled selected <?php echo empty($perfil['area']) ? 'selected' : ''; ?>>
                                    Selecione sua área
                                </option>

                                <option value="Tecnologia da Informação" <?php echo ($perfil['area'] ?? '') === 'Tecnologia da Informação' ? 'selected' : ''; ?>>
                                    Tecnologia da Informação
                                </option>

                                <option value="Design & UX" <?php echo ($perfil['area'] ?? '') === 'Design & UX' ? 'selected' : ''; ?>>
                                    Design & UX
                                </option>

                                <option value="Marketing & Comunicação" <?php echo ($perfil['area'] ?? '') === 'Marketing & Comunicação' ? 'selected' : ''; ?>>
                                    Marketing & Comunicação
                                </option>

                                <option value="Construção Civil" <?php echo ($perfil['area'] ?? '') === 'Construção Civil' ? 'selected' : ''; ?>>
                                    Construção Civil
                                </option>

                                <option value="Saúde & Bem-estar" <?php echo ($perfil['area'] ?? '') === 'Saúde & Bem-estar' ? 'selected' : ''; ?>>
                                    Saúde & Bem-estar
                                </option>

                                <option value="Educação" <?php echo ($perfil['area'] ?? '') === 'Educação' ? 'selected' : ''; ?>>
                                    Educação
                                </option>

                                <option value="Logística & Transporte" <?php echo ($perfil['area'] ?? '') === 'Logística & Transporte' ? 'selected' : ''; ?>>
                                    Logística & Transporte
                                </option>

                                <option value="Gastronomia" <?php echo ($perfil['area'] ?? '') === 'Gastronomia' ? 'selected' : ''; ?>>
                                    Gastronomia
                                </option>

                                <option value="Administrativo & Financeiro" <?php echo ($perfil['area'] ?? '') === 'Administrativo & Financeiro' ? 'selected' : ''; ?>>
                                    Administrativo & Financeiro
                                </option>

                                <option value="Outro" <?php echo ($perfil['area'] ?? '') === 'Outro' ? 'selected' : ''; ?>>
                                    Outro
                                </option>
                            </select>
                        </div>
                        <div class="campo">
                            <label>Disponibilidade</label>
                            <p class="campo-view" id="view-disponibilidade">—</p>
                            <select class="campo-editavel" name="disponivel" id="campo-disponibilidade" style="display:none">
                                <option value="" disabled selected <?php echo empty($perfil['disponibilidade']) ? 'selected' : ''; ?>>
                                    Selecione
                                </option>

                                <option value="Integral" <?php echo ($perfil['disponibilidade'] ?? '') === 'Integral' ? 'selected' : ''; ?>>
                                    Integral
                                </option>

                                <option value="Meio período" <?php echo ($perfil['disponibilidade'] ?? '') === 'Meio período' ? 'selected' : ''; ?>>
                                    Meio período
                                </option>

                                <option value="Fins de semana" <?php echo ($perfil['disponibilidade'] ?? '') === 'Fins de semana' ? 'selected' : ''; ?>>
                                    Fins de semana
                                </option>

                                <option value="Freelance / Projeto" <?php echo ($perfil['disponibilidade'] ?? '') === 'Freelance / Projeto' ? 'selected' : ''; ?>>
                                    Freelance / Projeto
                                </option>

                                <option value="Remoto" <?php echo ($perfil['disponibilidade'] ?? '') === 'Remoto' ? 'selected' : ''; ?>>
                                    Remoto
                                </option>
                            </select>
                        </div>
                        <div class="campo">
                            <label>Pretensão salarial</label>
                            <p class="campo-view" id="view-salario">—</p>
                            <input class="campo-editavel" type="text" name="salario" id="campo-salario"
                                placeholder="Ex: R$ 2.000 ou A combinar" value="<?php echo htmlspecialchars($perfil['pret_salarial'] ?? ''); ?>" style="display:none">
                        </div>
                        <div class="campo">
                            <label>Nível de experiência</label>
                            <p class="campo-view" id="view-nivel">—</p>
                            <select class="campo-editavel" name="lvl_exp" id="campo-nivel" style="display:none">
                                <option value="" disabled selected <?php echo empty($perfil['nivel_exp']) ? 'selected' : ''; ?>>
                                    Selecione
                                </option>

                                <option value="Estágio / Iniciante" <?php echo ($perfil['nivel_exp'] ?? '') === 'Estágio / Iniciante' ? 'selected' : ''; ?>>
                                    Estágio / Iniciante
                                </option>

                                <option value="Júnior (1-2 anos)" <?php echo ($perfil['nivel_exp'] ?? '') === 'Júnior (1-2 anos)'   ? 'selected' : ''; ?>>
                                    Júnior (1-2 anos)
                                </option>

                                <option value="Pleno (3-5 anos)" <?php echo ($perfil['nivel_exp'] ?? '') === 'Pleno (3-5 anos)'    ? 'selected' : ''; ?>>
                                    Pleno (3-5 anos)
                                </option>

                                <option value="Sênior (5+ anos)" <?php echo ($perfil['nivel_exp'] ?? '') === 'Sênior (5+ anos)'    ? 'selected' : ''; ?>>
                                    Sênior (5+ anos)
                                </option>
                            </select>
                        </div>
                        <div class="campo campo-full" id="habilidade">
                            <label>Habilidades</label>
                            <div class="campo-view tags-view" id="view-habilidades">—</div>
                            <div class="campo-editavel tags-input-wrapper" style="display:none">
                                <div class="tags-lista" id="tags-lista"></div>
                                <input type="text" id="tag-input" placeholder="Digite uma habilidade e pressione Enter"
                                    onkeydown="adicionarTag(event)">
                            </div>
                            <span class="campo-dica campo-editavel" style="display:none">
                                Ex: React, Photoshop, Excel, Soldagem... (máx. 15)
                            </span>
                        </div>
                        <div class="campo campo-full">
                            <label>Experiências anteriores</label>
                            <p class="campo-view" id="view-experiencia">—</p>
                            <textarea class="campo-editavel" name="exp_ant" id="campo-experiencia"
                                placeholder="Descreva brevemente seus trabalhos..." rows="4" maxlength="800"
                                style="display:none"><?php echo htmlspecialchars($perfil['exp_ant'] ?? ''); ?></textarea>
                        </div>
                        <div class="campo campo-full">
                            <label>Formação acadêmica</label>
                            <p class="campo-view" id="view-formacao">—</p>
                            <textarea class="campo-editavel" name="formacao" id="campo-formacao"
                                placeholder="Ex: Análise e Desenvolvimento de Sistemas – IFPI (2021–2023)" rows="3"
                                maxlength="400" style="display:none"><?php echo htmlspecialchars($perfil['formacao'] ?? ''); ?></textarea>
                        </div>
                    </div>

                    <div class="aba-actions campo-editavel" style="display:none">
                        <button type="submit" class="btn-salvar" onclick="salvarPerfil()">Salvar perfil profissional</button>
                    </div>
                </section>

                <section class="aba" id="aba-portfolio">
                    <div class="aba-header">
                        <h2>Portfólio</h2>
                        <p>Arquivos PDF com seus trabalhos. Limite de 5MB por arquivo.</p>
                    </div>

                    <div id="portfolio-view" class="arquivos-lista"></div>
                    <p id="portfolio-view-vazio" class="campo-view-vazio">Nenhum arquivo enviado ainda.</p>

                    <div class="campo-editavel" style="display:none">
                        <div class="upload-area" id="upload-area-portfolio" ondragover="dragOver(event)"
                            ondragleave="dragLeave(event)" ondrop="dropArquivo(event, 'portfolio')">
                            <div class="upload-icone">📁</div>
                            <p><strong>Arraste seus arquivos aqui</strong> ou clique para selecionar</p>
                            <span>Somente PDF · Máximo 5MB por arquivo</span>
                            <label for="input-portfolio" class="btn-upload-label">Selecionar PDF</label>
                            <input type="file" name="arq_portfolio" id="input-portfolio" accept=".pdf" multiple style="display:none"
                                onchange="processarArquivos(this.files, 'portfolio')">
                        </div>
                        <div class="arquivos-lista" id="lista-portfolio"></div>
                    </div>

                    <div class="aba-actions campo-editavel" style="display:none">
                        <button type="submit" class="btn-salvar" onclick="salvarPerfil()">Salvar portfólio</button>
                    </div>
                </section>

                <section class="aba" id="aba-curriculo">
                    <div class="aba-header">
                        <h2>Currículo <span class="tag-opcional">Opcional</span></h2>
                        <p>Envie seu currículo em PDF para que empregadores possam analisar antes de entrar em contato.
                        </p>
                    </div>

                    <div id="curriculo-view" class="arquivos-lista"></div>
                    <p id="curriculo-view-vazio" class="campo-view-vazio">Nenhum currículo enviado ainda.</p>

                    <div class="campo-editavel" style="display:none">
                        <div class="upload-area" id="upload-area-curriculo" ondragover="dragOver(event)"
                            ondragleave="dragLeave(event)" ondrop="dropArquivo(event, 'curriculo')">
                            <div class="upload-icone">📄</div>
                            <p><strong>Arraste seu currículo aqui</strong> ou clique para selecionar</p>
                            <span>Somente PDF · Máximo 5MB</span>
                            <label for="input-curriculo" class="btn-upload-label">Selecionar PDF</label>
                            <input type="file" name="arq_curriculo" id="input-curriculo" accept=".pdf" style="display:none"
                                onchange="processarArquivos(this.files, 'curriculo')">
                        </div>
                        <div class="arquivos-lista" id="lista-curriculo"></div>
                    </div>

                    <div class="aba-actions campo-editavel" style="display:none">
                        <button type="submit" class="btn-salvar" onclick="salvarPerfil()">Salvar currículo</button>
                    </div>
                </section>

                <!--REGISTRAR PROJETOOO----------------> <!-- (14/06) --> 
                <section class="aba" id="aba-projetos">
                    <div class="aba-header">
                        <h2>🚀 Projetos Concluídos</h2>
                        <p id="subtitulo-projetos">Compartilhe os trabalhos que você realizou para atrair mais clientes.
                        </p>
                    </div>

                    <!-- MODO VIEW: lista de projetos -->
                    <div id="projetos-view">
                        <div id="lista-projetos-view" class="projetos-lista"></div>
                        <p id="projetos-view-vazio" class="campo-view-vazio">Nenhum projeto cadastrado ainda.</p>
                    </div>

                    <!-- MODO EDIÇÃO: botão + formulário -->
                    <div class="campo-editavel" id="projetos-editavel" style="display:none">

                        <!-- Formulário de adicionar/editar projeto -->
                        <div class="projeto-form" id="projeto-form" style="display:none">
                            <div class="projeto-form-header">
                                <h3 id="projeto-form-titulo">Novo projeto</h3>
                                <button class="btn-fechar-form" onclick="fecharFormProjeto()">✕</button>
                            </div>

                            <div class="form-grid">
                                <div class="campo campo-full">
                                    <label>Título do projeto <span class="obrigatorio">*</span></label>
                                    <input type="text" id="proj-titulo"
                                        placeholder="Ex: Landing page para clínica odontológica" maxlength="100">
                                    <span class="campo-erro" id="erro-proj-titulo"></span>
                                </div>
                                <div class="campo campo-full">
                                    <label>Descrição <span class="obrigatorio">*</span></label>
                                    <textarea id="proj-descricao"
                                        placeholder="Descreva o que foi feito, tecnologias usadas, resultados..."
                                        rows="4" maxlength="800"></textarea>
                                    <span class="campo-erro" id="erro-proj-descricao"></span>
                                </div>
                                <div class="campo">
                                    <label>Área / Categoria</label>
                                    <select id="proj-area">
                                        <option value="" disabled selected>Selecione</option>
                                        <option>Tecnologia da Informação</option>
                                        <option>Design & UX</option>
                                        <option>Marketing & Comunicação</option>
                                        <option>Construção Civil</option>
                                        <option>Saúde & Bem-estar</option>
                                        <option>Educação</option>
                                        <option>Logística & Transporte</option>
                                        <option>Gastronomia</option>
                                        <option>Administrativo & Financeiro</option>
                                        <option>Outro</option>
                                    </select>
                                </div>
                                <div class="campo">
                                    <label>Data de conclusão</label>
                                    <input type="month" id="proj-data">
                                </div>
                                <div class="campo campo-full">
                                    <label>Link do projeto (opcional)</label>
                                    <input type="url" id="proj-link" placeholder="https://seusite.com/projeto">
                                </div>
                                <div class="campo campo-full">
                                    <label>Imagem de capa (opcional)</label>
                                    <div class="upload-area proj-upload"
                                        onclick="document.getElementById('proj-imagem').click()">
                                        <div class="upload-icone" id="proj-img-preview-wrap">🖼️</div>
                                        <p>Clique para adicionar uma imagem</p>
                                        <span>JPG, PNG ou WEBP · Máx. 3MB</span>
                                    </div>
                                    <input type="file" id="proj-imagem" accept="image/*" style="display:none"
                                        onchange="previewImagemProjeto(this)">
                                </div>
                            </div>

                            <div class="projeto-form-actions">
                                <button class="btn-cancelar-form" onclick="fecharFormProjeto()">Cancelar</button>
                                <button class="btn-salvar-proj" onclick="salvarProjeto()">Salvar projeto</button>
                            </div>
                        </div>

                        <!-- Botão adicionar -->
                        <button class="btn-add-projeto" id="btn-add-projeto" onclick="abrirFormProjeto()">
                            ＋ Adicionar projeto
                        </button>

                        <!-- Lista editável de projetos -->
                        <div id="lista-projetos-edit" class="projetos-lista"></div>
                    </div>
<!-- modal de confirmação------------>
                    <div class="modal-overlay" id="modal-confirmacao">
                        <div class="modal-box">
                            <h3>Confirmar exclusão</h3>
                            <p id="modal-msg"></p>
                            <div class="modal-acoes">
                                <button class="btn-modal-cancelar" onclick="fecharModal()">Cancelar</button>
                                <button class="btn-modal-confirmar" id="modal-confirmar">Excluir</button>
                            </div>
                        </div>
                    </div>
                </section> <!--(14/06) --> 
            </main> 

        <script src="perfil.js"></script> <script src="projeto_perfil.js"></script>
</body>

</html>