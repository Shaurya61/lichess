interface GameData {
    id: string;
    rated: boolean;
    variant: string;
    speed: string;
    perf: string;
    createdAt: number;
    lastMoveAt: number;
    status: string;
    winner: string
    players: {
      white: {
        user: {
          name: string;
          title?: string;
          patron?: boolean;
          id: string;
        };
        rating: number;
        ratingDiff: number;
      };
      black: {
        user: {
          name: string;
          id: string;
        };
        rating: number;
        ratingDiff: number;
      };
    };
    opening: {
      eco: string;
      name: string;
      ply: number;
    };
    moves: string;
    clock: {
      initial: number;
      increment: number;
      totalTime: number;
    };
  }
  export default GameData;