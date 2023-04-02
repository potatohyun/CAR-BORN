package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.mapping.car.CarInsuranceHistoryGetDetailMapping;
import site.carborn.mapping.user.UserInsuranceListMapping;
import site.carborn.repository.car.CarInsuranceHistoryRepository;
import site.carborn.util.board.BoardUtils;

@Service
public class UserInsuranceService {
    @Autowired
    private CarInsuranceHistoryRepository carInsuranceHistoryRepository;

    public Page<UserInsuranceListMapping> insuranceList(String accountId, int page, int size) {
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
        CarInsuranceHistoryGetDetailMapping detail = carInsuranceHistoryRepository.findAllById(insuranceId);
        if (detail == null) {
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }
        return detail;
    }
}
