package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CarSaleBook;

@Repository
public interface CarSaleBookRepository extends JpaRepository<CarSaleBook, Integer> {

}
