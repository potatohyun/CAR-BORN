package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.SelfRepair;

@Repository
public interface SelfRepairRepository extends JpaRepository<SelfRepair, Integer> {

}
