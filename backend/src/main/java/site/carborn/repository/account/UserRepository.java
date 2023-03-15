package site.carborn.repository.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.account.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
