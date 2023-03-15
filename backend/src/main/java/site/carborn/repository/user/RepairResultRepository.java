package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.RepairResult;

@Repository
public interface RepairResultRepository extends JpaRepository<RepairResult, Integer> {

}
