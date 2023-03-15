package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.Community;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Integer> {

}
