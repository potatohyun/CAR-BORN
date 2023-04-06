package site.carborn.service.user;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.company.RepairShopRepository;
import site.carborn.repository.user.CarSaleRepository;
import site.carborn.util.board.BoardUtils;

import java.util.List;
import java.util.Map;

@Slf4j
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
    public Long getCarCount() {
        return carRepository.countBy();
    }

    @Transactional
    public Long getRepairCount() {
        return repairShopRepository.countBy();
    }

    @Transactional
    public Long getInspectorCount() {
        return inspectorRepository.countBy();
    }

    @Transactional
    public Long getCarSaleCount() {
        return carSaleRepository.countByStatusAndSaleStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE,1);
    }

    @Transactional
    public List<Map<String,String>> getNewCarSaleList() {
        return carSaleRepository.getNewCarHomeData(BoardUtils.BOARD_DELETE_STATUS_FALSE, 0);
    }
}
