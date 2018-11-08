window.onload = () => {
    const boardSize = 200;
    const cellSize = 4;
    const boardLength = 200;
    const percent = 3;
  
    // Get reference to canvas
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    canvas.width = canvas.height = boardSize * cellSize;
    const CellNumber = canvas.width / cellSize * canvas.height/cellSize * cellSize;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';

    // Create cell Array and fill it with 0 
    let cells = new Array(boardSize);
    for(let i = 0; i < boardSize; i++){
        cells[i] = new Array(boardSize);
        for(let j = 0; j < boardSize; j++){
            cells[i][j] = 0;
        }
    }


    function getRandomCoords(){
        let coords: [number, number];
        const x = Math.floor(Math.random() * canvas.width / cellSize);
        const y = Math.floor(Math.random() * canvas.height / cellSize);
        coords = [x, y];
        return coords;
    }

    function drawStartCells(){
        for(let i = 0; i < CellNumber; i++){
            const coord = getRandomCoords();
            const x = coord[0];
            const y = coord[1];
            cells[x][y] = 1;
        }
        drawCells();
    }

    function drawCells() {
        for (let i = 0; i < cells.length; i++) {
          for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j] == 1) {
              const y = i * cellSize;
              const x = j * cellSize;
              drawSingleCell(x, y);
            }
          }
        }
    }
      
    function checkLifeDead(x: number, y: number){
        const neighbourQuantity = getNeighbours(x, y);
        const alive = cells[y][x];
        if (alive && neighbourQuantity < 2) {
          return 0;
        }
        if (alive && (neighbourQuantity == 2 || neighbourQuantity == 3)) {
          return 1;
        }
        if (alive && neighbourQuantity > 3) {
          return 0;
        }
        if (!alive && neighbourQuantity == 3) {
          return 1;
        }
    }

    function getNeighbours(x: number, y: number){
          let neighbourQuantity = 0;
          
          for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
              if (i >= 0 && j >= 0 && j < boardSize && i < boardSize) {
                if (cells[i][j] == 1) {
                  neighbourQuantity++;
                }
              }
            }
          }
          return neighbourQuantity;
    }
    function live(){
        for(let i = 0; i<cells.length; i++){
          for(let j = 0; j<cells[i].length; j++){
            cells[i][j] = checkLifeDead(j,i);
            if(cells[i][j] == 1){
              drawSingleCell(j*cellSize,i*cellSize);
            }
          }
        }
      }

    function drawSingleCell(x: number, y: number) {
        ctx.fillRect(x, y, cellSize, cellSize);
    }
  
    // Call 'draw' function whenever browser renders a frame on the screen
    window.requestAnimationFrame(draw);
  
    function draw() {
      // Demo code showing how to draw in the canvas
      ctx.clearRect(0, 0, boardSize, boardSize);
        live();
      window.requestAnimationFrame(draw);
    }
  };

