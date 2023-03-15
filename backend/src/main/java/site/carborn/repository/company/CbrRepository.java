package site.carborn.repository.company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.Cbr;

@Repository
public interface CbrRepository extends JpaRepository<Cbr, Integer> {

}
