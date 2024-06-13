function startGame(mode) {
  if (mode === "single") {
    startSinglePlayer();
  } else {
    startMultiplayer();
  }
}

var arr = [
  { type: "" },
  { type: "" },
  { type: "" },
  { type: "" },
  { type: "" },
  { type: "" },
  { type: "" },
  { type: "" },
  { type: "" },
];

function startSinglePlayer() {
  document.body.innerHTML = `
      <h1 class="text-white text-center text-[50px] my-[10px]">Tic Tac Toe - Single Player</h1>
      <div class="grid grid-cols-3 w-[420px] h-[420px] text-white text-[42px] m-auto my-[30px] font-bold border p-[5px] gap-[5px]">
          <div id="0" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'single', 0)"></div>
          <div id="1" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'single', 1)"></div>
          <div id="2" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'single', 2)"></div>
          <div id="3" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'single', 3)"></div>
          <div id="4" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'single', 4)"></div>
          <div id="5" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'single', 5)"></div>
          <div id="6" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'single', 6)"></div>
          <div id="7" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'single', 7)"></div>
          <div id="8" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'single', 8)"></div>
      </div>
    `;
}
function startMultiplayer() {
  document.body.innerHTML = `
      <h1 class="text-white text-center text-[50px] my-[10px]">Tic Tac Toe - Multi Player</h1>
      <div class="grid grid-cols-3 w-[420px] h-[420px] text-white text-[42px] m-auto my-[30px] font-bold border p-[5px] gap-[5px]">
        <div id="0" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'multi', 0)"></div>
        <div id="1" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'multi', 1)"></div>
        <div id="2" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'multi', 2)"></div>
        <div id="3" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'multi', 3)"></div>
        <div id="4" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'multi', 4)"></div>
        <div id="5" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'multi', 5)"></div>
        <div id="6" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'multi', 6)"></div>
        <div id="7" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'multi', 7)"></div>
        <div id="8" class="border inline-flex items-center justify-center " onclick="makeMove(this, 'multi', 8)"></div>
      </div>
    `;
}
let currentPlayer = "X";

function makeMove(cell, mode, selectBox) {
  arr[selectBox].type = currentPlayer === "X" ? "tic" : "tac";
  if (cell.innerHTML == "") {
    cell.innerHTML = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    if (checkWinner(arr)) {
      setTimeout(() => {
        alert(currentPlayer + " WIN!");
        resetGame(mode);
        arr = [
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
        ];
      }, 100);
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (mode === "single" && currentPlayer === "O") {
      setTimeout(computerMove, 500);
    }
  }

  function computerMove() {
    let emptyCells = Array.from(document.querySelectorAll(".border")).filter(
      (cell) => cell.innerHTML === ""
    );
    if (emptyCells.length === 0) return;
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let randomCell = emptyCells[randomIndex];
    randomCell.innerHTML = currentPlayer;
    arr[Number(randomCell.id)].type = currentPlayer === "X" ? "tic" : "tac";
    randomCell.classList.add(currentPlayer.toLowerCase());
    cell.classList.add("o");
    if (checkWinner(arr)) {
      setTimeout(() => {
        alert("O WIN!");
        resetGame("single");
        arr = [
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
          { type: "" },
        ];
      }, 100);
      return;
    }
    currentPlayer = "X";
  }
}

function checkWinner(arr) {
  const indicesGroups = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let group of indicesGroups) {
    const [a, b, c] = group;
    if (arr[a] && arr[b] && arr[c]) {
      if (
        arr[a].type === arr[b].type &&
        arr[a].type === arr[c].type &&
        arr[a].type !== "" &&
        arr[b].type !== "" &&
        arr[c].type !== ""
      ) {
        return true;
      }
    }
  }

  return false;
}

function resetGame(mode) {
  if (mode === "single") {
    startSinglePlayer();
  } else {
    startMultiplayer();
  }
}
