 function selecionarTipo(el, tipo) {
            document.querySelectorAll('.card-tipo').forEach(c => c.classList.remove('ativo'));
            el.classList.add('ativo');
        }
 
        function validarForm(e) {
            const senha = document.getElementById('senha').value;
            const confirmar = document.getElementById('confirmar').value;
            if (senha !== confirmar) {
                e.preventDefault();
                document.getElementById('confirmar').style.boxShadow = '0 0 0 3px rgba(255,50,50,0.4)';
                document.getElementById('confirmar').placeholder = 'Senhas não coincidem!';
            }
        }