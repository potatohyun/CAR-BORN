package site.carborn.repository.company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.RepairShop;

import java.util.List;


@Repository
public interface RepairShopRepository extends JpaRepository<RepairShop, Integer> {

}
