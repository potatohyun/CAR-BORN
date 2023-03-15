package site.carborn.repository.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarVrc;

@Repository
public interface CarVrcRepository extends JpaRepository<CarVrc, Integer> {

}
