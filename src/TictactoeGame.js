/* 
 * TictactoeGame.js
 *
 * Copyright (c) 2023 Matti-Pekka Sivosuo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 *copies or substantial portions of the Software.

 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *SOFTWARE.
 */

import { useState } from "react";
import {numberOfRows} from "./shared.js";
import TictactoeBoard from "./TictactoeBoard.js";
import TictactoeResetButton from "./TictactoeResetButton.js";

function TictactoeGame() {
    const xMark = "X";
    const oMark = "O";
    const empty = "Free";
    const [winner, setWinner] = useState(empty);   
    const [previous, setPrevious] = useState(oMark);
    const [board, setBoard] = useState(Array.from({ length: numberOfRows }, () => new Array(numberOfRows).fill(empty)));

    function Reset(x, y) {
        setBoard(Array.from({length: numberOfRows}, () => new Array(numberOfRows).fill(empty)));
        setPrevious(oMark);
        setWinner(empty);
    };

    function CheckWinner(mark) {
        // check all the horizontal lines, e.g. [1][1] [2][1] [3][1]
        const rows = board.slice().map(row => row.slice());
        let result = false;
        rows.forEach(row => {
            if (!row.some(cell => cell !== mark)) {
                result = true;
                return;
            }
        });     
        if(result) {
            return true;
        }
        //check all the vertical lines, e.g. [1][0] [1][1] [1][2]
        const columns = board[0].map((_, index) => board.map(row => row[index]));
        columns.forEach(row => {
            if (!row.some(cell => cell !== mark)) {
                result = true;
                return;
            }
        });
        if(result) {
            return true;
        }   
        // check diagonal lines, e.g. [0][0] [1][1] [2][2]
        if(board[0][0] === mark && mark === board[numberOfRows - 1][numberOfRows - 1]) {
            for(let i = 1; i < numberOfRows - 1; i++) {
                if (board[i][i] === mark && i === numberOfRows -2) {
                    return true;
                }
                else if(board[i][i] === mark) {
                    continue;
                } 
                else {
                    break;
                }
            }
        }
        // check diagonal lines, e.g. [0][3] [1][2] [2][1] [3][0]
        if(board[0][numberOfRows - 1] === mark && mark === board[numberOfRows - 1][0]) {
            for(let i = 1; i < numberOfRows - 1; i++) {
                if (board[i][numberOfRows -1 - i] === mark && i === numberOfRows -2) {
                  return true;
                }
                else if(board[i][numberOfRows -1 - i] === mark) {
                  continue;
                } 
                else { 
                    break;
                }
          
            }
        }
        return false;
    };

    function HandleClick(x, y) {
        if (board[x][y] !== empty) {
            return;
        }
        const newBoard = [...board];
        newBoard[x][y] = previous === oMark ? xMark : oMark;
        setBoard(newBoard);
        setPrevious(board[x][y]);
        if(CheckWinner(xMark) ) {
            setWinner(xMark);
        }
        else if( CheckWinner(oMark)) {
            setWinner(oMark);
        } 
    };

    if(winner !== empty) {
        return (
            <> 
                <h1>Winner is {winner}!</h1>
                <TictactoeBoard HandleClick={() => {}} board={board}/>
                <TictactoeResetButton Reset={Reset}/>
            </>
        );
    }
    else {
        return (
            <>
                <TictactoeBoard HandleClick={HandleClick} board={board}/>
                <TictactoeResetButton Reset={Reset}/>
            </>
        );
    }
}

export default TictactoeGame;