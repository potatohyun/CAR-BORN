package site.carborn.repository.company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.RepairShopReview;

@Repository
public interface RepairShopReviewRepository extends JpaRepository<RepairShopReview, Integer> {

}
