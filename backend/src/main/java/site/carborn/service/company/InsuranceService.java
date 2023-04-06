package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.config.SecurityUtil;
import site.carborn.dto.request.CarInsuranceHistoryRequestDTO;
import site.carborn.entity.car.Car;
import site.carborn.entity.car.CarInsuranceHistory;
import site.carborn.entity.company.InsuranceCompany;
import site.carborn.mapping.car.CarInsuranceHistoryGetDetailMapping;
import site.carborn.mapping.car.CarInsuranceHistoryGetListMapping;
import site.carborn.repository.car.CarInsuranceHistoryRepository;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InsuranceCompanyRepository;
import site.carborn.service.common.KlaytnService;
import site.carborn.util.board.BoardUtils;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class InsuranceService {

    @Autowired
    private CarInsuranceHistoryRepository carInsuranceHistoryRepository;

    @Autowired
    private InsuranceCompanyRepository insuranceCompanyRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private KlaytnService klaytnService;

    @Transactional
    public void insertCarInsuranceHistory(CarInsuranceHistoryRequestDTO dto) throws IOException {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        dto.setRegDt(LocalDateTime.now());

        if (dto.getInsuranceImg() != null) {
            String fileName = BoardUtils.singleFileSave((dto).getInsuranceImg());
            dto.setInsuranceImgNm(fileName);
        }
        
        //회사 아이디 및 carVin을 통해 insuranceId와 carId를 가져오는 부분
        int insuranceId = insuranceCompanyRepository.findByAccount_Id(accountId).getId();
        int carId = carRepository.findByVin(dto.getCarVin()).getId();
        dto.setCar(new Car());
        dto.getCar().setId(carId);
        dto.setInsuranceCompany(new InsuranceCompany());
        dto.getInsuranceCompany().setId(insuranceId);

        // 부모 타입으로 클래스 변환
        CarInsuranceHistory carInsuranceHistory = CarInsuranceHistory.copy(dto);

        //carId를 통해 carHash를 가져오는 부분
        String carHash = carRepository.findAllByStatusAndId(false,carId).getWalletHash();

        //kas api 호출
        //metaData 등록
        String metaDataUri = klaytnService.getUri(carInsuranceHistory).get("uri").toString();

        //데이터 저장 및 alias 규칙에 따라 alias 생성
        LocalDateTime aliastime = carInsuranceHistory.getRegDt();
        String alias = "insurance-"+carId+"-"+aliastime.format(DateTimeFormatter.ISO_LOCAL_DATE)+aliastime.getHour()+aliastime.getMinute()+aliastime.getSecond();

        //contract 배포
        klaytnService.requestContract(metaDataUri, carHash, alias);
        carInsuranceHistory.setContractHash(alias);
        carInsuranceHistory.setMetadataUri(metaDataUri);

        carInsuranceHistoryRepository.save(carInsuranceHistory);
    }

    @Transactional
    public Page<CarInsuranceHistoryGetListMapping> carInsuranceHistoryList(Pageable page) {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        int insuranceId = insuranceCompanyRepository.findByAccount_Id(accountId).getId();

        return carInsuranceHistoryRepository.findAllByInsuranceCompany_Id(insuranceId, page);
    }
    @Transactional
    public CarInsuranceHistoryGetDetailMapping carInsuranceHistoryDetail(int id) {
        String accountId = SecurityUtil.getCurrentUserId();
        if (accountId == null || accountId.isBlank()) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }

        return carInsuranceHistoryRepository.findAllById(id);
    }
}
