package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.InspectResult;

@Repository
public interface InspectResultRepository extends JpaRepository<InspectResult, Integer> {

}
