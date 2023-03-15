package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CarSale;

@Repository
public interface CarSaleRepository extends JpaRepository<CarSale, Integer> {

}
