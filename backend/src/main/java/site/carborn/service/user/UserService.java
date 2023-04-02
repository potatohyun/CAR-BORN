package site.carborn.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
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
import site.carborn.util.common.SearchTypeEnum;
import site.carborn.util.common.BuyUtils;
import site.carborn.util.common.SellUtils;
import site.carborn.util.common.SortUtils;

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
        Page<Object[]> page = carSaleRepository.findAllPage(false, SellUtils.SELL_STATUS_CANCEL, pageable);
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
        Page<Object[]> page = null;
        if(orderby == SortUtils.SORT_STATUS_PRICE_DESC){
            page = carSaleRepository.findAllPageOrderByPriceDESC(false, SellUtils.SELL_STATUS_CANCEL, pageable);
        }
        else if(orderby == SortUtils.SORT_STATUS_PRICE_ASC){
            page = carSaleRepository.findAllPageOrderByPriceASC(false, SellUtils.SELL_STATUS_CANCEL, pageable);
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
    public CarSaleGetDetailMapping getSaleDetail(int carSaleId){
        return carSaleRepository.findByStatusAndSaleStatusNotAndId(false, SellUtils.SELL_STATUS_CANCEL, carSaleId);
    }

    @Transactional
    public CarSaleBookGetBookStatusMapping getSaleBookStatus(int carSaleId){
        //현재는 임시아이디 시큐리티에서 받는 부분
        String userid = "testuser2";
        return carSaleBookRepository.findByStatusAndAccount_IdAndCarSale_Id(false, userid, carSaleId);
    }

    @Transactional
    public Page<CarTradeGetListMapping> getCarTradeList(int carId, Pageable page){
        return carTradeRepository.findAllByCar_Id(carId, page);
    }

    @Transactional
    public Page<UserInspectResultListMapping> getSaleInspectList(int carId, Pageable page){
        return inspectResultRepository.findByInspectBook_Car_Id(carId, page);
    }

    @Transactional
    public Page<UserRepairResultListMapping> getSaleRepairList(int carId, Pageable page){
        return repairResultRepository.findByRepairBook_Car_Id(carId, page);
    }

    @Transactional
    public Page<UserInsuranceListMapping> getSaleInsuranceList(int carId, Pageable page){
        return carInsuranceHistoryRepository.findAllByCar_Id(carId, page);
    }

    @Transactional
    public void insertCarSale(CarSale carSale){
        //현재는 임시아이디 시큐리티에서 받는 부분
        String userid = "testuser2";

        carSale.setAccount(new Account());
        carSale.getAccount().setId(userid);
        carSale.setSaleStatus(SellUtils.SELL_STATUS_STAY);
        carSale.setRegDt(LocalDateTime.now());
        carSale.setUptDt(LocalDateTime.now());
        carSale.setStatus(false);

        carSaleRepository.save(carSale);
    }

    @Transactional
    public boolean checkSalesReservation(int carSaleId){
        if(getSaleBookStatus(carSaleId) == null){
            return true;
        }
        else if (getSaleBookStatus(carSaleId).getBookStatus()>= 0){
            return false;
        }
        return true;
    }

    @Transactional
    public void salesReservation(int carSaleId){
        //현재는 임시아이디 시큐리티에서 받는 부분
        String userid = "testuser2";

        CarSaleBook carSalebook = new CarSaleBook();
        carSalebook.setAccount(new Account());
        carSalebook.getAccount().setId(userid);
        carSalebook.setCarSale(new CarSale());
        carSalebook.getCarSale().setId(carSaleId);
        carSalebook.setStatus(false);
        carSalebook.setRegDt(LocalDateTime.now());
        carSalebook.setUptDt(LocalDateTime.now());
        carSalebook.setBookStatus(BuyUtils.BUY_STATUS_STAY);

        carSaleBookRepository.save(carSalebook);
    }

    @Transactional
    public Page<CarSaleBookGetReservationListMapping> getCarSaleBookList(int carSaleId, Pageable page){
        return carSaleBookRepository.findAllByStatusAndBookStatusAndCarSale_Id(false,BuyUtils.BUY_STATUS_STAY,carSaleId, page);
    }

    @Transactional
    public CarSaleGetSaleStatusMapping getSaleStatus(int carSaleId){
        return carSaleRepository.findByStatusAndId(false,carSaleId);
    }

    @Transactional
    public boolean checkSaleStatus(int carSaleId){
        if(getSaleStatus(carSaleId) == null){
            return false;
        }
        else if(getSaleStatus(carSaleId).getSaleStatus() != SellUtils.SELL_STATUS_STAY){
            return false;
        }
        else {
            return true;
        }
    }

    @Transactional
    public boolean updateSaleStatus(int carSaleId, String buyid){
        //현재는 임시아이디 시큐리티에서 받는 부분
        String userid = "testuser2";

        if(carSaleBookRepository.findByStatusAndAccount_IdAndCarSale_Id(false,buyid,carSaleId)==null){
            return false;
        }
        if(carSaleBookRepository.findByStatusAndAccount_IdAndCarSale_Id(false,buyid,carSaleId).getBookStatus()!=BuyUtils.BUY_STATUS_STAY){
            return false;
        }
        carSaleBookRepository.updateBookStatusAllCancel(BuyUtils.BUY_STATUS_CANCEL,false,LocalDateTime.now(),carSaleId, buyid);
        carSaleRepository.updateSaleComplete(SellUtils.SELL_STATUS_COMPLETE,false,LocalDateTime.now(),carSaleId, userid);
        return true;
    }

    @Transactional
    public boolean checkSaleCompleteStatus(int carSaleId){
        if(getSaleStatus(carSaleId) == null){
            return false;
        }
        else if(getSaleStatus(carSaleId).getSaleStatus() != SellUtils.SELL_STATUS_COMPLETE){
            return false;
        }
        else {
            return true;
        }
    }

    @Transactional
    public boolean confirmTrade(int carSaleId) throws IOException {
        //현재는 임시아이디 시큐리티에서 받는 부분
        String userid = "abenion2e";
        if(carSaleBookRepository.findByStatusAndAccount_IdAndCarSale_Id(false,userid,carSaleId).getBookStatus()!=BuyUtils.BUY_STATUS_STAY){
            return false;
        }
        LocalDateTime uptDt = LocalDateTime.now();
        carSaleBookRepository.updateBookStatusComplete(BuyUtils.BUY_STATUS_COMPLETE,false,uptDt,carSaleId, userid);

        CarSaleGetSaleStatusMapping csgsm = carSaleRepository.findByStatusAndId(false,carSaleId);

        //carId를 통해 carHash를 가져오는 부분
        String carHash = carRepository.findAllByStatusAndId(false, csgsm.getCarId()).getWalletHash();

        CarTrade carTrade = new CarTrade();
        carTrade.setBuyerAccount(new Account());
        carTrade.getBuyerAccount().setId(userid);
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
        carRepository.updateCar(uptDt,userid,csgsm.getCarId(),false);

        return true;
    }

    @Transactional
    public Page<CarSaleRequestDTO> getSaleSearchList(int searchType, String keyword,Pageable pageable) {
        SearchTypeEnum searchTypeEnum = SearchTypeEnum.valueOf(searchType);
        Page<Object[]> page = carSaleRepository.findAllPageAndSearch(false, SellUtils.SELL_STATUS_CANCEL,searchTypeEnum.getStringValue(), keyword,pageable);
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
    public Page<CarSaleRequestDTO> getSaleListSearchOrderByPrice(int searchType, String keyword, Pageable pageable, int orderby) {
        Page<Object[]> page = null;
        SearchTypeEnum searchTypeEnum = SearchTypeEnum.valueOf(searchType);
        if(orderby == SortUtils.SORT_STATUS_PRICE_DESC){
            page = carSaleRepository.findAllPageOrderByPriceDESCAndSearch(false, SellUtils.SELL_STATUS_CANCEL,searchTypeEnum.getStringValue(), keyword, pageable);
        }
        else if(orderby == SortUtils.SORT_STATUS_PRICE_ASC){
            page = carSaleRepository.findAllPageOrderByPriceASCAndSearch(false, SellUtils.SELL_STATUS_CANCEL,searchTypeEnum.getStringValue(), keyword, pageable);
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
