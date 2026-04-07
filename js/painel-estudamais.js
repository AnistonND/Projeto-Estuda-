let usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if(!usuario){
    window.location.href = "portal.html";
}

// Boas-vindas
document.getElementById("boasVindas").innerText = `Bem-vindo, ${usuario.nome}!`;

// Atualiza status do usuário
function atualizarPainel(){
    document.getElementById("nivel").innerText = usuario.nivel;
    document.getElementById("pontos").innerText = usuario.pontos;

    let progresso = (usuario.pontos % 50)/50*100;
    document.getElementById("barraProgresso").style.width = progresso + "%";

    let medalha = "🥉 Bronze";
    if(usuario.pontos >= 100) medalha = "🥈 Prata";
    if(usuario.pontos >= 200) medalha = "🥇 Ouro";
    document.getElementById("medalha").innerText = medalha;

    atualizarRanking();
}

// Ranking
function atualizarRanking(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a,b)=> b.pontos - a.pontos);

    const rankingLista = document.getElementById("ranking");
    rankingLista.innerHTML = "";
    usuarios.forEach((u,i)=>{
        const li = document.createElement("li");
        li.innerText = `${i+1}º - ${u.nome} (${u.pontos} pts)`;
        rankingLista.appendChild(li);
    });
}

// Batalha da Lógica → apenas redireciona
document.getElementById("btnBatalha").addEventListener("click", ()=>{
    window.location.href = "batalha-logica.html";
});

// Simulado
document.getElementById("btnSimulado").addEventListener("click", ()=>{
   document.getElementById("btnSimulado").addEventListener("click", ()=>{
    window.location.href = "simulado.html";
});
    salvarUsuario();
    atualizarPainel();
});

// Logout
document.getElementById("logout").addEventListener("click", ()=>{
    localStorage.removeItem("usuarioLogado");
    window.location.href="portal.html";
});

// Salvar usuário no localStorage
function salvarUsuario(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const index = usuarios.findIndex(u=> u.email===usuario.email);
    usuarios[index]=usuario;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

atualizarPainel();
// ===== GRÁFICO DE DESEMPENHO =====

function gerarGrafico(){
    const canvas = document.getElementById("graficoDesempenho");
    const ctx = canvas.getContext("2d");

    // Histórico salvo ou cria novo
    let historico = JSON.parse(localStorage.getItem("historicoPontos")) || [];

    // adiciona pontos atuais no histórico (máx 7 registros)
    historico.push(usuario.pontos);
    if(historico.length > 7){
        historico.shift();
    }

    localStorage.setItem("historicoPontos", JSON.stringify(historico));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const largura = canvas.width;
    const altura = canvas.height;

    const maxPonto = Math.max(...historico, 50);

    const espacamento = largura / (historico.length + 1);

    ctx.beginPath();
    ctx.moveTo(0, altura);

    historico.forEach((ponto, index) => {
        let x = espacamento * (index + 1);
        let y = altura - (ponto / maxPonto) * altura;
        ctx.lineTo(x, y);
    });

    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// ===== MENSAGENS INTELIGENTES =====

function gerarMensagens(){
    const lista = document.getElementById("listaMensagens");
    lista.innerHTML = "";

    let mensagens = [];

    if(usuario.pontos < 50){
        mensagens.push("📚 Foque em revisar Matemática básica.");
        mensagens.push("⏳ Tente fazer a Batalha da Lógica diariamente.");
    }

    if(usuario.pontos >= 50 && usuario.pontos < 150){
        mensagens.push("🔥 Bom progresso! Continue praticando simulados.");
    }

    if(usuario.pontos >= 150){
        mensagens.push("🏆 Excelente desempenho! Você está dominando os conteúdos.");
    }

    if(mensagens.length === 0){
        mensagens.push("Continue estudando para desbloquear novas recomendações!");
    }

    mensagens.forEach(msg => {
        const li = document.createElement("li");
        li.innerText = msg;
        lista.appendChild(li);
    });
}

gerarGrafico();
gerarMensagens();