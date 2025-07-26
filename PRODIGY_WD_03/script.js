    const board = document.getElementById('board');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let cells = Array(9).fill('');
    let gameActive = true;

    function renderBoard() {
      board.innerHTML = '';
      cells.forEach((cell, i) => {
        const cellBtn = document.createElement('button');
        cellBtn.className = 'cell';
        cellBtn.textContent = cell;
        cellBtn.onclick = () => handleClick(i);
        board.appendChild(cellBtn);
      });
    }

    function handleClick(index) {
      if (cells[index] !== '' || !gameActive) return;

      cells[index] = currentPlayer;
      renderBoard();

      if (checkWinner()) {
        message.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
        setTimeout(resetBoard, 2000); // auto reset
        return;
      }

      if (!cells.includes('')) {
        message.textContent = "It's a draw!";
        gameActive = false;
        setTimeout(resetBoard, 2000);
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function checkWinner() {
      const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      return winCombos.some(([a, b, c]) =>
        cells[a] === currentPlayer &&
        cells[b] === currentPlayer &&
        cells[c] === currentPlayer
      );
    }

    function resetBoard() {
      cells = Array(9).fill('');
      currentPlayer = 'X';
      gameActive = true;
      message.textContent = `Player ${currentPlayer}'s Turn`;
      renderBoard();
    }

    renderBoard(); // initial render