package site.carborn.repository.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.account.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

}
