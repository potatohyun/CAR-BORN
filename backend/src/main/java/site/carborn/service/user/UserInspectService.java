package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.mapping.user.UserInspectBookListMapping;
import site.carborn.repository.user.InspectBookRepository;
import site.carborn.repository.user.InspectResultRepository;
import site.carborn.util.board.BoardUtils;

@Service
public class UserInspectService {
    @Autowired
    private InspectBookRepository inspectBookRepository;
    @Autowired
    private InspectResultRepository inspectResultRepository;

    public Page<UserInspectBookListMapping> inspectBookList(String accountId, int page, int size){
        Page<UserInspectBookListMapping> inspectBookList = inspectBookRepository.findByStatusAndAccount_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE,
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
        if(inspectBookList.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return inspectBookList;
    }
}
