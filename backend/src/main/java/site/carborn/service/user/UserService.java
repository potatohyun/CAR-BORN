package site.carborn.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.config.SecurityUtil;
import site.carborn.dto.request.CarSaleRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.entity.car.Car;
import site.carborn.entity.car.CarTrade;
import site.carborn.entity.user.CarSale;
import site.carborn.entity.user.CarSaleBook;
import site.carborn.mapping.car.CarTradeGetListMapping;
import site.carborn.mapping.user.*;
import site.carborn.repository.car.CarInsuranceHistoryRepository;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.user.*;
import site.carborn.service.common.KlaytnService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.*;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class UserService {

    @Autowired
    private CarSaleRepository carSaleRepository;

    @Autowired
    private CarSaleBookRepository carSaleBookRepository;

    @Autowired
    private InspectResultRepository inspectResultRepository;

    @Autowired
    private RepairResultRepository repairResultRepository;

    @Autowired
    private CarInsuranceHistoryRepository carInsuranceHistoryRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CarTradeRepository carTradeRepository;

    @Autowired
    private KlaytnService klaytnService;

    @Transactional
    public Page<CarSaleRequestDTO> getSaleList(Pageable pageable) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Page<Object[]> page = carSaleRepository.findAllPage(BoardUtils.BOARD_DELETE_STATUS_FALSE, SellUtils.SELL_STATUS_CANCEL, pageable);
        return page.map(objects -> {
            CarSaleRequestDTO dto = new CarSaleRequestDTO();
            dto.setId((int) objects[0]);
            dto.setAccountId((String) objects[1]);
            dto.setCarId((int) objects[2]);
            dto.setMaker((String) objects[3]);
            dto.setModelNm((String) objects[4]);
            dto.setModelYear((String) objects[5]);
            dto.setMileage((int) objects[6]);
            dto.setContent((String) objects[7]);
            dto.setPrice((int) objects[8]);
            dto.setSaleStatus((byte) objects[9]);
            dto.setRegDt((Timestamp) objects[10]);
            dto.setUptDt((Timestamp) objects[11]);
            dto.setImgNm((String) objects[12]);

            return dto;
        });
    }

    @Transactional
    public Page<CarSaleRequestDTO> getSaleListOrderByPrice(Pageable pageable, int orderby) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Page<Object[]> page = null;
        if (orderby == SortUtils.SORT_STATUS_PRICE_DESC) {
            page = carSaleRepository.findAllPageOrderByPriceDESC(BoardUtils.BOARD_DELETE_STATUS_FALSE, SellUtils.SELL_STATUS_CANCEL, pageable);
        } else if (orderby == SortUtils.SORT_STATUS_PRICE_ASC) {
            page = carSaleRepository.findAllPageOrderByPriceASC(BoardUtils.BOARD_DELETE_STATUS_FALSE, SellUtils.SELL_STATUS_CANCEL, pageable);
        }
        return page.map(objects -> {
            CarSaleRequestDTO dto = new CarSaleRequestDTO();
            dto.setId((int) objects[0]);
            dto.setAccountId((String) objects[1]);
            dto.setCarId((int) objects[2]);
            dto.setMaker((String) objects[3]);
            dto.setModelNm((String) objects[4]);
            dto.setModelYear((String) objects[5]);
            dto.setMileage((int) objects[6]);
            dto.setContent((String) objects[7]);
            dto.setPrice((int) objects[8]);
            dto.setSaleStatus((byte) objects[9]);
            dto.setRegDt((Timestamp) objects[10]);
            dto.setUptDt((Timestamp) objects[11]);
            dto.setImgNm((String) objects[12]);

            return dto;
        });
    }

    @Transactional
    public CarSaleGetDetailMapping getSaleDetail(int carSaleId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return carSaleRepository.findByStatusAndSaleStatusNotAndId(BoardUtils.BOARD_DELETE_STATUS_FALSE, SellUtils.SELL_STATUS_CANCEL, carSaleId);
    }

    @Transactional
    public CarSaleBookGetBookStatusMapping getSaleBookStatus(int carSaleId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return carSaleBookRepository.findByStatusAndAccount_IdAndCarSale_Id(BoardUtils.BOARD_DELETE_STATUS_FALSE, accountId, carSaleId);
    }

    @Transactional
    public Page<CarTradeGetListMapping> getCarTradeList(int carId, Pageable page) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return carTradeRepository.findAllByCar_Id(carId, page);
    }

    @Transactional
    public Page<UserInspectResultListMapping> getSaleInspectList(int carId, Pageable page) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return inspectResultRepository.findByInspectBook_Car_Id(carId, page);
    }

    @Transactional
    public Page<UserRepairResultListMapping> getSaleRepairList(int carId, Pageable page) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return repairResultRepository.findByRepairBook_Car_Id(carId, page);
    }

    @Transactional
    public Page<UserInsuranceListMapping> getSaleInsuranceList(int carId, Pageable page) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return carInsuranceHistoryRepository.findAllByCar_Id(carId, page);
    }

    @Transactional
    public void insertCarSale(CarSale carSale) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        carSale.setAccount(new Account());
        carSale.getAccount().setId(accountId);
        carSale.setSaleStatus(SellUtils.SELL_STATUS_STAY);
        carSale.setRegDt(LocalDateTime.now());
        carSale.setUptDt(LocalDateTime.now());
        carSale.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);

        carSaleRepository.save(carSale);
    }

    @Transactional
    public boolean checkSalesReservation(int carSaleId) {
        if (getSaleBookStatus(carSaleId) == null) {
            return true;
        }
        else if (getSaleBookStatus(carSaleId).getBookStatus() >= 0) {
            return false;
        }
        return true;
    }

    @Transactional
    public int salesReservation(int carSaleId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        CarSaleBook carSalebook = new CarSaleBook();
        carSalebook.setAccount(new Account());
        carSalebook.getAccount().setId(accountId);
        carSalebook.setCarSale(new CarSale());
        carSalebook.getCarSale().setId(carSaleId);
        carSalebook.setStatus(false);
        carSalebook.setRegDt(LocalDateTime.now());
        carSalebook.setUptDt(LocalDateTime.now());
        carSalebook.setBookStatus(BuyUtils.BUY_STATUS_STAY);

        carSaleBookRepository.save(carSalebook);

        return carSalebook.getBookStatus();
    }

    @Transactional
    public Page<CarSaleBookGetReservationListMapping> getCarSaleBookList(int carSaleId, Pageable page) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return carSaleBookRepository.findAllByStatusAndBookStatusAndCarSale_Id(BoardUtils.BOARD_DELETE_STATUS_FALSE, BuyUtils.BUY_STATUS_STAY, carSaleId, page);
    }

    @Transactional
    public CarSaleGetSaleStatusMapping getSaleStatus(int carSaleId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        return carSaleRepository.findByStatusAndId(BoardUtils.BOARD_DELETE_STATUS_FALSE, carSaleId);
    }

    @Transactional
    public boolean checkSaleStatus(int carSaleId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        if (getSaleStatus(carSaleId) == null) {
            return false;
        }
        else if (getSaleStatus(carSaleId).getSaleStatus() != SellUtils.SELL_STATUS_STAY) {
            return false;
        }
        else {
            return true;
        }
    }

    @Transactional
    public boolean updateSaleStatus(int carSaleId, String buyId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        if (carSaleBookRepository.findByStatusAndAccount_IdAndCarSale_Id(BoardUtils.BOARD_DELETE_STATUS_FALSE, buyId, carSaleId) == null){
            return false;
        }
        if (carSaleBookRepository.findByStatusAndAccount_IdAndCarSale_Id(BoardUtils.BOARD_DELETE_STATUS_FALSE, buyId, carSaleId).getBookStatus() != BuyUtils.BUY_STATUS_STAY) {
            return false;
        }
        carSaleBookRepository.updateBookStatusAllCancel(BuyUtils.BUY_STATUS_CANCEL, BoardUtils.BOARD_DELETE_STATUS_FALSE,LocalDateTime.now(), carSaleId, buyId);
        carSaleRepository.updateSaleComplete(SellUtils.SELL_STATUS_COMPLETE, BoardUtils.BOARD_DELETE_STATUS_FALSE, LocalDateTime.now(), carSaleId, accountId);

        return true;
    }

    @Transactional
    public boolean checkSaleCompleteStatus(int carSaleId) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        if (getSaleStatus(carSaleId) == null) {
            return false;
        } else if(getSaleStatus(carSaleId).getSaleStatus() != SellUtils.SELL_STATUS_COMPLETE) {
            return false;
        } else {
            return true;
        }
    }

    @Transactional
    public boolean confirmTrade(int carSaleId) throws IOException {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        if (carSaleBookRepository.findByStatusAndAccount_IdAndCarSale_Id(BoardUtils.BOARD_DELETE_STATUS_FALSE, accountId, carSaleId).getBookStatus() != BuyUtils.BUY_STATUS_STAY) {
            return false;
        }
        LocalDateTime uptDt = LocalDateTime.now();
        carSaleBookRepository.updateBookStatusComplete(BuyUtils.BUY_STATUS_COMPLETE,BoardUtils.BOARD_DELETE_STATUS_FALSE, uptDt, carSaleId, accountId);

        CarSaleGetSaleStatusMapping csgsm = carSaleRepository.findByStatusAndId(BoardUtils.BOARD_DELETE_STATUS_FALSE,carSaleId);

        //carId를 통해 carHash를 가져오는 부분
        String carHash = carRepository.findAllByStatusAndId(BoardUtils.BOARD_DELETE_STATUS_FALSE, csgsm.getCarId()).getWalletHash();

        CarTrade carTrade = new CarTrade();
        carTrade.setBuyerAccount(new Account());
        carTrade.getBuyerAccount().setId(accountId);
        carTrade.setSellerAccount(new Account());
        carTrade.getSellerAccount().setId(csgsm.getAccountId());
        carTrade.setPrice(csgsm.getPrice());
        carTrade.setCar(new Car());
        carTrade.getCar().setId(csgsm.getCarId());
        carTrade.setRegDt(uptDt);

        //caver 입력 부분
        //kas api 호출
        //metaData 등록
        String metaDataUri = klaytnService.getUri(carTrade).get("uri").toString();
        carTrade.setMetadataUri(metaDataUri);

        //데이터 저장 및 alias 규칙에 따라 alias 생성
        LocalDateTime aliastime = uptDt;
        String alias = "buy-"+carTrade.getCar().getId()+"-"+aliastime.format(DateTimeFormatter.ISO_LOCAL_DATE)+aliastime.getHour()+aliastime.getMinute()+aliastime.getSecond();
        //contract 배포
        klaytnService.requestContract(metaDataUri, carHash, alias);
        carTrade.setContractHash(alias);

        //거래 정보 저장
        carTradeRepository.save(carTrade);

        //차 권한 이양
        carRepository.updateCar(uptDt, accountId, csgsm.getCarId(), BoardUtils.BOARD_DELETE_STATUS_FALSE);

        return true;
    }

    @Transactional
    public Page<CarSaleRequestDTO> getSaleSearchList(int searchType, String keyword, Pageable pageable) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        SearchTypeEnum searchTypeEnum = SearchTypeEnum.valueOf(searchType);
        Page<Object[]> page = carSaleRepository.findAllPageAndSearch(BoardUtils.BOARD_DELETE_STATUS_FALSE, SellUtils.SELL_STATUS_CANCEL,searchTypeEnum.getStringValue(), keyword,pageable);

        return page.map(objects -> {
            CarSaleRequestDTO dto = new CarSaleRequestDTO();
            dto.setId((int) objects[0]);
            dto.setAccountId((String) objects[1]);
            dto.setCarId((int) objects[2]);
            dto.setMaker((String) objects[3]);
            dto.setModelNm((String) objects[4]);
            dto.setModelYear((String) objects[5]);
            dto.setMileage((int) objects[6]);
            dto.setContent((String) objects[7]);
            dto.setPrice((int) objects[8]);
            dto.setSaleStatus((byte) objects[9]);
            dto.setRegDt((Timestamp) objects[10]);
            dto.setUptDt((Timestamp) objects[11]);
            dto.setImgNm((String) objects[12]);

            return dto;
        });
    }

    @Transactional
    public Page<CarSaleRequestDTO> getSaleListSearchOrderByPrice(int searchType, String keyword, Pageable pageable, int orderBy) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        Page<Object[]> page = null;
        SearchTypeEnum searchTypeEnum = SearchTypeEnum.valueOf(searchType);
        if (orderBy == SortUtils.SORT_STATUS_PRICE_DESC) {
            page = carSaleRepository.findAllPageOrderByPriceDESCAndSearch(BoardUtils.BOARD_DELETE_STATUS_FALSE, SellUtils.SELL_STATUS_CANCEL, searchTypeEnum.getStringValue(), keyword, pageable);
        }
        else if (orderBy == SortUtils.SORT_STATUS_PRICE_ASC) {
            page = carSaleRepository.findAllPageOrderByPriceASCAndSearch(BoardUtils.BOARD_DELETE_STATUS_FALSE, SellUtils.SELL_STATUS_CANCEL, searchTypeEnum.getStringValue(), keyword, pageable);
        }

        return page.map(objects -> {
            CarSaleRequestDTO dto = new CarSaleRequestDTO();
            dto.setId((int) objects[0]);
            dto.setAccountId((String) objects[1]);
            dto.setCarId((int) objects[2]);
            dto.setMaker((String) objects[3]);
            dto.setModelNm((String) objects[4]);
            dto.setModelYear((String) objects[5]);
            dto.setMileage((int) objects[6]);
            dto.setContent((String) objects[7]);
            dto.setPrice((int) objects[8]);
            dto.setSaleStatus((byte) objects[9]);
            dto.setRegDt((Timestamp) objects[10]);
            dto.setUptDt((Timestamp) objects[11]);
            dto.setImgNm((String) objects[12]);

            return dto;
        });
    }
}
