/* ═══════════════════════════════════════════
   OLHINHO – REVELAR / OCULTAR SENHA
═══════════════════════════════════════════ */
function toggleSenha(inputId, btn) {
    const input = document.getElementById(inputId);
    const visivel = input.type === 'text';
 
    input.type = visivel ? 'password' : 'text';
    btn.classList.toggle('visivel', !visivel);
 
    // troca o SVG do olho
    btn.innerHTML = visivel
        ? /* olho fechado (senha oculta) */ `
            <svg class="icone-olho" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>`
        : /* olho aberto (senha visível) */ `
            <svg class="icone-olho" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>`;
}
 

/* ═══════════════════════════════════════════
   CARDS DA ESQUERDA – só informativos
═══════════════════════════════════════════ */
function mostrarInfo(tipo, el) {
    document.querySelectorAll('.card-tipo').forEach(c => c.classList.remove('ativo'));
    el.classList.add('ativo');
 
    document.querySelectorAll('.info-perfil').forEach(p => p.classList.add('oculto'));
    document.getElementById('info-' + tipo).classList.remove('oculto');
}
 
 
/* ═══════════════════════════════════════════
   RADIO DO FORMULÁRIO – controla campos extras
═══════════════════════════════════════════ */
let tipoAtual = 'trabalhador';
 
function selecionarTipo(tipo) {
    tipoAtual = tipo;
 
    const extTrab = document.getElementById('campos-trabalhador');
    const extEmp  = document.getElementById('campos-empregador');
 
    if (tipo === 'trabalhador') {
        extTrab.classList.add('visivel');
        extEmp.classList.remove('visivel');
    } else {
        extTrab.classList.remove('visivel');
        extEmp.classList.add('visivel');
    }
}
 
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('campos-trabalhador').classList.add('visivel');
});
 
/* MÁSCARA – CPF  →  000.000.000-00 */
document.getElementById('cpf').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 9)      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/,        '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/,               '$1.$2');
    this.value = v;
    document.getElementById('erro-cpf').textContent = '';
});
 
 
/* VALIDAÇÃO REAL DO CPF (algoritmo oficial) */
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
 
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
 
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;
 
    return true;
}
/* MÁSCARA – CNPJ  →  00.000.000/0000-00 */
document.getElementById('cnpj').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 14);
    if (v.length > 12)      v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    else if (v.length > 8)  v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/,        '$1.$2.$3/$4');
    else if (v.length > 5)  v = v.replace(/(\d{2})(\d{3})(\d{0,3})/,               '$1.$2.$3');
    else if (v.length > 2)  v = v.replace(/(\d{2})(\d{0,3})/,                      '$1.$2');
    this.value = v;
    document.getElementById('erro-cnpj').textContent = '';
});
 
/* VALIDAÇÃO REAL DO CNPJ (algoritmo oficial) */
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cnpj)) return false; // todos iguais
 
    const calc = (c, len) => {
        let soma = 0, pos = len - 7;
        for (let i = len; i >= 1; i--) {
            soma += parseInt(c[len - i]) * pos--;
            if (pos < 2) pos = 9;
        }
        const r = soma % 11;
        return r < 2 ? 0 : 11 - r;
    };
 
    return (
        calc(cnpj, 12) === parseInt(cnpj[12]) &&
        calc(cnpj, 13) === parseInt(cnpj[13])
    );
}
 
 
/* MÁSCARA – DATA DE NASCIMENTO  →  DD/MM/AAAA*/
document.getElementById('nascimento').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 4)      v = v.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,2})/,        '$1/$2');
    this.value = v;
    document.getElementById('erro-nascimento').textContent = '';
});
 
function validarData(str) {
    if (str.length !== 10) return false;
    const [d, m, a] = str.split('/').map(Number);
    if (!d || !m || !a) return false;
    if (m < 1 || m > 12) return false;
    const data = new Date(a, m - 1, d);
    if (data.getFullYear() !== a || data.getMonth() !== m - 1 || data.getDate() !== d) return false;
    const hoje = new Date();
    const idade = hoje.getFullYear() - a - (hoje < new Date(hoje.getFullYear(), m - 1, d) ? 1 : 0);
    return idade >= 16 && idade <= 120;
}
 
 
/* MÁSCARA – TELEFONE  →  (00) 00000-0000*/
document.getElementById('telefone').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10)     v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/,        '($1) $2');
    else if (v.length > 0) v = v.replace(/(\d{0,2})/,               '($1');
    this.value = v;
});
 
 
/* VALIDAÇÃO DO FORMULÁRIO AO SUBMETER*/
function validarForm(e) {
    e.preventDefault();
    let ok = true;
 
    // CPF
    const cpfVal = document.getElementById('cpf').value;
    if (!validarCPF(cpfVal)) {
        document.getElementById('erro-cpf').textContent = 'CPF inválido. Verifique o número digitado.';
        ok = false;
    }
 
    // Data de nascimento
    const nascVal = document.getElementById('nascimento').value;
    if (!validarData(nascVal)) {
        document.getElementById('erro-nascimento').textContent =
            'Data inválida ou idade fora do permitido (16–120 anos).';
        ok = false;
    }
 
    // CNPJ — só valida se o campo tiver sido preenchido (é opcional)
    if (tipoAtual === 'empregador') {
        const cnpjVal = document.getElementById('cnpj').value;
        if (cnpjVal.trim() !== '' && !validarCNPJ(cnpjVal)) {
            document.getElementById('erro-cnpj').textContent = 'CNPJ inválido. Verifique o número digitado.';
            ok = false;
        }
    }
 
    // Senhas
    const s1 = document.getElementById('senha').value;
    const s2 = document.getElementById('confirmar').value;
    if (s1 !== s2) {
        document.getElementById('erro-senha').textContent = 'As senhas não coincidem.';
        ok = false;
    } else if (s1.length < 6) {
        document.getElementById('erro-senha').textContent = 'A senha deve ter pelo menos 6 caracteres.';
        ok = false;
    } else {
        document.getElementById('erro-senha').textContent = '';
    }
 
    if (ok) {
        e.target.submit();
    }
 
    return false;
}