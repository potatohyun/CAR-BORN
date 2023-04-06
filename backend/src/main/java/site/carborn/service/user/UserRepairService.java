package site.carborn.service.user;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.config.SecurityUtil;
import site.carborn.entity.account.Account;
import site.carborn.entity.car.Car;
import site.carborn.entity.company.Inspector;
import site.carborn.entity.company.RepairShopReview;
import site.carborn.entity.user.RepairBook;
import site.carborn.entity.user.RepairResult;
import site.carborn.mapping.company.RepairShopReviewMapping;
import site.carborn.mapping.user.RepairResultGetDetailMapping;
import site.carborn.mapping.user.UserRepairBookDetailMapping;
import site.carborn.mapping.user.UserRepairBookListMapping;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.company.RepairShopReviewRepository;
import site.carborn.repository.user.RepairBookRepository;
import site.carborn.repository.user.RepairResultRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.AccountUtils;
import site.carborn.util.common.BookUtils;

import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
public class UserRepairService {
    @Autowired
    private RepairBookRepository repairBookRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    private RepairResultRepository repairResultRepository;
    @Autowired
    private RepairShopReviewRepository repairShopReviewRepository;
    @Autowired
    private InspectorRepository inspectorRepository;
    @Autowired
    private CarRepository carRepository;

    public Page<UserRepairBookListMapping> repairBookList(int page, int size) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Page<UserRepairBookListMapping> repairBookList = repairBookRepository.findByStatusAndAccount_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE,
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
        if (repairBookList.isEmpty()) {
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return repairBookList;
    }

    public UserRepairBookDetailMapping repairBook(int id) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        // 게시글이 없을때
        UserRepairBookDetailMapping repairBook = repairBookRepository.findByStatusAndId(BoardUtils.BOARD_DELETE_STATUS_FALSE, id);

        if (repairBook == null) {
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }

        return repairBook;
    }


    public int createRepairBook(RepairBook repairBook) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Account account = accountRepository.findById(accountId);
        if (account == null) {
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }
        Inspector inspector = inspectorRepository.findById(repairBook.getRepairShop().getId()).orElseThrow(() ->
                new RuntimeException("존재하지 않는 검수원입니다"));

        Car car = carRepository.findById(repairBook.getCar().getId()).orElseThrow(() ->
                new RuntimeException("등록되지 않은 차입니다"));

        repairBook.setAccount(account);
        repairBook.setRegDt(LocalDateTime.now());
        repairBook.setUptDt(LocalDateTime.now());
        repairBook.setBookStatus(BookUtils.BOOK_STATUS_WAIT);
        repairBook.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);

        RepairBook save = repairBookRepository.save(repairBook);
        return save.getId();
    }

    public void deleteRepairBook(int id) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        RepairBook delete = repairBookRepository.findById(id).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );
        if (delete.getAccount().getId().equals(accountId) == false) {
            throw new RuntimeException("작성자가 아닙니다");
        }

        if (delete.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 데이터입니다");
        }
        if (delete.getBookStatus() != BookUtils.BOOK_STATUS_WAIT) {
            throw new RuntimeException("정비가 완료됬거나 취소되어 변경이 불가능 합니다");
        }

        delete.setStatus(BoardUtils.BOARD_DELETE_STATUS_TRUE);
        delete.setUptDt(LocalDateTime.now());
        repairBookRepository.save(delete);
    }


    public int updateRepairBook(RepairBook repairBook) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        RepairBook update = repairBookRepository.findById(repairBook.getId()).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다"));
        if (update.getAccount().getId().equals(accountId) == false) {
            throw new RuntimeException("작성자가 아닙니다");
        }
        if (update.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 데이터입니다");
        }
        if (update.getBookStatus() != BookUtils.BOOK_STATUS_WAIT) {
            throw new RuntimeException("검수가 완료됬거나 취소되어 변경이 불가능 합니다");
        }

        update.setCar(repairBook.getCar());
        update.setContent(repairBook.getContent());
        update.setBookDt(repairBook.getBookDt());
        update.setUptDt(LocalDateTime.now());

        repairBookRepository.save(update);
        return update.getId();
    }

    //정비완료
    public RepairResultGetDetailMapping repairResultDetail(int repairResultId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        int bookStatus = repairBookRepository.findById(repairResultId).get().getBookStatus();
        if (bookStatus == 0) {
            throw new RuntimeException("검사가 완료되지 않았습니다");
        } else if (bookStatus == 2) {
            throw new RuntimeException("취소된 예약입니다");
        }
        RepairResultGetDetailMapping result = repairResultRepository.findAllByRepairBook_Id(repairResultId);
        if (result == null) {
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }

        return result;
    }


    //리뷰
    public RepairShopReviewMapping getRepairReviewDetail(int repairResultId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        RepairShopReviewMapping result = repairShopReviewRepository.findByStatusAndRepairResult_Id(BoardUtils.BOARD_DELETE_STATUS_FALSE, repairResultId);
        return result;
    }

    public int createRepairReview(int repairResultId, RepairShopReview repairShopReview) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Account account = accountRepository.findById(accountId);
        if (account == null) {
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }

        RepairResult result = repairResultRepository.findById(repairResultId).orElseThrow(() ->
                new RuntimeException("수리결과가 없습니다"));

        //이미 리뷰가 있는경우
        if (repairShopReviewRepository.findByRepairResult_Id(repairResultId) != null){
            throw new RuntimeException("리뷰가 이미 존재합니다");
        }

        //예약 신청자와 리뷰 작성자가 다를경우
        if (result.getRepairBook().getAccount().getId().equals(accountId)==false){
            throw new RuntimeException("권한이 없습니다");
        }


        repairShopReview.setRepairResult(result);
        repairShopReview.setRepairShop(result.getRepairBook().getRepairShop());
        repairShopReview.setAccount(account);

        repairShopReview.setRegDt(LocalDateTime.now());
        repairShopReview.setUptDt(LocalDateTime.now());
        repairShopReview.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);

        RepairShopReview save = repairShopReviewRepository.save(repairShopReview);
        return save.getId();
    }
}
