import axios from 'axios';

export async function getBestMove(board, player) {
    console.log(board)
    try {
        const response = await axios.post('/bestMove', {
            board,
            player,
            depth: 5
        });

        const bestMove = response.data.bestMove
        console.log("Best Move:", bestMove);
        return bestMove; // 返回最佳移动
    } catch (error) {
        console.error("Error fetching the best move:", error);
        return null; // 请求失败时返回 null
    }
}
