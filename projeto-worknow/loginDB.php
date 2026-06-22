<?php
$host = "localhost";
$banco = "worknow";
$usuario = "root";
$senha_banco = "";

try {
    $conexao = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha_banco);
    
    $email_digitado = $_POST['email_user'];
    $senha_digitada = $_POST['senha_user'];

    // Pedimos para o banco trazer o id, o nome e a senha criptografada dele
    $sql = "SELECT id, nome, perfil, senha FROM usuario WHERE email = :email";
    $stmt = $conexao->prepare($sql);
    $stmt->bindParam(':email', $email_digitado);
    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        // fetch() - transforma a resposta do banco em uma array para o PHP ler
        $usuario_encontrado = $stmt->fetch(PDO::FETCH_ASSOC);

        // O password_verify precisa da senha pura digitada e da senha criptografada do banco
        if (password_verify($senha_digitada, $usuario_encontrado['senha'])) {
            
            // SE CHEGOU AQUI, O LOGIN DEU CERTO! GRAÇAS A DEUS!!
            // Iniciamos a sessão para identificar o usuário nas próximas páginas
            session_start();
            $_SESSION['usuario_id'] = $usuario_encontrado['id'];
            $_SESSION['usuario_nome'] = $usuario_encontrado['nome'];
            $_SESSION['usuario_perfil'] = $usuario_encontrado['perfil'];

            // Alerta de sucesso e redirecionamento para o perfil
            echo "<script>
                    alert('Login realizado com sucesso! Bem-vindo(a).');
                    window.location.href = 'Tela_Dashboard/dashboard_trabalhador.php';
                  </script>";
            exit;

        } else {
            // SE A SENHA ESTIVER ERRADA
            echo "<script>
                    alert('Erro: Senha incorreta!');
                    window.history.back();
                  </script>";
            exit;
        }

    } else {
        // SE O E-MAIL NÃO FOR ENCONTRADO
        echo "<script>
                alert('Erro: Este e-mail não está cadastrado!');
                window.history.back();
              </script>";
        exit;
    }

} catch(PDOException $e) {
    echo "Erro no sistema: " . $e->getMessage();
}
?>