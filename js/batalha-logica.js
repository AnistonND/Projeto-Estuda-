document.addEventListener("DOMContentLoaded", () => {

    let usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if(!usuario){
        window.location.href = "portal.html";
        return;
    }

    const perguntas = [
        { pergunta: "Quanto é 8 x 7?", opcoes:["A) 54","B) 56","C) 64","D) 49","E) 48"], resposta: "B) 56" },
        { pergunta: "Quanto é 15 - 9?", opcoes:["A) 5","B) 6","C) 7","D) 8","E) 9"], resposta: "B) 6" },
        { pergunta: "Quanto é 9 + 13?", opcoes:["A) 20","B) 21","C) 22","D) 23","E) 24"], resposta: "C) 22" },
        { pergunta: "Quanto é 12 ÷ 3?", opcoes:["A) 3","B) 4","C) 5","D) 6","E) 7"], resposta: "B) 4" }
    ];

    let pontosGanhos = 0;
    let perguntaIndex = 0;
    let timerInterval;

    const btnIniciar = document.getElementById("btnIniciar");
    const quizCard = document.getElementById("quizCard");
    const perguntaEl = document.getElementById("pergunta");
    const opcoesEl = document.getElementById("opcoes");
    const timerEl = document.getElementById("timer");
    const feedbackEl = document.getElementById("feedback");
    const numeroQuestaoEl = document.getElementById("numeroQuestao");
    const resultadoEl = document.getElementById("resultado");
    const pontosGanhosEl = document.getElementById("pontosGanhos");
    const btnFinalizar = document.getElementById("btnFinalizar");
    const btnVoltar = document.getElementById("voltar");

    // Botão iniciar
    btnIniciar.addEventListener("click", () => {
        btnIniciar.style.display = "none";
        quizCard.style.display = "block";
        mostrarPergunta();
    });

    function mostrarPergunta(){
        if(perguntaIndex >= perguntas.length){
            finalizarQuiz();
            return;
        }

        const p = perguntas[perguntaIndex];
        numeroQuestaoEl.innerText = `Questão ${perguntaIndex + 1}`;
        perguntaEl.innerText = p.pergunta;
        opcoesEl.innerHTML = "";
        feedbackEl.innerText = "";

        let tempo = 15;
        timerEl.innerText = tempo;

        p.opcoes.forEach(opcao => {
            const btn = document.createElement("button");
            btn.innerText = opcao;

            btn.addEventListener("click", () => verificarResposta(opcao));
            opcoesEl.appendChild(btn);
        });

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            tempo--;
            timerEl.innerText = tempo;

            if(tempo <= 0){
                clearInterval(timerInterval);
                feedbackEl.innerText = "⏰ Tempo esgotado!";
                setTimeout(() => {
                    perguntaIndex++;
                    mostrarPergunta();
                }, 1000);
            }
        }, 1000);
    }

    function verificarResposta(opcaoEscolhida){
        clearInterval(timerInterval);

        const p = perguntas[perguntaIndex];

        if(opcaoEscolhida === p.resposta){
            feedbackEl.innerText = "✔️ Resposta correta! +10 pontos";
            pontosGanhos += 10;
        } else {
            feedbackEl.innerText = `❌ Incorreta! A certa era: ${p.resposta} (+5 pontos)`;
            pontosGanhos += 5;
        }

        setTimeout(() => {
            perguntaIndex++;
            mostrarPergunta();
        }, 1000);
    }

    function finalizarQuiz(){
        quizCard.style.display = "none";
        resultadoEl.style.display = "block";
        pontosGanhosEl.innerText = pontosGanhos;

        usuario.pontos += pontosGanhos;
        salvarUsuario();
    }

    // 🔥 BOTÕES DE VOLTAR (AGORA FUNCIONAM)
    btnFinalizar.addEventListener("click", () => {
        window.location.href = "painel.html";
    });

    btnVoltar.addEventListener("click", () => {
        window.location.href = "painel.html";
    });

    function salvarUsuario(){
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const index = usuarios.findIndex(u=> u.email===usuario.email);

        if(index !== -1){
            usuarios[index] = usuario;
        }

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    }

});