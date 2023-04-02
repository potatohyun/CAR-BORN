package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.InspectBook;
import site.carborn.mapping.user.InspectBookGetDetailMapping;
import site.carborn.mapping.user.InspectBookGetListMapping;
import site.carborn.mapping.user.UserInspectBookDetailMapping;
import site.carborn.mapping.user.UserInspectBookListMapping;

@Repository
public interface InspectBookRepository extends JpaRepository<InspectBook, Integer> {
    Page<InspectBookGetListMapping> findByStatusAndInspector_Id(@Param("status") boolean status, @Param("inspectorAccountId") int inspectorAccountId, Pageable page);

    InspectBookGetDetailMapping findAllById(@Param("id") int id);

    Page<UserInspectBookListMapping> findByStatusAndAccount_Id(@Param("status") boolean status, @Param("accountId") String accountId, Pageable page);

    UserInspectBookDetailMapping findAllByIdAndStatus(@Param("id") int id, @Param("status") boolean status);
}
