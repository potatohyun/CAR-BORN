package site.carborn.repository.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarImage;

@Repository
public interface CarImageRepository extends JpaRepository<CarImage, Integer> {

}
