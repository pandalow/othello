package com.othello.service;

import com.othello.entity.QueryDTO;
import com.othello.entity.ResponseVO;

public interface BestMoveService {

    ResponseVO getBestMove(QueryDTO query);
}
