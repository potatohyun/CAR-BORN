package site.carborn.repository.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {

}
