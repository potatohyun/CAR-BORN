package site.carborn.repository.car;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.Car;
import site.carborn.mapping.car.CarGetDetailMapping;
import site.carborn.mapping.car.CarGetIdMapping;
import site.carborn.mapping.car.CarGetListMapping;

import java.time.LocalDateTime;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    CarGetIdMapping findByVin(String vin);

    CarGetDetailMapping findAllByStatusAndId(@Param("status") boolean status, @Param("id") int Id);

    Long countBy();

    Page<CarGetListMapping> findAllByAccount_Id(@Param("AccountId") String AccountId, Pageable page);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Car c SET c.account.id = :accountId, c.uptDt = :uptDt WHERE c.status = :status AND c.id = :id")
    void updateCar(@Param("uptDt") LocalDateTime uptDt, @Param("accountId") String accountId, @Param("id") int id, @Param("status") boolean status);
}
