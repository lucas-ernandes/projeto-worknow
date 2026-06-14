<?php
$host = "localhost";
$banco = "worknow";
$usuario = "root";
$senha_banco = "";

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha_banco);
    
    // O PHP vai lá nas gavetas do $_POST e pega o que o usuário preencheu
    $nome  = $_POST['nome_user'];
    $cpf = $_POST['cpf_user'];
    $telefone = $_POST['tel_user'];
    $perfil = $_POST['perfil_user'];
    $email = $_POST['email_user'];
    $senha_pura = $_POST['senha_user']; // Captura a senha limpa digitada (ex: "123456")
    $data_nascimento = $_POST['dt_nasc_user'];

    // Se a data não estiver vazia, vamos garantir que use hifens e o padrão Ano-Mês-Dia
    if (!empty($data_nascimento)) {
        // Caso o input HTML seja do tipo "date", o navegador já envia como AAAA-MM-DD automaticamente.
        // Mas se vier como DD/MM/AAAA, essa linha abaixo converte para o formato aceito pelo MySQL:
        if (strpos($data_nascimento, '/') !== false) {
            $partes = explode('/', $data_nascimento);
            $data_nascimento = $partes[2] . '-' . $partes[1] . '-' . $partes[0];
    }
}

    // password_hash() - transforma a senha limpa em um código embaralhado e seguro.
    // PASSWORD_DEFAULT - diz para o PHP usar o algoritmo mais moderno e seguro da atualidade.
    $senha_criptografada = password_hash($senha_pura, PASSWORD_DEFAULT);

    // Verifica se o e-mail já existe no banco de dados
    $sql_busca = "SELECT id FROM usuario WHERE email = :email";
    $stmt_busca = $conexao->prepare($sql_busca);
    $stmt_busca->bindParam(':email', $email);
    $stmt_busca->execute();

    if ($stmt_busca->rowCount() > 0) {
        echo "<script>
                alert('Erro: Este e-mail já está cadastrado no sistema!');
                window.history.back();
              </script>";
        exit; // Para a execução do PHP aqui
    }

    // :nome, :senha, etc. - apelidos temporários que protegem os dados reais do usuário
    $sql = "INSERT INTO usuario (nome, email, perfil, cpf, data_nascimento, telefone, senha) VALUES (:nome, :email, :perfil, :cpf, :data_nasc, :tel, :senha)";
    $stmt = $conexao->prepare($sql);

    // Aqui nós dizemos qual variável real vai substituir cada apelido temporário do SQL
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':perfil', $perfil);
    $stmt->bindParam(':cpf', $cpf);
    $stmt->bindParam(':data_nasc', $data_nascimento);
    $stmt->bindParam(':tel', $telefone);
    $stmt->bindParam(':senha', $senha_criptografada); // Importante: enviar a senha CRIPTOGRAFADA!

    // O PHP junta tudo, valida e envia o pacote final para o banco salvar na tabela
    $stmt->execute();

    // O comando execute() deu certo! Agora precisamos descobrir qual ID o banco gerou para ele
    $id_usuario = $conexao->lastInsertId();

    // Iniciamos a sessão no PHP
    session_start();

    // Guardamos o ID e o Nome do usuário no $_SESSION
    $_SESSION['usuario_id'] = $id_usuario;
    $_SESSION['usuario_nome'] = $nome;
    $_SESSION['usuario_perfil'] = $perfil;

    // Se o código chegou aqui sem dar erro, exibe o alerta e vai para o login
    echo "<script>
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '../Tela_Dashboard/dashboard_trabaio.php';
          </script>";

} catch(PDOException $e) {
    // Se o banco de dados rejeitar algo, ele cai aqui
    echo "Ops, erro ao salvar no banco de dados: " . $e->getMessage();
}
?>