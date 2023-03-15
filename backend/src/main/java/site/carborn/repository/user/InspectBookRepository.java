package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.InspectBook;

@Repository
public interface InspectBookRepository extends JpaRepository<InspectBook, Integer> {

}
