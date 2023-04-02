package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.InspectResult;
import site.carborn.mapping.user.InspectResultGetDetailMapping;
import site.carborn.mapping.user.InspectResultGetListMapping;
import site.carborn.mapping.user.UserInspectResultListMapping;

@Repository
public interface InspectResultRepository extends JpaRepository<InspectResult, Integer> {

    InspectResultGetDetailMapping findAllByInspectBookId(@Param("inspectBookId") int inspectBookId);

    Page<InspectResultGetListMapping> findByInspectBook_Inspector_Id(@Param("inspectorBookInspectorId") int inspectorBookInspectorId, Pageable page);

    InspectResultGetDetailMapping findAllById(@Param("id") int id);

    Page<UserInspectResultListMapping> findByInspectBook_StatusAndInspectBook_Account_Id(@Param("InspectBookStatus") boolean InspectBookStatus, @Param("InspectBookAccountId") String InspectBookAccountId, Pageable page);

    Page<UserInspectResultListMapping> findByInspectBook_Car_Id(@Param("inspectBookCarId") int inspectBookCarId, Pageable page);
}
