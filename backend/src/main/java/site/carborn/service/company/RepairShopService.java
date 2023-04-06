package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.config.SecurityUtil;
import site.carborn.dto.request.RepairResultRequestDTO;
import site.carborn.entity.car.Car;
import site.carborn.entity.company.RepairShop;
import site.carborn.entity.user.RepairBook;
import site.carborn.entity.user.RepairResult;
import site.carborn.mapping.company.RepairShopReviewMapping;
import site.carborn.mapping.user.*;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.RepairShopRepository;
import site.carborn.repository.company.RepairShopReviewRepository;
import site.carborn.repository.user.RepairBookRepository;
import site.carborn.repository.user.RepairResultRepository;
import site.carborn.service.common.KlaytnService;
import site.carborn.util.board.BoardUtils;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RepairShopService {

    @Autowired
    private RepairShopRepository repairShopRepository;

    @Autowired
    private RepairBookRepository repairBookRepository;

    @Autowired
    private RepairResultRepository repairResultRepository;

    @Autowired
    private RepairShopReviewRepository repairShopReviewRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private KlaytnService klaytnService;

    @Transactional
    public Page<RepairBookGetListMapping> repairBookList(Pageable page) {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        int repairShopId = repairShopRepository.findByAccount_Id(accountId).getId();
        return repairBookRepository.findByStatusAndRepairShop_Id(BoardUtils.BOARD_DELETE_STATUS_FALSE, repairShopId, page);
    }

    @Transactional
    public RepairBookGetDetailMapping repairBookDetailContent(int id) {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        return repairBookRepository.findAllById(id);
    }

    @Transactional
    public Optional<RepairBook> repairBookGetData(int id) {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        return repairBookRepository.findById(id);
    }

    @Transactional
    public void repairBookUpdate(RepairBook repairBook, int status) {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        repairBook.setBookStatus(status);
        repairBook.setUptDt(LocalDateTime.now());
        repairBookRepository.save(repairBook);
    }

    @Transactional
    public void repairResultInsert(RepairResultRequestDTO dto) throws IOException {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        dto.setRegDt(LocalDateTime.now());

        //bookId를 통해 carHash를 가져오는 부분
        String carVin = repairBookRepository.findAllById(dto.getRepairBook().getId()).getCarVin();
        int carId = carRepository.findByVin(carVin).getId();

        //carId를 통해 carHash를 가져오는 부분
        String carHash = carRepository.findAllByStatusAndId(BoardUtils.BOARD_DELETE_STATUS_FALSE, carId).getWalletHash();

        Optional<Car> car = carRepository.findById(carId);
        if(car.isEmpty()){
            throw new RuntimeException("해당 하는 차량의 데이터가 없습니다.");
        }
        car.get().setMileage(dto.getMileage());
        car.get().setUptDt(LocalDateTime.now());

        //CarId에 해당하는 차량의 주행거리를 업데이트
        carRepository.save(car.get());

        //multipartfile 입력 부분
        String beforeImgNm = BoardUtils.singleFileSave((dto.getBeforeImg()));
        String afterImgNm = BoardUtils.singleFileSave((dto.getAfterImg()));
        String receiptImgNm = BoardUtils.singleFileSave((dto.getReceiptImg()));

        dto.setBeforeImgNm(beforeImgNm);
        dto.setAfterImgNm(afterImgNm);
        dto.setReceiptImgNm(receiptImgNm);

        RepairResult repairResult = RepairResult.copy(dto);
        //caver 입력 부분
        //kas api 호출
        //metaData 등록
        String metaDataUri = klaytnService.getUri(repairResult).get("uri").toString();

        //데이터 저장 및 alias 규칙에 따라 alias 생성
        LocalDateTime aliastime = repairResult.getRegDt();
        String alias = "repair-"+carId+"-"+aliastime.format(DateTimeFormatter.ISO_LOCAL_DATE)+aliastime.getHour()+aliastime.getMinute()+aliastime.getSecond();
        //contract 배포
        klaytnService.requestContract(metaDataUri, carHash, alias);
        repairResult.setContractHash(alias);
        repairResult.setMetadataUri(metaDataUri);

        repairResultRepository.save(repairResult);
    }

    @Transactional
    public Page<RepairResultGetListMapping> repairResultGetList(Pageable page) {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        try {
            int repairShopId = repairShopRepository.findByAccount_Id(accountId).getId();
            return repairResultRepository.findByRepairBook_RepairShop_Id(repairShopId, page);
        } catch(RuntimeException e) {
            log.error("사용자 정보에 해당하는 RepairShop ID를 찾을 수 없습니다");
            log.error("사용자 정보 [{}]", accountId);
            throw new RuntimeException("사용자 정보에 해당하는 RepairShop ID를 찾을 수 없습니다");
        }
    }

    @Transactional
    public RepairResultGetDetailMapping repairResultDetailContent(int id) {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        return repairResultRepository.findAllById(id);
    }

    @Transactional
    public RepairShopReviewMapping repairResultReview(int id) {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        return repairShopReviewRepository.findByStatusAndRepairResult_Id(false, id);
    }
}
