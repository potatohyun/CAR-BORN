package site.carborn.repository.company;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.InspectorReview;
import site.carborn.entity.company.RepairShopReview;
import site.carborn.mapping.company.RepairShopReviewMapping;


@Repository
public interface RepairShopReviewRepository extends JpaRepository<RepairShopReview, Integer> {
    RepairShopReviewMapping findByStatusAndRepairResult_Id(@Param("status") boolean status, @Param("repairResultId") int repairResultId);

    Page<RepairShopReviewMapping> findALLByStatusAndRepairShop_Id(@Param("status") boolean status, @Param("repairShopId") int repairShopId, Pageable page);

    RepairShopReview findByRepairResult_Id(@Param("repairResultId") int repairResultId);

}
