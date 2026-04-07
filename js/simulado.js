document.addEventListener("DOMContentLoaded", () => {

    let usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if(!usuario){
        window.location.href = "portal.html";
        return;
    }

    const perguntas = [
        { pergunta:"Quanto é 5x5?", opcoes:["A)20","B)25","C)30","D)15","E)10"], resposta:"B)25", explicacao:"5 multiplicado por 5 resulta em 25."},
        { pergunta:"Capital do Brasil?", opcoes:["A)Rio","B)SP","C)Brasília","D)Salvador","E)BH"], resposta:"C)Brasília", explicacao:"Brasília é a capital desde 1960."},
        { pergunta:"12 ÷ 4?", opcoes:["A)2","B)3","C)4","D)6","E)8"], resposta:"B)3", explicacao:"12 dividido por 4 é 3."},
        { pergunta:"3² é?", opcoes:["A)6","B)9","C)12","D)3","E)8"], resposta:"B)9", explicacao:"3 elevado ao quadrado é 9."},
        { pergunta:"Quem descobriu o Brasil?", opcoes:["A)Cabral","B)Colombo","C)Dom Pedro","D)Vargas","E)Lula"], resposta:"A)Cabral", explicacao:"Pedro Álvares Cabral chegou em 1500."},

        // repetição simples para completar 15
        { pergunta:"10 + 15?", opcoes:["A)20","B)25","C)30","D)15","E)10"], resposta:"B)25", explicacao:"10+15 é 25."},
        { pergunta:"20 - 5?", opcoes:["A)10","B)15","C)20","D)5","E)30"], resposta:"B)15", explicacao:"20-5 é 15."},
        { pergunta:"7x3?", opcoes:["A)21","B)24","C)18","D)14","E)28"], resposta:"A)21", explicacao:"7 vezes 3 é 21."},
        { pergunta:"Raiz de 16?", opcoes:["A)2","B)4","C)8","D)6","E)3"], resposta:"B)4", explicacao:"A raiz quadrada de 16 é 4."},
        { pergunta:"8+9?", opcoes:["A)16","B)17","C)18","D)19","E)15"], resposta:"B)17", explicacao:"8+9 é 17."},
        { pergunta:"6x6?", opcoes:["A)30","B)36","C)42","D)12","E)18"], resposta:"B)36", explicacao:"6 vezes 6 é 36."},
        { pergunta:"9-3?", opcoes:["A)3","B)6","C)9","D)12","E)15"], resposta:"B)6", explicacao:"9 menos 3 é 6."},
        { pergunta:"2³?", opcoes:["A)4","B)6","C)8","D)2","E)16"], resposta:"C)8", explicacao:"2 elevado a 3 é 8."},
        { pergunta:"18 ÷ 2?", opcoes:["A)6","B)9","C)8","D)7","E)10"], resposta:"B)9", explicacao:"18 dividido por 2 é 9."},
        { pergunta:"14+1?", opcoes:["A)14","B)15","C)16","D)17","E)13"], resposta:"B)15", explicacao:"14+1 é 15."}
    ];

    let index = 0;
    let acertos = 0;

    const perguntaEl = document.getElementById("pergunta");
    const opcoesEl = document.getElementById("opcoes");
    const explicacaoEl = document.getElementById("explicacao");
    const numeroQuestao = document.getElementById("numeroQuestao");
    const btnProxima = document.getElementById("btnProxima");
    const resultado = document.getElementById("resultado");
    const quizCard = document.getElementById("quizCard");

    function mostrarPergunta(){
        const p = perguntas[index];
        numeroQuestao.innerText = `Questão ${index+1} de 15`;
        perguntaEl.innerText = p.pergunta;
        opcoesEl.innerHTML = "";
        explicacaoEl.innerText = "";
        btnProxima.style.display="none";

        p.opcoes.forEach(op=>{
            const btn = document.createElement("button");
            btn.innerText = op;
            btn.addEventListener("click", ()=> verificar(op));
            opcoesEl.appendChild(btn);
        });
    }

    function verificar(opcao){
        const p = perguntas[index];

        if(opcao === p.resposta){
            acertos++;
            explicacaoEl.innerHTML = "✔️ Correto!<br>" + p.explicacao;
        }else{
            explicacaoEl.innerHTML = "❌ Errado.<br>" + p.explicacao;
        }

        btnProxima.style.display="block";
    }

    btnProxima.addEventListener("click", ()=>{
        index++;
        if(index < perguntas.length){
            mostrarPergunta();
        }else{
            finalizar();
        }
    });

    function finalizar(){
        quizCard.style.display="none";
        resultado.style.display="block";

        let pontos = 0;
        if(acertos >= 15) pontos = 15;
        else if(acertos >= 10) pontos = 10;
        else if(acertos >= 5) pontos = 5;

        usuario.pontos += pontos;
        salvarUsuario();

        document.getElementById("acertos").innerText = acertos;
        document.getElementById("pontosGanhos").innerText = pontos;

        let avaliacao = "";
        if(acertos >= 12){
            avaliacao = "🔥 Excelente desempenho! Você foi muito bem!";
        } else if(acertos >= 8){
            avaliacao = "👍 Bom resultado! Continue estudando.";
        } else {
            avaliacao = "📚 Você deve estudar mais e revisar os conteúdos.";
        }

        document.getElementById("avaliacao").innerText = avaliacao;
    }

    document.getElementById("btnFinalizar").addEventListener("click", ()=>{
        window.location.href="painel.html";
    });

    document.getElementById("voltar").addEventListener("click", ()=>{
        window.location.href="painel.html";
    });

    function salvarUsuario(){
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const i = usuarios.findIndex(u=>u.email===usuario.email);
        if(i !== -1) usuarios[i]=usuario;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    }

    mostrarPergunta();

});