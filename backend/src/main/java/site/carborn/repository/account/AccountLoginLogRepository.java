package site.carborn.repository.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.account.AccountLoginLog;

@Repository
public interface AccountLoginLogRepository extends JpaRepository<AccountLoginLog, Integer>  {

}
