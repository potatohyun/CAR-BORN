package site.carborn.service.common;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.entity.company.Inspector;
import site.carborn.mapping.company.InspectorReviewMapping;
import site.carborn.mapping.company.RepairShopReviewMapping;
import site.carborn.repository.company.InspectorReviewRepository;
import site.carborn.repository.company.RepairShopRepository;
import site.carborn.repository.company.RepairShopReviewRepository;

import java.util.List;
import java.util.Map;

@Service
public class MapService {
    @Autowired
    private RepairShopRepository repairShopRepository;

    @Autowired
    private RepairShopReviewRepository repairShopReviewRepository;

    @Autowired
    private InspectorReviewRepository inspectorReviewRepository;

    @Transactional
    public List<Map<String,String>> getMapData(double lat, double lng){
        return repairShopRepository.getMapData(lat, lng);
    }

    @Transactional
    public Page<RepairShopReviewMapping> getRepairReview(int id, Pageable page){
        return repairShopReviewRepository.findALLByStatusAndRepairShop_Id(false, id, page);
    }

    @Transactional
    public Page<InspectorReviewMapping> getInspectorReview(int id, Pageable page){
        return inspectorReviewRepository.findAllByStatusAndInspector_Id(false, id, page);
    }
}
