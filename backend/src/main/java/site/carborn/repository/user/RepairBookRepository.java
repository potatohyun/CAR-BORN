package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.RepairBook;

@Repository
public interface RepairBookRepository extends JpaRepository<RepairBook, Integer> {

}
