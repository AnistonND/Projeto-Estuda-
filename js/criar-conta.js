document.getElementById("formCadastro").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.find(user => user.email === email)) {
        alert("E-mail já cadastrado!");
        return;
    }

    const novoUsuario = {
        nome,
        email,
        senha,
        pontos: 0,
        nivel: 1
    };

    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado!");
    window.location.href = "portal.html";
});