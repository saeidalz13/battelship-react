export type TGrid = number[][];

export const newGrid = (gridSize: number): TGrid => {
  const grid: TGrid = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [0, 0, 0, 0, 0];
  }
  return grid;
};
