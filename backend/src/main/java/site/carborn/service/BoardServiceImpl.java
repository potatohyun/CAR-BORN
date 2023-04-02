package site.carborn.service;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.impl.SizeException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;
import site.carborn.dto.request.BoardRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.entity.board.Board;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.board.BoardRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.image.ImageUtils;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Random;

@Slf4j
@Service
@Transactional
@SuppressWarnings("unchecked")
public class BoardServiceImpl implements BoardService {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    BoardRepository boardRepository;

    @Override
    public Page<Board> getList(int page) {
        Page<Board> data = boardRepository.findAllByStatus(
                BoardUtils.BOARD_DELETE_STATUS_FALSE
                ,BoardUtils.pageRequestInit(
                        page
                        ,BoardUtils.PAGE_PER_ROW_20
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );

        if (data.isEmpty()) {
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }

        return data;
    }

    @Override
    public Board getView(int id) {
        Board data = boardRepository.findById(id).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );

        if (data.isStatus() == true) {
            throw new RuntimeException("삭제된 데이터입니다");
        }

        return data;
    }

    @Override
    public <T> int insert(T data) {
        if (data instanceof BoardRequestDTO == false) {
            throw new TypeMismatchException(data, BoardRequestDTO.class);
        }

        if (((Board) data).getAccount().getId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }

        Account account = accountRepository.findById(((Board) data).getAccount().getId());
        if (account == null) {
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }

        if (((BoardRequestDTO) data).getFile().isEmpty()) {
            throw new MultipartException("첨부파일이 없습니다");
        }

        // 첨부파일 저장
        String fileName = BoardUtils.singleFileSave(((BoardRequestDTO) data).getFile());
        ((Board) data).setImgNm(fileName);

        ((Board) data).setStatus(false);
        ((Board) data).setRegDt(LocalDateTime.now());
        ((Board) data).setUptDt(LocalDateTime.now());

        Board save = boardRepository.save(Board.copy((Board) data));
        return save.getId();
    }

    @Override
    public <T> int update(T data) {
        if (data instanceof Board == false) {
            throw new TypeMismatchException(data, Board.class);
        }

        if (((Board) data).getAccount().getId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }

        Account account = accountRepository.findById(((Board) data).getAccount().getId());
        if (account == null) {
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }

        Board save = boardRepository.findById(((Board) data).getId()).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );

        save.setTitle(((Board) data).getTitle());
        save.setContent(((Board) data).getContent());
        save.setUptDt(LocalDateTime.now());

        boardRepository.save(save);
        return save.getId();
    }

    @Override
    public void delete(int id) {
        Board data = boardRepository.findById(id).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );

        if (data.isStatus() == true) {
            throw new RuntimeException("삭제된 데이터입니다");
        }

        data.setStatus(true);
        data.setUptDt(LocalDateTime.now());

        boardRepository.save(data);
    }
}
