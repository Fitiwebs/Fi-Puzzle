// Puzzle Game Class
class SlidingTilePuzzle {
    constructor() {
        this.levels = {
            1: { size: 3, name: '3x3' },
            2: { size: 4, name: '4x4' },
            3: { size: 5, name: '5x5' }
        };
        
        this.currentLevel = 1;
        this.size = this.levels[this.currentLevel].size;
        this.tiles = [];
        this.moves = 0;
        this.startTime = 0;
        this.timerInterval = null;
        this.isGameWon = false;
        this.selectedTile = null;
        
        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.tiles = this.createTiles();
        this.shuffleTiles();
        this.renderBoard();
    }

    createTiles() {
        const tileArray = [];
        const totalTiles = this.size * this.size;
        
        for (let i = 1; i < totalTiles; i++) {
            tileArray.push(i);
        }
        tileArray.push(0); // 0 represents empty space
        
        return tileArray;
    }

    shuffleTiles() {
        // Fisher-Yates shuffle with validation
        for (let i = 0; i < 500; i++) {
            const emptyIndex = this.tiles.indexOf(0);
            const possibleMoves = this.getPossibleMoves(emptyIndex);
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            [this.tiles[emptyIndex], this.tiles[randomMove]] = [this.tiles[randomMove], this.tiles[emptyIndex]];
        }
        
        // Ensure puzzle is solvable
        if (!this.isSolvable()) {
            this.shuffleTiles();
        }
    }

    isSolvable() {
        // Count inversions to determine if puzzle is solvable
        let inversions = 0;
        const tilesWithoutEmpty = this.tiles.filter(t => t !== 0);
        
        for (let i = 0; i < tilesWithoutEmpty.length; i++) {
            for (let j = i + 1; j < tilesWithoutEmpty.length; j++) {
                if (tilesWithoutEmpty[i] > tilesWithoutEmpty[j]) {
                    inversions++;
                }
            }
        }
        
        // For odd width puzzles, inversions must be even
        if (this.size % 2 === 1) {
            return inversions % 2 === 0;
        } else {
            // For even width puzzles, need to check row from bottom
            const emptyRow = Math.floor(this.tiles.indexOf(0) / this.size);
            return (inversions % 2 === 0 && emptyRow % 2 === 1) || 
                   (inversions % 2 === 1 && emptyRow % 2 === 0);
        }
    }

    getPossibleMoves(emptyIndex) {
        const moves = [];
        const row = Math.floor(emptyIndex / this.size);
        const col = emptyIndex % this.size;
        
        // Up
        if (row > 0) moves.push(emptyIndex - this.size);
        // Down
        if (row < this.size - 1) moves.push(emptyIndex + this.size);
        // Left
        if (col > 0) moves.push(emptyIndex - 1);
        // Right
        if (col < this.size - 1) moves.push(emptyIndex + 1);
        
        return moves;
    }

    renderBoard() {
        const board = document.getElementById('puzzle-board');
        board.innerHTML = '';
        board.className = `puzzle-board level-${this.currentLevel}`;
        
        this.tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = 'tile';
            
            if (tile === 0) {
                tileElement.classList.add('empty');
                tileElement.textContent = '';
            } else {
                tileElement.textContent = tile;
                tileElement.addEventListener('click', () => this.handleTileClick(index));
            }
            
            board.appendChild(tileElement);
        });
    }

    handleTileClick(index) {
        const emptyIndex = this.tiles.indexOf(0);
        const possibleMoves = this.getPossibleMoves(emptyIndex);
        
        if (possibleMoves.includes(index)) {
            [this.tiles[emptyIndex], this.tiles[index]] = [this.tiles[index], this.tiles[emptyIndex]];
            this.moves++;
            this.updateMoves();
            this.renderBoard();
            this.checkWin();
        }
    }

    updateMoves() {
        document.getElementById('moves').textContent = this.moves;
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('timer').textContent = 
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
    }

    checkWin() {
        if (this.isWon()) {
            this.isGameWon = true;
            this.stopTimer();
            this.showWinModal();
        }
    }

    isWon() {
        for (let i = 0; i < this.tiles.length - 1; i++) {
            if (this.tiles[i] !== i + 1) return false;
        }
        return this.tiles[this.tiles.length - 1] === 0;
    }

    showWinModal() {
        const modal = document.getElementById('modal');
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        document.getElementById('modal-level').textContent = this.levels[this.currentLevel].name;
        document.getElementById('modal-moves').textContent = this.moves;
        document.getElementById('modal-time').textContent = timeString;
        
        modal.classList.add('show');
    }

    hideWinModal() {
        document.getElementById('modal').classList.remove('show');
    }

    nextLevel() {
        if (this.currentLevel < 3) {
            this.currentLevel++;
            this.size = this.levels[this.currentLevel].size;
            this.resetGame();
            this.hideWinModal();
        }
    }

    resetGame() {
        this.stopTimer();
        this.moves = 0;
        this.isGameWon = false;
        this.updateMoves();
        document.getElementById('timer').textContent = '00:00';
        document.getElementById('level').textContent = this.currentLevel;
        this.initializeGame();
        this.startTimer();
    }

    newGame() {
        this.hideWinModal();
        this.resetGame();
    }

    shuffleOnly() {
        this.stopTimer();
        this.tiles = this.createTiles();
        this.shuffleTiles();
        this.moves = 0;
        this.isGameWon = false;
        this.updateMoves();
        this.renderBoard();
        this.startTimer();
    }

    getHint() {
        if (this.isGameWon) return;
        
        // Find first misplaced tile and suggest its correct position
        for (let i = 0; i < this.tiles.length - 1; i++) {
            if (this.tiles[i] !== i + 1) {
                alert(`Hint: Tile ${this.tiles[i]} should be at position ${this.tiles[i]}`);
                return;
            }
        }
    }

    setupEventListeners() {
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
        document.getElementById('shuffle-btn').addEventListener('click', () => this.shuffleOnly());
        document.getElementById('hint-btn').addEventListener('click', () => this.getHint());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        
        document.getElementById('modal-next-btn').addEventListener('click', () => this.nextLevel());
        document.getElementById('modal-restart-btn').addEventListener('click', () => this.newGame());
        
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentLevel = parseInt(e.target.dataset.level);
                this.size = this.levels[this.currentLevel].size;
                this.resetGame();
            });
        });
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new SlidingTilePuzzle();
    document.getElementById('level').textContent = game.currentLevel;
    document.querySelector(`[data-level="${game.currentLevel}"]`).classList.add('active');
    game.startTimer();
});
