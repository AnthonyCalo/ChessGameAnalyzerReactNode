const jsChessEngine = require('js-chess-engine')
const { move } = jsChessEngine    
const newFen = move('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1', 'H7', 'H5')
console.log(newFen)

export default newFen