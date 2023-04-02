package site.carborn.repository.car;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarInsuranceHistory;
import site.carborn.mapping.car.CarInsuranceHistoryGetDetailMapping;
import site.carborn.mapping.car.CarInsuranceHistoryGetListMapping;
import site.carborn.mapping.user.UserInsuranceListMapping;

@Repository
public interface CarInsuranceHistoryRepository extends JpaRepository<CarInsuranceHistory, Integer> {
    Page<CarInsuranceHistoryGetListMapping> findAllByInsuranceCompany_Id(@Param("insuranceCompany_Id") int insuranceCompany_Id, Pageable page);

    CarInsuranceHistoryGetDetailMapping findAllById(@Param("id") int id);

    Page<UserInsuranceListMapping> findByCar_Account_Id(@Param("accountId") String accountId, Pageable page);

    Page<UserInsuranceListMapping> findAllByCar_Id(@Param("carId") int carId, Pageable page);
}
