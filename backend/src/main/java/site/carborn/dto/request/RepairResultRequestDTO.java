package site.carborn.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import site.carborn.entity.user.RepairResult;

@Getter
@Setter
@NoArgsConstructor
public class RepairResultRequestDTO extends RepairResult {
    private MultipartFile beforeImg;
    private MultipartFile afterImg;
    private MultipartFile receiptImg;
}
