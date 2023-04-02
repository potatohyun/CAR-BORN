package site.carborn.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import site.carborn.entity.car.Car;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CarRequestDTO extends Car {

    List<MultipartFile> carImg;

    MultipartFile carVrc;
}
