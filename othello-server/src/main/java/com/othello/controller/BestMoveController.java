package com.othello.controller;

import com.othello.entity.QueryDTO;
import com.othello.entity.ResponseVO;
import com.othello.service.BestMoveService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bestMove")
@Slf4j
public class BestMoveController {
    @Autowired

    private BestMoveService bestMoveService;
    @PostMapping
    public ResponseVO getBestMove(@RequestBody QueryDTO query) {
        log.info("getBestMove {}", query);
        ResponseVO responseVO = bestMoveService.getBestMove(query);
        log.info("getBestMove responseVO {}", responseVO);
        return responseVO;
    }
}
