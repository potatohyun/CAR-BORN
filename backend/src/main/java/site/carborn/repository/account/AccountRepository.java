package site.carborn.repository.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import site.carborn.entity.account.Account;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    @Query("SELECT a FROM Account a WHERE a.id = :id")
    Account findById(@Param("id") String accountId);

    @Query("SELECT a FROM Account a WHERE a.id = :id")
    Optional<Account> findByIdForOptional(@Param("id") String accountId);

    @Query("SELECT a FROM Account a WHERE a.phoneNo = :phoneNo")
    Account findByPhoneNo(@Param("phoneNo") String phoneNo);

    @Query(value = "SELECT a FROM Account a WHERE a.phoneNo = :phoneNo and a.name = :name")
    Optional<Account> findByPhoneNoAndName(@Param("phoneNo") String phoneNo, @Param("name") String name);

    @Query(value = "SELECT a FROM Account a WHERE a.id = :id and a.phoneNo = :phoneNo")
    Optional<Account> findByIdAndPhoneNo(@Param("id") String id, @Param("phoneNo") String phoneNo);
}
