"use client";
import { GiTicTacToe } from "react-icons/gi";

export default function TicTacToe() {
  return (
    <div className="flex flex-col items-center gap-6 ">
      <div className="h-40 sm:h-50 bg-primary text-primary-foreground  w-full flex items-center justify-center">
        <div className="text-3xl sm:text-5xl font-bold text-foreground animate-bounce flex items-center gap-4">
          <GiTicTacToe />
          <h1>Tic Tac Toe</h1>
          <GiTicTacToe />
        </div>
      </div>

      <div className="grid grid-cols-3 justify-center items-center gap-3 bg-primary/10 p-6 rounded-lg sm:w-[60%] md:w-[50%] lg:w-[40%] mx-auto">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`w-20 h-20 sm:w-full sm:h-30 xl:h-35 bg-primary rounded flex items-center justify-center text-3xl  cursor-pointer `}
          >
            {" "}
          </div>
        ))}
      </div>
    </div>
  );
}
