package site.carborn.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import site.carborn.entity.board.Board;

@Getter
@Setter
@NoArgsConstructor
public class BoardRequestDTO extends Board {
    private MultipartFile file;
}
