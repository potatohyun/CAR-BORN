package site.carborn.repository.car;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarImage;
import site.carborn.mapping.car.CarImageGetDataMapping;

import java.util.List;

@Repository
public interface CarImageRepository extends JpaRepository<CarImage, Integer> {

    List<CarImageGetDataMapping> findAllByCar_Id(@Param("carId") int carIds);

}
