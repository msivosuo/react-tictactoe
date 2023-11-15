/* 
 * TictactoeBoard.js
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

import styles from "./tictactoe.module.css";

function TictactoeSquare(props) {
    const {rowIndex, cellIndex, cell, HandleClick} = props;
    return (
        <div onClick={() => HandleClick(rowIndex, cellIndex)} key={props.cellIndex} className={styles.cell}>{cell}</div>
    );
}

function TictactoeBoard(props) {
    const { board, HandleClick } = props;
    return (
        <div className={styles.board}>
        {board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
                {row.map((cell, cellIndex) => (
                    <TictactoeSquare HandleClick={HandleClick} rowIndex={rowIndex} cellIndex={cellIndex} cell={cell} />
                ))}
            </div>
        ))}
        </div>
    );
}

export default TictactoeBoard;