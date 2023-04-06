package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.config.SecurityUtil;
import site.carborn.mapping.car.CarInsuranceHistoryGetDetailMapping;
import site.carborn.mapping.user.UserInsuranceListMapping;
import site.carborn.repository.car.CarInsuranceHistoryRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.AccountUtils;

@Service
public class UserInsuranceService {
    @Autowired
    private CarInsuranceHistoryRepository carInsuranceHistoryRepository;

    public Page<UserInsuranceListMapping> insuranceList(int page, int size) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Page<UserInsuranceListMapping> insuranceList = carInsuranceHistoryRepository.findByCar_Account_Id(
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id"
                        ,BoardUtils.ORDER_BY_DESC
                )
        );

        if (insuranceList.isEmpty()) {
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }

        return insuranceList;
    }

    public CarInsuranceHistoryGetDetailMapping insuranceDetail(int insuranceId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        CarInsuranceHistoryGetDetailMapping detail = carInsuranceHistoryRepository.findAllById(insuranceId);
        if (detail == null) {
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }
        return detail;
    }
}
