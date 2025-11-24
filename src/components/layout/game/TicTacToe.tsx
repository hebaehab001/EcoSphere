"use client";

import { useCallback, useEffect, useState } from "react";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { BiSolidLeaf } from "react-icons/bi";
import { RiRobot3Line } from "react-icons/ri";
import { FaHandshakeSimple, FaPlay } from "react-icons/fa6";
import { FaRegSmileWink } from "react-icons/fa";

export default function TicTacToe() {
  type Player = "X" | "O" | null;

  // -------------------------
  // 🧩 STATES
  // -------------------------
  const [board, setBoard] = useState<Player[]>(new Array(9).fill(null));
  const [winner, setWinner] = useState<Player | "Draw">(null);
  const [isAiTurn, setIsAiTurn] = useState(false);

  // -------------------------
  // 🧩 HELPERS
  // -------------------------
  const checkWinnerReturn = useCallback((b: Player[]): Player => {
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
    for (const [x, y, z] of lines) {
      if (b[x] && b[x] === b[y] && b[y] === b[z]) return b[x];
    }
    return null;
  }, []);

  const getAvailableMoves = useCallback((b: Player[]) => {
    const moves: number[] = [];
    b.forEach((cell, i) => {
      if (cell === null) moves.push(i);
    });
    return moves;
  }, []);

  // -------------------------
  // 🧠 MINIMAX (recursive, دالة عادية)
  // -------------------------
  const minimax = (
    b: Player[],
    depth: number,
    isMaximizing: boolean
  ): number => {
    const winnerNow = checkWinnerReturn(b);

    if (winnerNow === "X") return -10 + depth;
    if (winnerNow === "O") return 10 - depth;
    if (getAvailableMoves(b).length === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const move of getAvailableMoves(b)) {
        const boardCopy = [...b];
        boardCopy[move] = "O";
        const score = minimax(boardCopy, depth + 1, false);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const move of getAvailableMoves(b)) {
        const boardCopy = [...b];
        boardCopy[move] = "X";
        const score = minimax(boardCopy, depth + 1, true);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  };

  // -------------------------
  // 🏆 CHECK WINNER (SET STATE)
  // -------------------------
  const checkWinner = useCallback((b: Player[]) => {
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

    for (const [x, y, z] of lines) {
      if (b[x] && b[x] === b[y] && b[y] === b[z]) {
        setWinner(b[x]);
        return;
      }
    }

    // كشف التعادل
    if (b.every((cell) => cell !== null)) {
      setWinner("Draw");
    }
  }, []);

  // -------------------------
  // 🤖 AI MOVE
  // -------------------------
  const aiMove = useCallback(() => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (const move of getAvailableMoves(board)) {
      const boardCopy = [...board];
      boardCopy[move] = "O";

      const score = minimax(boardCopy, 0, false);

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = "O";
      setBoard(newBoard);
      checkWinner(newBoard);
    }

    setIsAiTurn(false);
  }, [board, checkWinner, getAvailableMoves]);

  // -------------------------
  // 🎮 PLAYER MOVE
  // -------------------------
  const handleClick = (index: number) => {
    if (board[index] || winner || isAiTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    checkWinner(newBoard);

    setIsAiTurn(true);
  };

  // -------------------------
  // ⏳ WHEN AI SHOULD PLAY
  // -------------------------
  useEffect(() => {
    if (isAiTurn && !winner) {
      const timer = setTimeout(() => aiMove(), 1500);
      return () => clearTimeout(timer);
    }
  }, [isAiTurn, winner, aiMove]);

  // -------------------------
  // 🎨 ICON RENDER
  // -------------------------
  const renderIcon = (value: Player) => {
    if (value === "X")
      return (
        <BiSolidLeaf
          className="text-primary-foreground text-4xl sm:text-5xl md:text-4xl lg:text-4xl animate-spin"
          style={{ animationDuration: "3s" }}
        />
      );
    if (value === "O")
      return (
        <MdDoNotDisturbAlt className="text-primary-foreground text-4xl sm:text-5xl md:text-4xl lg:text-4xl animate-pulse" />
      );
    return null;
  };

  // -------------------------
  // 🔄 restart game
  // -------------------------
  const restartGame = () => {
    setBoard(new Array(9).fill(null));
    setWinner(null);
    setIsAiTurn(false);
  };

  // -------------------------
  // 🖥️ UI
  // -------------------------
  const getGameStatus = () => {
    if (winner) {
      if (winner === "Draw")
        return (
          <div className="flex items-center gap-2 justify-center">
            Draw <FaHandshakeSimple className="mt-1" />
          </div>
        );
      return (
        <span className="flex items-center gap-2 justify-center">
          {winner === "X" ? (
            <div className="flex items-center gap-3 justify-center">
              <FaRegSmileWink />
              You Win
            </div>
          ) : (
            <div className="flex items-center gap-3 justify-center">
              <RiRobot3Line />
              AI Win
            </div>
          )}
        </span>
      );
    }
    if (isAiTurn)
      return (
        <div className="flex items-center gap-3 justify-center">
          <RiRobot3Line />
          AI think...
        </div>
      );
    return (
      <div className="flex items-center justify-center">
        Your turn <BiSolidLeaf className="text-primary ml-3" />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md md:max-w-sm lg:max-w-md">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-4">
          <div className="bg-primary/10 backdrop-blur-sm rounded-2xl py-3 px-4 shadow-lg">
            <p className="text-xl md:text-lg lg:text-xl font-bold dark:text-secondary-foreground">
              {getGameStatus()}
            </p>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-primary/10 backdrop-blur-md rounded-3xl p-6 md:p-5 lg:p-6 shadow-2xl">
          <div className="grid grid-cols-3 gap-3 md:gap-2.5 lg:gap-3 mb-6 md:mb-4">
            {board.map((value, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                disabled={isAiTurn || winner !== null}
                className={`
                  aspect-square bg-gradient-to-br from-primary to-primary/80 rounded-2xl 
                  flex items-center justify-center shadow-lg
                  transition-all duration-300 ease-out
                  ${
                    !value && !winner && !isAiTurn
                      ? "hover:scale-105 hover:shadow-2xl hover:from-primary/90 hover:to-primary active:scale-95"
                      : ""
                  }
                  ${value ? "scale-100" : "scale-95"}
                  ${
                    isAiTurn || winner
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }
                `}
              >
                {renderIcon(value)}
              </button>
            ))}
          </div>

          {/* Action Button */}
          {winner && (
            <button
              onClick={restartGame}
              className="w-full bg-primary text-primary-foreground py-3 md:py-2.5 rounded-xl font-bold text-lg md:text-base
                hover:bg-primary/90 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FaPlay />
              Play Again
            </button>
          )}
        </div>

        {/* Footer Info */}
      </div>
    </div>
  );
}
