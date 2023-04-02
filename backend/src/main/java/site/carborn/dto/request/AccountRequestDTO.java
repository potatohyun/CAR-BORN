package site.carborn.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import site.carborn.entity.account.Account;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class AccountRequestDTO extends Account {
    private LocalDate birth;
    private String brn;
    private String address;
    private MultipartFile cbr = new MultipartFile() {
        @Override
        public String getName() {
            return null;
        }

        @Override
        public String getOriginalFilename() {
            return null;
        }

        @Override
        public String getContentType() {
            return null;
        }

        @Override
        public boolean isEmpty() {
            return false;
        }

        @Override
        public long getSize() {
            return 0;
        }

        @Override
        public byte[] getBytes() throws IOException {
            return new byte[0];
        }

        @Override
        public InputStream getInputStream() throws IOException {
            return null;
        }

        @Override
        public void transferTo(File dest) throws IOException, IllegalStateException {

        }
    };

    @Override
    public String toString() {
        return "AccountRequestDTO{" +
                "birth=" + birth +
                ", brn='" + brn + '\'' +
                ", address='" + address + '\'' +
                ", cbr=" + cbr +
                '}';
    }
}
