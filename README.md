# 🧩 Fi-Puzzle Game | 1.0

A fully-featured Fi-Puzzle Game built by Fitiwebs with HTML, CSS, and JavaScript. Challenge yourself with multiple difficulty levels and track your progress with move counters and timers.

## Features

### Game Mechanics
- **Three Difficulty Levels**: 3x3, 4x4, and 5x5 grid puzzles
- **Smart Shuffling**: Algorithm ensures every puzzle is solvable
- **Smooth Gameplay**: Click tiles adjacent to the empty space to move them
- **Progress Tracking**: Monitor moves and elapsed time
- **Level Progression**: Complete levels to unlock harder challenges

### Game Controls
- **New Game**: Start a fresh game with current difficulty
- **Shuffle**: Randomly reshuffle tiles to change the puzzle
- **Hint**: Get suggestions on which tile to move next
- **Reset**: Restore the game to its shuffled state
- **Level Selection**: Quickly switch between 3x3, 4x4, and 5x5 modes

### User Experience
- **Win Detection**: Automatic victory detection when puzzle is solved
- **Statistics Modal**: View your level, moves, and time upon completion
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Visual Feedback**: Tiles highlight on hover and when selected
- **Modern UI**: Gradient backgrounds and smooth animations

## How to Play

1. **Start the Game**: Open `index.html` in your web browser
2. **Select Level**: Choose your difficulty (3x3, 4x4, or 5x5)
3. **Move Tiles**: Click on any tile adjacent to the empty space to move it
4. **Solve Puzzle**: Arrange tiles in numerical order (1-8, 1-15, or 1-24)
5. **Complete**: The empty space should be in the bottom-right corner
6. **Next Level**: After solving, choose to proceed to the next level or play again

## Game Files

- **index.html** - Game structure and interface
- **styles.css** - Styling and layout
- **script.js** - Game logic and mechanics

## Technical Details

### Solvability Algorithm
The game uses an inversion-counting algorithm to ensure every shuffled puzzle is solvable. This prevents impossible puzzle states.

### Move Calculation
Only tiles adjacent to the empty space can be moved. The game validates all moves to prevent invalid operations.

### Timer System
Automatic timer tracks your gameplay duration, starting when you load the game or begin a new level.

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

1. Clone the repository
2. Navigate to the Fi-Puzzle directory
3. Open `index.html` in your browser
4. Start playing!

## Tips for Success

- Start with the 3x3 level to learn the mechanics
- Focus on solving one section at a time
- Use the hint feature to identify misplaced tiles
- Track your best times and try to beat your record
- Progress through levels to master the 5x5 challenge

Enjoy the puzzle! 🎮
