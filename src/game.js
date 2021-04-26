import React from "react";
import Board from './board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            XisNext: true,
            stepNumber: 0,    
        };
    }
    handleClick(i) {
        if(this.state.stepNumber !== this.state.history.length - 1) return;

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        

        if (this.calculateWinner(squares) || squares[i]) {
            return;
          }
        squares[i] = this.state.XisNext ? "X" : "O";
        this.setState({
            history: history.concat([{
                squares: squares,
              }]),
              stepNumber: history.length,
            XisNext: !this.state.XisNext,
        });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        for(let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                console.log(squares);
                return squares[a];
            }
        }
        return null;
    }

    jumpTo (step) {
        this.setState({
            stepNumber: step,
            XisNext: (step % 2) === 0,
        })

    }
    resetGame () {
        let history = [...this.state.history];
        history = [{squares: Array(9).fill(null)}];
        this.setState({
            history: history,
            stepNumber: 0,
            XisNext: true,
        
        })
    }

    render() {
        const history = this.state.history;
        const current =  history[this.state.stepNumber];
        const winner =  this.calculateWinner(current.squares);
        let status;
        const drowCheck = current.squares.findIndex(el => el == null);
        const moves = history.map((step, move) => {
                if(move > 0){
                    const desk = move > 1 ? `Перейти к ходу #${move - 1}` : "К началу игры";
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desk}</button>
                    </li>
                ) 
            
                }
                
        })

      if(winner) {
        status = "Выйграл игрок " + winner;
      }
      else {
        status = this.state.XisNext ? 'Следующим ходит: X' : 'Следующим ходит: O';
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            {(drowCheck === -1 || winner) && (<button className='reset' onClick={() => this.resetGame()}>Начать заново</button>)}
          </div>
        </div>
      );
    }
  }

  export default Game;