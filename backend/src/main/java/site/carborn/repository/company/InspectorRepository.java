package site.carborn.repository.company;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.Inspector;
import site.carborn.mapping.company.InspectorGetIdMapping;

@Repository
public interface InspectorRepository extends JpaRepository<Inspector, Integer> {
    InspectorGetIdMapping findByAccount_Id(String accountId);

    Long countBy();
}
