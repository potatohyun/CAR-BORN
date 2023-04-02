package site.carborn.repository.common;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.common.SmsAuth;

@Repository
public interface SmsAuthRepository extends JpaRepository<SmsAuth, Integer> {
    @Query(value = "SELECT * FROM MWS_SMS_AUTH WHERE (TIMESTAMPDIFF(MINUTE, NOW(), EXP_DT) BETWEEN 0 AND 3) AND PHONE_NM = :phoneNm AND STATUS = 0 ORDER BY EXP_DT DESC LIMIT 1;", nativeQuery = true)
    SmsAuth getSmsAuth(@Param("phoneNm") String phoneNm);

    @Query(value = "SELECT * FROM MWS_SMS_AUTH WHERE (TIMESTAMPDIFF(MINUTE, NOW(), EXP_DT) BETWEEN -30 AND 3) AND PHONE_NM = :phoneNm AND STATUS = 1 ORDER BY EXP_DT DESC LIMIT 1;", nativeQuery = true)
    SmsAuth checkSmsAuth(@Param("phoneNm") String phoneNm);
}
