package site.carborn.repository.company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.RepairShop;
import site.carborn.mapping.company.RepairShopGetIdMapping;

import java.util.List;
import java.util.Map;


@Repository
public interface RepairShopRepository extends JpaRepository<RepairShop, Integer> {
    RepairShopGetIdMapping findByAccount_Id(String accountId);

    @Query(value = """
    SELECT res.ID, res.NAME, res.AUTH, res.PHONE_NO,res.ADDRESS, res.LNG, res.LAT, res.avg_point, res.cntReview, res.AUTH, IFNULL(ures.cntTrade, 0) as cntTrade
    FROM
    	(SELECT idname.ID, idname.NAME, idname.AUTH, idname.PHONE_NO, addr.ADDRESS, addr.LNG, addr.LAT, addr.avg_point, addr.cntReview
    	FROM\s
    		(SELECT mrs.ID,ma.NAME, ma.AUTH, ma.PHONE_NO
    		FROM S08P22D209.MWS_REPAIR_SHOP mrs
    		INNER JOIN S08P22D209.MWS_ACCOUNT ma
    		ON mrs.ACCOUNT_ID = ma.ID) idname
    	INNER JOIN
    		(SELECT mrs.ID, mrs.ADDRESS, mrs.LNG, mrs.LAT,AVG(IFNULL(mrsr.POINT,0)) as avg_point, COUNT(mrsr.POINT) as cntReview
    		FROM S08P22D209.MWS_REPAIR_SHOP mrs\s
    		LEFT OUTER JOIN S08P22D209.MWS_REPAIR_SHOP_REVIEW mrsr\s
    		ON mrs.ID = mrsr.REPAIR_SHOP_ID
    		WHERE ABS(mrs.LNG - :inputLng) <= 0.14 AND ABS(mrs.LAT - :inputLat) <= 0.12 AND (mrsr.STATUS = FALSE OR mrsr.STATUS IS NULL)
    		GROUP BY mrs.ID) addr
    	ON idname.ID = addr.ID) res
    LEFT OUTER JOIN
    	(SELECT DISTINCT urp.REPAIR_SHOP_ID, SUM(urp.cntTrade) as cntTrade
    	FROM
    		(SELECT mrb.REPAIR_SHOP_ID, COUNT(DISTINCT REPAIR_SHOP_ID) as cntTrade
    		FROM S08P22D209.MWS_REPAIR_BOOK mrb\s
    		RIGHT OUTER JOIN S08P22D209.MWS_CAR_SALE mcs
    		ON mcs.CAR_ID = mrb.CAR_ID
    		WHERE mcs.SALE_STATUS = 1 AND mrb.STATUS = FALSE
    		GROUP BY mrb.REPAIR_SHOP_ID, mrb.CAR_ID) urp
    	GROUP BY urp.REPAIR_SHOP_ID) ures
    ON res.ID = ures.REPAIR_SHOP_ID
    UNION
    SELECT res.ID, res.NAME, res.AUTH, res.PHONE_NO,res.ADDRESS, res.LNG, res.LAT, res.avg_point, res.cntReview, res.AUTH, IFNULL(ures.cntTrade, 0) as cntTrade
    FROM
    	(SELECT idname.ID, idname.NAME, idname.AUTH, idname.PHONE_NO, addr.ADDRESS, addr.LNG, addr.LAT, addr.avg_point, addr.cntReview
    	FROM\s
    		(SELECT mi.ID,ma.NAME, ma.AUTH, ma.PHONE_NO
    		FROM S08P22D209.MWS_INSPECTOR mi
    		INNER JOIN S08P22D209.MWS_ACCOUNT ma
    		ON mi.ACCOUNT_ID = ma.ID) idname
    	INNER JOIN
    		(SELECT mi.ID, mi.ADDRESS, mi.LNG, mi.LAT,AVG(IFNULL(mir.POINT,0)) as avg_point, COUNT(mir.POINT) as cntReview
    		FROM S08P22D209.MWS_INSPECTOR mi\s
    		LEFT OUTER JOIN S08P22D209.MWS_INSPECTOR_REVIEW mir\s
    		ON mi.ID = mir.INSPECTOR_ID
    		WHERE ABS(mi.LNG - :inputLng) <= 0.14 AND ABS(mi.LAT - :inputLat) <= 0.12 AND (mir.STATUS = FALSE OR mir.STATUS IS NULL)
    		GROUP BY mi.ID) addr
    	ON idname.ID = addr.ID) res
    LEFT OUTER JOIN
    	(SELECT DISTINCT urp.INSPECTOR_ID, SUM(urp.cntTrade) as cntTrade
    	FROM
    		(SELECT mib.INSPECTOR_ID, COUNT(DISTINCT INSPECTOR_ID) as cntTrade
    		FROM S08P22D209.MWS_INSPECT_BOOK mib\s
    		RIGHT OUTER JOIN S08P22D209.MWS_CAR_SALE mcs
    		ON mcs.CAR_ID = mib.CAR_ID
    		WHERE mcs.SALE_STATUS = 1 AND mib.STATUS = FALSE
    		GROUP BY mib.INSPECTOR_ID, mib.CAR_ID) urp
    	GROUP BY urp.INSPECTOR_ID) ures
    ON res.ID = ures.INSPECTOR_ID
    """,nativeQuery = true)
    List<Map<String,String>> getMapData(@Param("inputLat") double inputLat,@Param("inputLng") double inputLng);

    Long countBy();
}
