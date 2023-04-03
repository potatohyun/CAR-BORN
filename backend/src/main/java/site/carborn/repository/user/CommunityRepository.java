package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.Community;
import site.carborn.mapping.user.UserCommunityListMapping;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Integer> {
    Page<UserCommunityListMapping> findByStatus(@Param("status") boolean status, Pageable page);

    Page<UserCommunityListMapping> findByStatusAndTitleContainingOrContentContaining(@Param("status") boolean status, @Param("title") String title, @Param("content") String content, Pageable page);


    UserCommunityListMapping findAllByIdAndStatus(@Param("communityId") int communityId, @Param("status") boolean status);

    @Modifying
    @Query("update Community c set c.views = c.views+1 where c.id = :communityId")
    int updateView(@Param("communityId") int communityId);

    Page<UserCommunityListMapping> findByStatusAndAccount_Id(@Param("status") boolean status, @Param("accountId") String accountId, Pageable page);


}
