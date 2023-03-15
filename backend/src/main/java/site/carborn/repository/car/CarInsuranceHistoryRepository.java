package site.carborn.repository.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarInsuranceHistory;

@Repository
public interface CarInsuranceHistoryRepository extends JpaRepository<CarInsuranceHistory, Integer> {

}
