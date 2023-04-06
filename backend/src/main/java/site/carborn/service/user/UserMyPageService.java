package site.carborn.service.user;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import site.carborn.config.SecurityUtil;
import site.carborn.dto.request.CarRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.entity.car.Car;
import site.carborn.entity.car.CarImage;
import site.carborn.entity.car.CarVrc;
import site.carborn.mapping.car.CarGetDetailMapping;
import site.carborn.mapping.car.CarGetListMapping;
import site.carborn.mapping.car.CarImageGetDataMapping;
import site.carborn.mapping.car.CarVrcGetDataMapping;
import site.carborn.mapping.user.CarSaleBookGetListMapping;
import site.carborn.mapping.user.CarSaleGetListMapping;
import site.carborn.repository.car.CarImageRepository;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.car.CarVrcRepository;
import site.carborn.repository.user.CarSaleBookRepository;
import site.carborn.repository.user.CarSaleRepository;
import site.carborn.service.common.KlaytnService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.AccountUtils;
import site.carborn.util.common.BookUtils;
import site.carborn.util.common.BuyUtils;
import site.carborn.util.common.SellUtils;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@Transactional
public class UserMyPageService {
    @Autowired
    private KlaytnService klaytnService;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CarImageRepository carImageRepository;

    @Autowired
    private CarVrcRepository carVrcRepository;

    @Autowired
    private CarSaleRepository carSaleRepository;

    @Autowired
    private CarSaleBookRepository carSaleBookRepository;

    @Transactional
    public Car insertCar(CarRequestDTO dto) throws IOException {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        //klaytn 서비스에 계정 생성 후 해시 가져옴
        dto.setWalletHash(klaytnService.getCarHash().get("address").toString());

        //차량 정보 등록
        dto.setRegDt(LocalDateTime.now());
        dto.setUptDt(LocalDateTime.now());
        dto.setAccount(new Account());
        dto.getAccount().setId(accountId);
        dto.setStatus(false);

        Car car = Car.copy(dto);

        //caver 입력 부분
        //kas api 호출
        //metaData 등록
        String carMetaDataUri = klaytnService.getUri(car).get("uri").toString();

        //데이터 저장 및 alias 규칙에 따라 alias 생성
        LocalDateTime aliastime = car.getRegDt();
        String insertAlias = "insert-"+"-"+aliastime.format(DateTimeFormatter.ISO_LOCAL_DATE)+aliastime.getHour()+aliastime.getMinute()+aliastime.getSecond();

        //contract 배포
        klaytnService.requestContract(carMetaDataUri, car.getWalletHash(), insertAlias);
        car.setContractHash(insertAlias);
        
        //차량 정보 DB 저장
        carRepository.save(car);
        return car;
    }
    @Transactional
    public void insertCarImage(CarRequestDTO dto, Car car) throws IOException {
        if (dto.getCarImg() == null || dto.getCarImg().isEmpty()) {
            throw new NullPointerException("carImg 첨부파일이 없습니다");
        }

        LocalDateTime now = LocalDateTime.now();

        //차량 이미지 등록
        int num = 0;
        for (MultipartFile carImg: dto.getCarImg()) {
            num++;
            String imgNm = BoardUtils.singleFileSave(carImg);

            CarImage carImage = new CarImage();
            carImage.setCar(new Car());
            carImage.getCar().setId(car.getId());
            carImage.setImgNm(imgNm);
            carImage.setRegDt(now);

            String carImageMetaDataUri = klaytnService.getUri(carImage).get("uri").toString();

            String insertImgAlias = "img"+num+"-"+car.getId() +"-"+now.format(DateTimeFormatter.ISO_LOCAL_DATE)+now.getHour()+now.getMinute()+now.getSecond();

            carImage.setContractHash(insertImgAlias);

            //차량 이미지 정보 저장
            carImageRepository.save(carImage);

            //contract 배포
            new Thread(new Runnable() {
                private String metadataUri;
                private String carWalletHash;
                private String vrcAlias;

                public Runnable init(String metadataUri, String carWalletHash, String vrcAlias) {
                    this.metadataUri = metadataUri;
                    this.carWalletHash = carWalletHash;
                    this.vrcAlias = vrcAlias;

                    return this;
                }

                @Override
                public void run() {
                    try {
                        klaytnService.requestContract(this.metadataUri, this.carWalletHash, this.vrcAlias);
                    } catch (IOException e) {
                        log.error(e.getMessage());
                        throw new RuntimeException("컨트랙트 생성시 오류가 발생했습니다");
                    }
                }
            }.init(carImageMetaDataUri, car.getWalletHash(), insertImgAlias)).start();
        }
    }

    @Transactional
    public void insertCarVrc(CarRequestDTO dto, Car car) throws IOException {
        if (dto.getCarVrc() == null || dto.getCarVrc().isEmpty()) {
            throw new NullPointerException("carVrc 첨부파일이 없습니다");
        }

        LocalDateTime now = LocalDateTime.now();

        //차량 등록증 등록
        String imgNm = BoardUtils.singleFileSave(dto.getCarVrc());

        CarVrc carVrc = new CarVrc();
        carVrc.setCar(new Car());
        carVrc.getCar().setId(car.getId());
        carVrc.setImgNm(imgNm);
        carVrc.setRegDt(now);

        String carVrcMetaDataUri = klaytnService.getUri(carVrc).get("uri").toString();
        String insertVrcAlias = "vrc-"+car.getId()+"-"+now.format(DateTimeFormatter.ISO_LOCAL_DATE)+now.getHour()+now.getMinute()+now.getSecond();

        carVrc.setContractHash(insertVrcAlias);

        //차량 등록증 정보 저장
        carVrcRepository.save(carVrc);

        // contract 배포
        new Thread(new Runnable() {
            private String metadataUri;
            private String carWalletHash;
            private String vrcAlias;

            public Runnable init(String metadataUri, String carWalletHash, String vrcAlias) {
                this.metadataUri = metadataUri;
                this.carWalletHash = carWalletHash;
                this.vrcAlias = vrcAlias;

                return this;
            }

            @Override
            public void run() {
                try {
                    klaytnService.requestContract(this.metadataUri, this.carWalletHash, this.vrcAlias);
                } catch (IOException e) {
                    log.error(e.getMessage());
                    throw new RuntimeException("컨트랙트 생성시 오류가 발생했습니다");
                }
            }
        }.init(carVrcMetaDataUri, car.getWalletHash(), insertVrcAlias)).start();
    }

    @Transactional
    public Page<CarGetListMapping> getCarList(Pageable pageable){
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return carRepository.findAllByAccount_Id(accountId, pageable);
    }

    @Transactional
    public CarGetDetailMapping getCarDetail(int carId){
        return carRepository.findAllByStatusAndId(false, carId);
    }

    @Transactional
    public CarVrcGetDataMapping getCarVrcData(int carId){
        return carVrcRepository.findAllByCar_Id(carId);
    }

    @Transactional
    public List<CarImageGetDataMapping> getImageList(int carId){
        return carImageRepository.findAllByCar_Id(carId);
    }

    @Transactional
    public Page<CarSaleGetListMapping> getCarSellList(Pageable page){
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return carSaleRepository.findAllByStatusAndAccountId(BoardUtils.BOARD_DELETE_STATUS_FALSE, accountId, page);
    }

    @Transactional
    public Page<CarSaleBookGetListMapping> getCarBuyList(Pageable page) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return carSaleBookRepository.findAllByStatusAndAccountId(BoardUtils.BOARD_DELETE_STATUS_FALSE, accountId, page);
    }

    @Transactional
    public String updateBookCancel(int carSaleBookId){
        carSaleBookRepository.updateBookStatusCancel(carSaleBookId, BuyUtils.BUY_STATUS_CANCEL, false, LocalDateTime.now(), BuyUtils.BUY_STATUS_STAY);
        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    @Transactional
    public String updateSaleCancel(int carSaleId){
        carSaleRepository.updateSaleCancel(carSaleId, false ,BuyUtils.BUY_STATUS_CANCEL ,LocalDateTime.now(), BuyUtils.BUY_STATUS_STAY);
        carSaleBookRepository.updateSaleCancel(carSaleId,BuyUtils.BUY_STATUS_CANCEL, false, LocalDateTime.now(), SellUtils.SELL_STATUS_STAY);
        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}
