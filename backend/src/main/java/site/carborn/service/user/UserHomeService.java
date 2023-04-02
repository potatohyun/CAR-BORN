package site.carborn.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.company.RepairShopRepository;
import site.carborn.repository.user.CarSaleRepository;

import java.util.List;
import java.util.Map;

@Service
public class UserHomeService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RepairShopRepository repairShopRepository;

    @Autowired
    private InspectorRepository inspectorRepository;

    @Autowired
    private CarSaleRepository carSaleRepository;

    @Transactional
    public Long getCarCount(){
        return carRepository.countBy();
    }

    @Transactional
    public Long getRepairCount(){
        return repairShopRepository.countBy();
    }

    @Transactional
    public Long getInspectorCount(){
        return inspectorRepository.countBy();
    }

    @Transactional
    public Long getCarSaleCount(){
        return carSaleRepository.countByStatusAndSaleStatus(false,1);
    }

    @Transactional
    public List<Map<String,String>> getNewCarSaleList(){
        return carSaleRepository.getNewCarHomeData(false, 0);
    }
}
