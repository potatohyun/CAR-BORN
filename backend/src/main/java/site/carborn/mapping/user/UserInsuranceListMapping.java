package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface UserInsuranceListMapping {
    int getId();

    //기업정보
    String getInsuranceCompanyAccountId();

    String getInsuranceCompanyAccountName();

    //차정보
    String getCarMaker();

    String getCarModelNm();

    String getCarModelYear();

    String getCarRegNm();

    //보험수리관련
    String getCategory();

    LocalDateTime getInsuranceDt();

    String getMetadataUri();
    
    LocalDateTime getRegDt();

}
