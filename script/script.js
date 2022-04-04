window.addEventListener("load", function () {
    console.log("Página carregada.");

    // Eventos de "play";

    const play = document.getElementById("play-btn");
    let start;

    play.addEventListener("click", function () {
        const screenProtector = document.getElementById("screen-protector");
        screenProtector.style.display = "none";
        play.style.display = "none";
        nextX = 1;
        nextY = 0;
        start = true;
    });

    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    //  Dimensões da tela;

    const screen = 20; // 20x20;
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 400, 400);

    // Criar xadrez;

    let y = 0;
    let changeX;
    for (let x = 0; x <= 20; x += 2) {
        x % 2 == 0 ? changeX = true : changeX = false; 

        ctx.beginPath();
        ctx.fillStyle = "darkgreen";
        ctx.fillRect(x * screen, y * screen, 20, 20);
        
        if (x >= 19) {
            x = -1;
            y += 1;

            if (changeX == true) {
                x = -1;
            } else {
                x = -2;
            }
        }

        // Para finalizar o looping;
        if (y >= 20) {
            x = 20;
        }
    }

    // Criar cobra;

    let snakeX = 4;
    let snakeY = 10; // Localização inicial da cobra;

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(snakeX*screen, snakeY*screen, 20, 20);
    const defaultTail = 2;
    let tail = defaultTail;

    // Rastro inicial;
    for (let i = 0; i <= tail; i++) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect((snakeX-i)*screen, (snakeY)*screen, 20, 20);
    }

    let tailCoords = [];

    // Valores iniciais de tailCoords;
    tailCoords[0] = {x: (snakeX-1), y: snakeY};
    tailCoords[1] = {x: (snakeX), y: snakeY};

    // Controles;

    let nextX;
    let nextY;

    document.addEventListener("keydown", function (e) {
        switch(e.key) {
            case "ArrowLeft":
                nextX = -1;
                nextY = 0;
                break;
            case "ArrowUp":
                nextX = 0;
                nextY = -1;
                break;
            case "ArrowRight":
                nextX = 1;
                nextY = 0;
                break;
            case "ArrowDown":
                nextX = 0;
                nextY = 1;
                break;
        }
    });

    // Criar maçã;

    let appleX = 15;
    let appleY = 15;

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * screen, appleY * screen, 20, 20);

    const x = 8;
    const interval = setInterval(game, 1000/x); // Para repintar tela;

    document.addEventListener("keydown", function (e) {
        if (e.key == "s") {
            clearInterval(interval);
        }
    })

    function game () {
        if (start == true) {
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, 400, 400);

            // Repintar maçã;

                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.arc(appleX * screen, appleY * screen, 8, beginArc, endArc);
                ctx.fill();

            // Se comer a maçã;

            if (snakeX == appleX && snakeY == appleY) {
                appleX = Math.floor(Math.random() * screen);
                appleY = Math.floor(Math.random() * screen);

                if (appleX == 0 || appleX == 20) {
                    appleX = 1;
                }

                if (appleY == 0 || appleY == 20) {
                    appleY = 1;
                }

                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.arc(appleX * screen, appleY * screen, 8, beginArc, endArc);
                ctx.fill();
            }

            // Se a cobra bater na própria cauda;

            // Se a cobra sair da tela;

            // Direção da cobra;

            if (nextX == -1 && nextY == 0) {
                snakeX--;
            }

            if (nextX == 0 && nextY == -1) {
                snakeY--;
            }

            if (nextX == 1 && nextY == 0) {
                snakeX++;
            }

            if (nextX == 0 && nextY == 1) {
                snakeY++;
            }

            // Rastro contínuo e repintura do jogador;

            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.fillRect(snakeX * screen, snakeY * screen, 20, 20);

            tailCoords.push(
                {
                    x: snakeX,
                    y: snakeY
                }
            );
        
            for (let i = tail; i >= 0; i--) {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.fillRect(tailCoords[i].x * screen, tailCoords[i].y * screen, 20, 20);

                // Se for maior que o tamanho da cauda, remove o primeiro elemento do array;
                if (tailCoords.length > tail + 1) {
                    tailCoords.shift();
                }
            }
            
            // Área de testes
            console.log(tailCoords);
        }
    }
});