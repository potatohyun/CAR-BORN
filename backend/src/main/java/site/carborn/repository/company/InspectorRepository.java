package site.carborn.repository.company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.Inspector;

@Repository
public interface InspectorRepository extends JpaRepository<Inspector, Integer> {

}
