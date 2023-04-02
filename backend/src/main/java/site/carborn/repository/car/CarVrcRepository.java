package site.carborn.repository.car;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarVrc;
import site.carborn.mapping.car.CarVrcGetDataMapping;

@Repository
public interface CarVrcRepository extends JpaRepository<CarVrc, Integer> {

    CarVrcGetDataMapping findAllByCar_Id(@Param("carId") int carId);

}
