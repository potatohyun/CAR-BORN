package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CommunityReview;
import site.carborn.mapping.user.UserCommunityCommentListMapping;

@Repository
public interface CommunityReviewRepository extends JpaRepository<CommunityReview, Integer> {
    Page<UserCommunityCommentListMapping> findByCommunity_IdAndStatus(@Param("communityId")int communityId,@Param("status") boolean stauts, Pageable page);


}
