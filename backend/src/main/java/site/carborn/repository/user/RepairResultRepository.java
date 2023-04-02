package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.RepairResult;
import site.carborn.mapping.user.RepairResultGetDetailMapping;
import site.carborn.mapping.user.RepairResultGetListMapping;
import site.carborn.mapping.user.UserRepairResultListMapping;

@Repository
public interface RepairResultRepository extends JpaRepository<RepairResult, Integer> {
    Page<RepairResultGetListMapping> findByRepairBook_RepairShop_Id(@Param("repairBookRepairShopId") int repairBookRepairShopId, Pageable page);

    RepairResultGetDetailMapping findAllById(@Param("id") int id);

    RepairResultGetDetailMapping findAllByRepairBook_Id(@Param("repairBookId") int repairBookId);

    Page<UserRepairResultListMapping> findByRepairBook_StatusAndRepairBook_Account_Id(@Param("repairBookStatus") boolean repairBookStatus, @Param("repairBookAccountId") String repairBookAccountId, Pageable page);

    Page<UserRepairResultListMapping> findByRepairBook_Car_Id(@Param("repairBookCarId") int repairBookCarId, Pageable pageable);
}
