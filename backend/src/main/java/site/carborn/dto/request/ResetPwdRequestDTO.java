package site.carborn.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResetPwdRequestDTO {
    private String id;
    private String pwd;
    private String newPwd;
}
