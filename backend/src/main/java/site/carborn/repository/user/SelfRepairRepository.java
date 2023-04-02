package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.SelfRepair;

@Repository
public interface SelfRepairRepository extends JpaRepository<SelfRepair, Integer> {

    Page<SelfRepair> findAllByStatus(@Param("status") boolean status, Pageable page);

    SelfRepair findByIdAndStatus(@Param("selfRepairId") int selfRepairId,@Param("status") boolean status);

}
