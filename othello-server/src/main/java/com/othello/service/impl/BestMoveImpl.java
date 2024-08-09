package com.othello.service.impl;

import com.othello.entity.QueryDTO;
import com.othello.entity.ResponseVO;
import com.othello.service.BestMoveService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BestMoveImpl implements BestMoveService {

    @Override
    public ResponseVO getBestMove(QueryDTO query) {
        String[][] board = query.getBoard();
        String player = query.getPlayer();
        Integer depth = query.getDepth();

        Integer[] bestMove = minimax(board, depth, Integer.MIN_VALUE, Integer.MAX_VALUE, true, player);

        return new ResponseVO(bestMove);
    }

    private Integer evaluateBoard(String[][] board, String player) {
        int score = 0;

        int[][] positionalWeights = {
                {100, -10, 10, 10, 10, 10, -10, 100},
                {-10, -20, 1, 1, 1, 1, -20, -10},
                {10, 1, 5, 5, 5, 5, 1, 10},
                {10, 1, 5, 0, 0, 5, 1, 10},
                {10, 1, 5, 0, 0, 5, 1, 10},
                {10, 1, 5, 5, 5, 5, 1, 10},
                {-10, -20, 1, 1, 1, 1, -20, -10},
                {100, -10, 10, 10, 10, 10, -10, 100}
        };

        int myPieces = 0;
        int opponentPieces = 0;

        String opponent = player.equals("W") ? "B" : "W";

        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                if (board[i][j].equals(player)) {
                    myPieces++;
                    score += positionalWeights[i][j];
                } else if (board[i][j].equals(opponent)) {
                    opponentPieces++;
                    score -= positionalWeights[i][j];
                }
            }
        }

        int piecesDifference = myPieces - opponentPieces;
        return piecesDifference + score;
    }

    private List<int[]> getLegalMove(String[][] board, String player) {
        List<int[]> legalMove = new ArrayList<>();

        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                if (board[i][j].equals(" ") && isLegalMove(board, i, j, player)) {
                    legalMove.add(new int[]{i, j});
                }
            }
        }
        return legalMove;
    }

    private Boolean isLegalMove(String[][] board, int row, int col, String player) {
        String opponent = player.equals("B") ? "W" : "B";
        int[][] directions = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}, {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};

        for (int[] direction : directions) {
            int dr = direction[0];
            int dc = direction[1];
            int r = row + dr;
            int c = col + dc;

            if (0 <= r && r < 8 && 0 <= c && c < 8 && board[r][c].equals(opponent)) {
                while (0 <= r && r < 8 && 0 <= c && c < 8) {
                    if (board[r][c].equals(player)) {
                        return true;
                    }
                    if (board[r][c].equals(" ")) {
                        break;
                    }
                    r += dr;
                    c += dc;
                }
            }
        }
        return false;
    }

    private String[][] makeMove(String[][] board, int[] move, String player) {
        String[][] newBoard = new String[board.length][];
        for (int i = 0; i < board.length; i++) {
            newBoard[i] = board[i].clone();
        }

        int r = move[0];
        int c = move[1];
        newBoard[r][c] = player;
        flipChess(r, c, player, newBoard);
        return newBoard;
    }

    private void flipChess(int r, int c, String player, String[][] board) {
        String opponent = player.equals("B") ? "W" : "B";
        int[][] directions = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}, {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};

        for (int[] direction : directions) {
            int dr = direction[0];
            int dc = direction[1];
            int row = r + dr;
            int col = c + dc;
            List<int[]> path = new ArrayList<>();
            while (0 <= row && row < 8 && 0 <= col && col < 8 && board[row][col].equals(opponent)) {
                path.add(new int[]{row, col});
                row += dr;
                col += dc;
            }
            if (0 <= row && row < 8 && 0 <= col && col < 8 && board[row][col].equals(player)) {
                for (int[] p : path) {
                    board[p[0]][p[1]] = player;
                }
            }
        }
    }

    private boolean gameOver(String[][] board) {
        return getLegalMove(board, "B").isEmpty() && getLegalMove(board, "W").isEmpty();
    }

    private Integer[] minimax(String[][] board, int depth, int alpha, int beta, boolean maximizingPlayer, String player) {
        if (depth == 0 || gameOver(board)) {
            return new Integer[]{evaluateBoard(board, player), -1, -1};
        }

        String opponent = player.equals("B") ? "W" : "B";

        if (maximizingPlayer) {
            int maxEval = Integer.MIN_VALUE;
            int[] bestMove = new int[]{-1, -1};
            for (int[] move : getLegalMove(board, player)) {
                String[][] newBoard = makeMove(board, move, player);
                Integer[] evalNum = minimax(newBoard, depth - 1, alpha, beta, false, opponent);
                if (evalNum[0] > maxEval) {
                    maxEval = evalNum[0];
                    bestMove = move;
                }
                alpha = Math.max(alpha, evalNum[0]);
                if (beta <= alpha) {
                    break;
                }
            }
            return new Integer[]{maxEval, bestMove[0], bestMove[1]};
        } else {
            int minEval = Integer.MAX_VALUE;
            int[] bestMove = new int[]{-1, -1};
            for (int[] move : getLegalMove(board, opponent)) {
                String[][] newBoard = makeMove(board, move, opponent);
                Integer[] evalNum = minimax(newBoard, depth - 1, alpha, beta, true, player);
                if (evalNum[0] < minEval) {
                    minEval = evalNum[0];
                    bestMove = move;
                }
                beta = Math.min(beta, evalNum[0]);
                if (beta <= alpha) {
                    break;
                }
            }
            return new Integer[]{minEval, bestMove[0], bestMove[1]};
        }
    }
}
