<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Jogo da Memória em JS Puro</title>
</head>
<body>
  <script>
    // Estilo e layout por JS
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        background: #0f172a;
        color: white;
        font-family: sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
      }
      h1 {
        color: #38bdf8;
      }
      #game {
        display: grid;
        grid-template-columns: repeat(4, 100px);
        gap: 10px;
        margin-top: 20px;
      }
      .card {
        width: 100px;
        height: 100px;
        background: #1e293b;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        cursor: pointer;
        user-select: none;
      }
      .flipped {
        background: #22c55e;
        color: black;
      }
      #moves {
        margin-top: 10px;
        font-size: 1.2rem;
      }
    `;
    document.head.appendChild(style);

    const title = document.createElement('h1');
    title.textContent = '🧠 Jogo da Memória';
    document.body.appendChild(title);

    const movesCounter = document.createElement('div');
    movesCounter.id = 'moves';
    movesCounter.textContent = 'Movimentos: 0';
    document.body.appendChild(movesCounter);

    const gameBoard = document.createElement('div');
    gameBoard.id = 'game';
    document.body.appendChild(gameBoard);

    const symbols = ['🍎','🍌','🍒','🍇','🍉','🍑','🍍','🥝'];
    const cards = [...symbols, ...symbols]; // 8 pares
    let flipped = [];
    let matched = [];
    let moves = 0;

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function resetGame() {
      gameBoard.innerHTML = '';
      flipped = [];
      matched = [];
      moves = 0;
      movesCounter.textContent = 'Movimentos: 0';

      shuffle(cards);
      cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.textContent = '';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
      });
    }

    function flipCard() {
      if (flipped.length >= 2 || this.classList.contains('flipped') || matched.includes(this.dataset.index)) return;

      this.textContent = this.dataset.symbol;
      this.classList.add('flipped');
      flipped.push(this);

      if (flipped.length === 2) {
        moves++;
        movesCounter.textContent = `Movimentos: ${moves}`;
        const [a, b] = flipped;

        if (a.dataset.symbol === b.dataset.symbol) {
          matched.push(a.dataset.index, b.dataset.index);
          flipped = [];

          if (matched.length === cards.length) {
            setTimeout(() => {
              alert(`Você venceu em ${moves} movimentos!`);
              resetGame();
            }, 500);
          }
        } else {
          setTimeout(() => {
            a.textContent = '';
            b.textContent = '';
            a.classList.remove('flipped');
            b.classList.remove('flipped');
            flipped = [];
          }, 800);
        }
      }
    }

    resetGame();
  </script>
</body>
</html>
