package site.carborn.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.config.SecurityUtil;
import site.carborn.entity.account.Account;
import site.carborn.entity.user.Community;
import site.carborn.entity.user.CommunityReview;
import site.carborn.mapping.user.UserCommunityCommentListMapping;
import site.carborn.mapping.user.UserCommunityListMapping;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.user.CommunityRepository;
import site.carborn.repository.user.CommunityReviewRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.AccountUtils;
import site.carborn.util.common.SortUtils;

import java.time.LocalDateTime;

@Service
public class UserCommunityService {
    @Autowired
    private CommunityRepository communityRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CommunityReviewRepository communityReviewRepository;

    public Page<UserCommunityListMapping> getBoardList(int page, int size, int sort, String keyword) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        String orderBy = BoardUtils.ORDER_BY_DESC;
        String sortBy = BoardUtils.SORT_BY_ID;

        Page<UserCommunityListMapping> boardList = null;

        switch (sort) {
            case SortUtils.SORT_STATUS_NEW -> {
                orderBy = BoardUtils.ORDER_BY_DESC;
                sortBy = BoardUtils.SORT_BY_ID;
            }
            case SortUtils.SORT_STATUS_OLD -> {
                orderBy = BoardUtils.ORDER_BY_ASC;
                sortBy = BoardUtils.SORT_BY_ID;
            }
            case SortUtils.SORT_STATUS_VIEWS_DESC -> {
                orderBy = BoardUtils.ORDER_BY_DESC;
                sortBy = BoardUtils.SORT_BY_VIEWS;
            }
            case SortUtils.SORT_STATUS_VIEWS_ASC -> {
                orderBy = BoardUtils.ORDER_BY_ASC;
                sortBy = BoardUtils.SORT_BY_VIEWS;
            }
            default -> throw new RuntimeException("올바르지 않은 정렬 입니다");
        }

        if (keyword == null) {
            boardList = communityRepository.findByStatus(
                    BoardUtils.BOARD_DELETE_STATUS_FALSE
                    ,BoardUtils.pageRequestInit(
                            page
                            ,size
                            ,sortBy
                            ,orderBy
                    )
            );


        } else {
            boardList = communityRepository.findByStatusAndTitleContainingOrContentContaining(
                    BoardUtils.BOARD_DELETE_STATUS_FALSE
                    ,keyword
                    ,keyword
                    ,BoardUtils.pageRequestInit(
                            page
                            ,size
                            ,sortBy
                            ,orderBy
                    )
            );
        }

        return boardList;
    }

    @Transactional
    public UserCommunityListMapping getBoardDetail(int communityId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        communityRepository.updateView(communityId);
        UserCommunityListMapping boardDetail = communityRepository.findAllByIdAndStatus(communityId, BoardUtils.BOARD_DELETE_STATUS_FALSE);

        if (boardDetail == null) {
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }

        return boardDetail;
    }

    public int createBoard(Community community) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Account account = accountRepository.findById(accountId);
        if (account == null) {
            throw new RuntimeException("해당하는 계정을 사용할 수 없습니다");
        }

        community.setAccount(account);
        community.setRegDt(LocalDateTime.now());
        community.setUptDt(LocalDateTime.now());
        community.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);

        Community save = communityRepository.save(community);
        return save.getId();
    }

    public int updateBoard(Community community, int communityId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        if (community.getId() != communityId) {
            throw new RuntimeException("잘못된 경로입니다");
        }

        Community update = communityRepository.findById(communityId).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다"));

        if (update.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 데이터입니다");
        }
        if (update.getAccount().getId().equals(accountId)) {
            throw new RuntimeException("작성자가 아닙니다");
        }

        update.setTitle(community.getTitle());
        update.setContent(community.getContent());
        update.setUptDt(LocalDateTime.now());

        communityRepository.save(update);
        return update.getId();
    }

    public void deleteBoard(int communityId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Community delete = communityRepository.findById(communityId).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );

        if (delete.getAccount().getId().equals(accountId) == false) {
            throw new RuntimeException("작성자가 아닙니다");
        }

        if (delete.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 데이터입니다");
        }

        delete.setStatus(BoardUtils.BOARD_DELETE_STATUS_TRUE);
        delete.setUptDt(LocalDateTime.now());
        communityRepository.save(delete);
    }


    //리뷰
    public int createComment(CommunityReview communityReview) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Account account = accountRepository.findById(accountId);
        if (account == null) {
            throw new RuntimeException("해당하는 계정을 사용할 수 없습니다");
        }

        communityReview.setAccount(account);
        communityReview.setRegDt(LocalDateTime.now());
        communityReview.setUptDt(LocalDateTime.now());
        communityReview.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);

        CommunityReview save = communityReviewRepository.save(communityReview);
        return save.getId();
    }

    public Page<UserCommunityCommentListMapping> getCommentList(int page, int size, int communityId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Page<UserCommunityCommentListMapping> getcommentList = communityReviewRepository.findByCommunity_IdAndStatus(
                communityId,
                BoardUtils.BOARD_DELETE_STATUS_FALSE
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
        if (getcommentList.isEmpty()) {
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return getcommentList;
    }

    public int updateComment(CommunityReview communityReview, int commentId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        if (communityReview.getId() != commentId) {
            throw new RuntimeException("잘못된 경로입니다");
        }
        CommunityReview update = communityReviewRepository.findById(commentId).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다"));

        if (update.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 게시글입니다");
        }

        update.setContent(communityReview.getContent());
        update.setUptDt(LocalDateTime.now());

        communityReviewRepository.save(update);
        return update.getId();
    }

    public void deleteComment(int commentId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        CommunityReview delete = communityReviewRepository.findById(commentId).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );

        if (delete.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 데이터입니다");
        }

        delete.setStatus(BoardUtils.BOARD_DELETE_STATUS_TRUE);
        delete.setUptDt(LocalDateTime.now());
        communityReviewRepository.save(delete);
    }

    public Page<UserCommunityListMapping> getMyBoardList(int page, int size) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Page<UserCommunityListMapping> myList = communityRepository.findByStatusAndAccount_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE
                ,accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id"
                        ,BoardUtils.ORDER_BY_DESC
                )
        );

        if (myList == null || myList.isEmpty()) {
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }

        return myList;
    }

}
