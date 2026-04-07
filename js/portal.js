// Captura o formulário
const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function(e){
    e.preventDefault(); // evita recarregar a página

    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    // Pega todos os usuários cadastrados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procura usuário válido
    const usuarioValido = usuarios.find(u => u.email === email && u.senha === senha);

    if(usuarioValido){
        // Salva o usuário logado
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

        // Redireciona direto para o painel
        window.location.href = "painel-estudamais.html";
    } else {
        alert("Email ou senha incorretos!");
    }
});