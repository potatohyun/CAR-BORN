package site.carborn.repository.common;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.common.Terms;

@Repository
public interface TermsRepository extends JpaRepository<Terms, Integer> {

}
