package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarTrade;
import site.carborn.mapping.car.CarTradeGetListMapping;

@Repository
public interface CarTradeRepository extends JpaRepository<CarTrade, Integer> {

    Page<CarTradeGetListMapping> findAllByCar_Id(@Param("carId") int carId, Pageable pageable);

}
