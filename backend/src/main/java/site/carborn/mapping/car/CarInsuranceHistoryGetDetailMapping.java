package site.carborn.mapping.car;

import java.time.LocalDateTime;

public interface CarInsuranceHistoryGetDetailMapping {

    String getId();

    //기업정보
    String getInsuranceCompanyAccountId();

    //차정보
    String getCarAccountId();
    String getCarMaker();
    String getCarModelNm();
    String getCarModelYear();
    String getCarRegNm();

    String getCarVin();

    String getCategory();

    String getContent();

    String getInsuranceImgNm();

    LocalDateTime getInsuranceDt();

    String getMetadataUri();

    LocalDateTime getRegDt();
}
