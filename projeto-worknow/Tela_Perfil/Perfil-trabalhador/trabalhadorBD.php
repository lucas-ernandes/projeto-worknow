<?php
// 1. INICIAR SESSÃO PARA PEGAR O ID DO TRABALHADOR LOGADO
session_start();

// O SEU MODO PADRÃO DE CONEXÃO (Direto no arquivo, sem require)
$host = "localhost";
$banco = "worknow";
$usuario = "root";
$senha_banco = "";

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha_banco);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "<h3>Erro na conexão com o banco:</h3> " . $e->getMessage();
    exit;
}

// Segurança: Se o usuário não estiver logado, chuta ele de volta para o login
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.html");
    exit;
}

// 2. VERIFICAR SE OS DADOS FORAM ENVIADOS VIA POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $usuario_id = $_SESSION['usuario_id'];

    // BLOCO PARA PEGAR OS DADOS EXISTENTES:
    $dados_atuais = null;
    $sql_busca = "SELECT * FROM perfil_trabalhador WHERE usuario_id = :usuario_id";
    $stmt_busca = $conexao->prepare($sql_busca);
    $stmt_busca->bindParam(':usuario_id', $usuario_id);
    $stmt_busca->execute();
    $dados_atuais = $stmt_busca->fetch(PDO::FETCH_ASSOC);

    // Busca os dados atuais da tabela USUARIO para ter o backup caso o campo venha vazio
    $sql_user_atual = "SELECT nome, telefone FROM usuario WHERE id = :usuario_id LIMIT 1";
    $stmt_user_atual = $conexao->prepare($sql_user_atual);
    $stmt_user_atual->bindParam(':usuario_id', $usuario_id);
    $stmt_user_atual->execute();
    $dados_usuario_atual = $stmt_user_atual->fetch(PDO::FETCH_ASSOC);

    // 2. PEGAR E LIMPAR OS TEXTOS VINDOS DO FORMULÁRIO (SE NÃO VIEREM, MANTÉM O DO BANCO)
    // Dados da tabela PERFIL_TRABALHADOR
    $titulo = (!empty($_POST['titulo'])) ? trim($_POST['titulo']) : ($dados_atuais['titulo'] ?? null);
    $biografia = (!empty($_POST['biografia'])) ? trim($_POST['biografia']) : ($dados_atuais['bio'] ?? null);
    $cidade = (!empty($_POST['cidade'])) ? trim($_POST['cidade']) : ($dados_atuais['cidade'] ?? null);
    $area = (!empty($_POST['area_atuacao'])) ? trim($_POST['area_atuacao']) : ($dados_atuais['area'] ?? null);
    $disp = (!empty($_POST['disponivel'])) ? trim($_POST['disponivel']) : ($dados_atuais['disponibilidade'] ?? null);
    $pretensao = (!empty($_POST['salario'])) ? trim($_POST['salario']) : ($dados_atuais['pret_salarial'] ?? null);
    $nivel_exp = (!empty($_POST['lvl_exp'])) ? trim($_POST['lvl_exp']) : ($dados_atuais['nivel_exp'] ?? null);
    $hab = (!empty($_POST['habilidades'])) ? trim($_POST['habilidades']) : ($dados_atuais['habilidades'] ?? null);
    $exp_ant = (!empty($_POST['exp_ant'])) ? trim($_POST['exp_ant']) : ($dados_atuais['exp_ant'] ?? null);
    $formacao = (!empty($_POST['formacao'])) ? trim($_POST['formacao']) : ($dados_atuais['formacao'] ?? null);
    $link_linkedin = (!empty($_POST['url_linkedin'])) ? trim($_POST['url_linkedin']) : ($dados_atuais['link_linkedin'] ?? null);
    $link_portfolio = (!empty($_POST['url_portfolio'])) ? trim($_POST['url_portfolio']) : ($dados_atuais['link_portfolio'] ?? null);

    // Dados vindos da tabela USUARIO
    $nome = (!empty($_POST['nome'])) ? trim($_POST['nome']) : ($dados_usuario_atual['nome'] ?? null);
    $telefone = (!empty($_POST['telefone'])) ? trim($_POST['telefone']) : ($dados_usuario_atual['telefone'] ?? null);

    // Tratar a pretensão salarial (mudar vírgula para ponto caso o usuário digite "2500,00")
    if ($pretensao !== null) {
        $pretensao = str_replace(',', '.', $pretensao);
    }

    // 3. BUSCAR ARQUIVOS JÁ EXISTENTES NO BANCO (Para não perder o caminho se ele não enviar um arquivo novo)
    $arq_portfolio = $dados_atuais['arq_portfolio'] ?? null;
    $arq_curriculo = $dados_atuais['arq_curriculo'] ?? null;

    try {
        $busca_atual = $conexao->prepare("SELECT arq_portfolio, arq_curriculo FROM perfil_trabalhador WHERE usuario_id = :id");
        $busca_atual->bindParam(':id', $usuario_id);
        $busca_atual->execute();
        $dados_atuais = $busca_atual->fetch(PDO::FETCH_ASSOC);
        
        if ($dados_atuais) {
            $arq_portfolio = $dados_atuais['arq_portfolio'];
            $arq_curriculo = $dados_atuais['arq_curriculo'];
        }
    } catch (PDOException $e) {
        // Se a tabela ainda não existir ou der erro na busca, prossegue vazio
    }

    // 4. CONFIGURAÇÃO E LOGICA DE UPLOAD DE ARQUIVOS COM PASTAS SEPARADAS
    $nome_usuario = 'usuario'; // Nome padrão caso dê algum erro

    try {
        $sql_nome = "SELECT nome FROM usuario WHERE id = :usuario_id LIMIT 1";
        $stmt_nome = $conexao->prepare($sql_nome);
        $stmt_nome->bindParam(':usuario_id', $usuario_id);
        $stmt_nome->execute();
        $resultado_usuario = $stmt_nome->fetch(PDO::FETCH_ASSOC);
    
        if ($resultado_usuario && !empty($resultado_usuario['nome'])) {
            $nome_usuario = $resultado_usuario['nome'];
        }
    } catch (PDOException $e) {
        // Se der erro na busca, ele apenas continuará usando o nome padrão 'usuario'
    }

    // Limpa o nome do usuário (remove acentos, espaços e deixa tudo minúsculo)
    $nome_limpo = preg_replace('/[^a-zA-Z0-9]/', '', strtolower(str_replace(' ', '', $nome_usuario)));

    // Define os caminhos das novas subpastas separadas
    $pasta_portfolio = 'uploads/trabalhadores/upload_portfolio/';
    $pasta_curriculo = 'uploads/trabalhadores/upload_curriculo/';

    // Cria as pastas automaticamente no servidor caso elas ainda não existam
    if (!is_dir($pasta_portfolio)) { mkdir($pasta_portfolio, 0777, true); }
    if (!is_dir($pasta_curriculo)) { mkdir($pasta_curriculo, 0777, true); }

    // Inicializa as variáveis que vão para o BindParam do banco de dados
    $arq_portfolio = null;
    $arq_curriculo = null;

    // --- Upload do Portfólio (Arquivo) ---
    if (isset($_FILES['arq_portfolio']) && $_FILES['arq_portfolio']['error'] === UPLOAD_ERR_OK) {
        $extensao = strtolower(pathinfo($_FILES['arq_portfolio']['name'], PATHINFO_EXTENSION));

        // Prepara o nome do arquivo, por exemplo: portfolio_5_franciscojose.pdf
        $novo_nome_port = "portfolio_" . $usuario_id . "_" . $nome_limpo . "." . $extensao;
        $caminho_completo_port = $pasta_portfolio . $novo_nome_port;

        if (move_uploaded_file($_FILES['arq_portfolio']['tmp_name'], $caminho_completo_port)) {
            $arq_portfolio = $caminho_completo_port; // Esse caminho vai pro banco de dados
        }
    }

    // --- Upload do Currículo (PDF) ---
    if (isset($_FILES['arq_curriculo']) && $_FILES['arq_curriculo']['error'] === UPLOAD_ERR_OK) {
        $extensao = strtolower(pathinfo($_FILES['arq_curriculo']['name'], PATHINFO_EXTENSION));

        // Prepara o nome do arquivo, por exemplo: curriculo_5_franciscojose.pdf
        $novo_nome_curr = "curriculo_" . $usuario_id . "_" . $nome_limpo . "." . $extensao;
        $caminho_completo_curr = $pasta_curriculo . $novo_nome_curr;
    
        if (move_uploaded_file($_FILES['arq_curriculo']['tmp_name'], $caminho_completo_curr)) {
            $arq_curriculo = $caminho_completo_curr; // Esse caminho vai pro banco de dados
        }
    }

    // 5. SALVAR OU ATUALIZAR NO BANCO DE DADOS (Utilizando ON DUPLICATE KEY UPDATE)
    try {
        $sql = "INSERT INTO perfil_trabalhador (
                    usuario_id, titulo, bio, cidade, area, disponibilidade, 
                    pret_salarial, nivel_exp, habilidades, exp_ant, formacao, 
                    link_linkedin, link_portfolio, arq_portfolio, arq_curriculo
                ) VALUES (
                    :id, :titulo, :biografia, :cidade, :area_atuacao, :disp, 
                    :pretensao, :lvl_exp, :habs, :exp_ant, :form, 
                    :l_linkedin, :l_portfolio, :a_portfolio, :a_curriculo
                ) ON DUPLICATE KEY UPDATE 
                    titulo = VALUES(titulo),
                    bio = VALUES(bio),
                    cidade = VALUES(cidade),
                    area = VALUES(area),
                    disponibilidade = VALUES(disponibilidade),
                    pret_salarial = VALUES(pret_salarial),
                    nivel_exp = VALUES(nivel_exp),
                    habilidades = VALUES(habilidades),
                    exp_ant = VALUES(exp_ant),
                    formacao = VALUES(formacao),
                    link_linkedin = VALUES(link_linkedin),
                    link_portfolio = VALUES(link_portfolio),
                    arq_portfolio = VALUES(arq_portfolio),
                    arq_curriculo = VALUES(arq_curriculo)";

        $stmt = $conexao->prepare($sql);

        // Vinculando todos os parâmetros de segurança (binds)
        $stmt->bindParam(':id', $usuario_id);
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':biografia', $biografia);
        $stmt->bindParam(':cidade', $cidade);
        $stmt->bindParam(':area_atuacao', $area);
        $stmt->bindParam(':disp', $disp);
        $stmt->bindParam(':pretensao', $pretensao);
        $stmt->bindParam(':lvl_exp', $nivel_exp);
        $stmt->bindParam(':habs', $hab);
        $stmt->bindParam(':exp_ant', $exp_ant);
        $stmt->bindParam(':form', $formacao);
        $stmt->bindParam(':l_linkedin', $link_linkedin);
        $stmt->bindParam(':l_portfolio', $link_portfolio);
        $stmt->bindParam(':a_portfolio', $arq_portfolio);
        $stmt->bindParam(':a_curriculo', $arq_curriculo);

        $stmt->execute();

        // // 5.2 ATUALIZAR OS DADOS NA TABELA DE USUÁRIOS (NOME E TELEFONE)
    try {
        $sql_usuario = "UPDATE usuario SET nome = :nome, telefone = :telefone WHERE id = :usuario_id";
        $stmt_user = $conexao->prepare($sql_usuario);
        $stmt_user->bindParam(':nome', $nome);
        $stmt_user->bindParam(':telefone', $telefone);
        $stmt_user->bindParam(':usuario_id', $usuario_id);
        $stmt_user->execute();
    } catch (PDOException $e) {
        echo "Erro ao atualizar tabela usuarios: " . $e->getMessage();
    }
        // 6. REDIRECIONAR DE VOLTA PARA A TELA DE PERFIL COM SUCESSO
        ?>
        <script>
            alert('Perfil atualizado com sucesso!');
            // AJUSTE AQUI: Coloque o caminho exato para onde o usuário deve voltar após salvar
            window.location.href = 'perfil_trabalhador.php'; 
        </script>
        <?php
        exit;

    } catch (PDOException $e) {
        // Caso aconteça algum erro de banco, exibe na tela para podermos corrigir
        echo "<h3>Erro ao salvar no banco de dados:</h3> " . $e->getMessage();
        exit;
    }
} else {
    // Se tentarem acessar o arquivo direto pela URL sem enviar formulário, expulsa
    header("Location: perfil_trabalhador.php");
    exit;
}