package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CarSaleBook;
import site.carborn.mapping.user.*;

import java.time.LocalDateTime;

@Repository
public interface CarSaleBookRepository extends JpaRepository<CarSaleBook, Integer> {
    Page<CarSaleBookGetListMapping> findAllByStatusAndAccountId(@Param("status") boolean status, @Param("accountId") String accountId, Pageable page);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE CarSaleBook csb SET csb.bookStatus = :bookStatus, csb.uptDt = :uptDt WHERE csb.id = :id AND csb.status = :status AND csb.bookStatus = :checkStatus")
    void updateBookStatusCancel(@Param("id") int id,@Param("bookStatus") int bookStatus, @Param("status") boolean status ,@Param("uptDt") LocalDateTime uptDt, @Param("checkStatus") int checkStatus);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE CarSaleBook csb SET csb.bookStatus = :bookStatus, csb.uptDt = :uptDt WHERE csb.carSale.id = :carSaleId AND csb.status = :status And csb.bookStatus = :checkStatus")
    void updateSaleCancel(@Param("carSaleId") int carSaleId,@Param("bookStatus") int bookStatus, @Param("status") boolean status ,@Param("uptDt") LocalDateTime uptDt, @Param("checkStatus") int checkStatus);

    CarSaleBookGetBookStatusMapping findByStatusAndAccount_IdAndCarSale_Id(@Param("status") boolean status, @Param("accountId") String accountId, @Param("carSaleId") int carSaleId);

    Page<CarSaleBookGetReservationListMapping> findAllByStatusAndBookStatusAndCarSale_Id(@Param("status") boolean status, @Param("bookStatus") int bookStatus, @Param("carSaleId") int carSaleId, Pageable pageable);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE CarSaleBook csb SET csb.bookStatus = :bookStatus, csb.uptDt = :uptDt WHERE csb.status = :status AND csb.carSale.id = :carSaleId AND csb.account.id != :accountId")
    void updateBookStatusAllCancel(@Param("bookStatus") int bookStatus, @Param("status") boolean status ,@Param("uptDt") LocalDateTime uptDt, @Param("carSaleId") int carSaleId, @Param("accountId") String accountId);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE CarSaleBook csb SET csb.bookStatus = :bookStatus, csb.uptDt = :uptDt WHERE csb.status = :status AND csb.carSale.id = :carSaleId AND csb.account.id = :accountId")
    void updateBookStatusComplete(@Param("bookStatus") int bookStatus, @Param("status") boolean status ,@Param("uptDt") LocalDateTime uptDt, @Param("carSaleId") int carSaleId, @Param("accountId") String accountId);
}
