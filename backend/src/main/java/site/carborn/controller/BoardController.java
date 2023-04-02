package site.carborn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.dto.request.BoardRequestDTO;
import site.carborn.entity.board.Board;
import site.carborn.service.BoardServiceImpl;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

@RestController
@CrossOrigin(origins = "*")
public class BoardController {
    @Autowired
    BoardServiceImpl boardService;

    @GetMapping("/api/board/list/{page}")
    public ResponseEntity<?> boardList(@PathVariable int page) {
        Page<Board> data = boardService.getList(page);
        return NormalResponse.toResponseEntity(HttpStatus.OK, data);
    }

    @GetMapping("/api/board/{id}")
    public ResponseEntity<?> boardView(@PathVariable int id) {
        Board data = boardService.getView(id);
        return NormalResponse.toResponseEntity(HttpStatus.OK, data);
    }

    @PostMapping("/api/board")
    public ResponseEntity<?> insert(@RequestBody BoardRequestDTO boardRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, boardService.insert(boardRequestDTO));
    }

    @PatchMapping("/api/board")
    public ResponseEntity<?> update(@RequestBody Board board) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, boardService.update(board));
    }

    @DeleteMapping("/api/board/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        boardService.delete(id);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }
}
