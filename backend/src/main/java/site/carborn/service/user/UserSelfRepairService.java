package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.config.SecurityUtil;
import site.carborn.entity.user.SelfRepair;
import site.carborn.mapping.user.UserInspectBookDetailMapping;
import site.carborn.mapping.user.UserInspectBookListMapping;
import site.carborn.repository.user.SelfRepairRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.AccountUtils;

@Service
public class UserSelfRepairService {
    @Autowired
    private SelfRepairRepository selfRepairRepository;

    public Page<SelfRepair> selfRepairsList(int page, int size) {
        Page<SelfRepair> selfRepairsList = selfRepairRepository.findAllByStatus(
                BoardUtils.BOARD_DELETE_STATUS_FALSE
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );

        if (selfRepairsList.isEmpty()) {
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return selfRepairsList;
    }

    public SelfRepair selfRepairDetail(int selfRepairId) {
        SelfRepair SelfRepair = selfRepairRepository.findByIdAndStatus(selfRepairId,BoardUtils.BOARD_DELETE_STATUS_FALSE);

        if (SelfRepair == null){
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }

        return SelfRepair;
    }

}
