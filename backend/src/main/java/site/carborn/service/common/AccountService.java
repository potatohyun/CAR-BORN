package site.carborn.service.common;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import site.carborn.config.SecurityUtil;
import site.carborn.dto.request.ResetPwdRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.entity.common.SmsAuth;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.common.SmsAuthRepository;
import site.carborn.util.common.AccountUtils;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final SmsAuthRepository smsAuthRepository;
    private final PasswordEncoder passwordEncoder;

    public String findId(Account account) {
        String name = account.getName();
        String phoneNo = account.getPhoneNo();

        Account save = accountRepository.findByPhoneNoAndName(phoneNo, name).orElseThrow(() ->
                new NullPointerException("입력한 정보에 해당하는 사용자가 존재하지 않습니다")
        );

        SmsAuth smsAuth = smsAuthRepository.checkSmsAuth(phoneNo);
        if (smsAuth == null || smsAuth.isStatus() == false) {
            throw new RuntimeException("SMS 인증을 완료하지 않았습니다");
        }

        return save.getId();
    }

    public boolean findPw(Account account) {
        String id = account.getId();
        String phoneNo = account.getPhoneNo();

        Account save = accountRepository.findByIdAndPhoneNo(id, phoneNo).orElseThrow(() ->
                new NullPointerException("입력한 정보에 해당하는 사용자가 존재하지 않습니다")
        );

        SmsAuth smsAuth = smsAuthRepository.checkSmsAuth(phoneNo);
        if (smsAuth == null || smsAuth.isStatus() == false) {
            throw new RuntimeException("SMS 인증을 완료하지 않았습니다");
        }

        return true;
    }

    public boolean resetPw(Account account) {
        String id = account.getId();
        String phoneNo = account.getPhoneNo();
        String pwd = account.getPwd();

        Account save = accountRepository.findByIdAndPhoneNo(id, phoneNo).orElseThrow(() ->
                new NullPointerException("입력한 정보에 해당하는 사용자가 존재하지 않습니다")
        );

        AccountUtils.checkAccountPwdFormat(pwd);

        SmsAuth smsAuth = smsAuthRepository.checkSmsAuth(phoneNo);
        if (smsAuth == null || smsAuth.isStatus() == false) {
            throw new RuntimeException("SMS 인증을 완료하지 않았습니다");
        }

        // 비밀번호 암호화
        save.setPwd(passwordEncoder.encode(pwd));

        // 변경된 비밀번호 정보 저장
        accountRepository.save(save);

        log.debug(String.format("사용자 [%s]의 비밀번호가 변경되었습니다", id));
        return true;
    }

    public boolean resetPwWithLogin(ResetPwdRequestDTO dto) {
        String accountId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkJWTAccount(accountId);

        String id = accountId;
        String pwd = dto.getPwd();
        String newPwd = dto.getNewPwd();

        if (id == null || id.isBlank()) {
            throw new NullPointerException("비밀번호를 변경하려는 계정 정보가 존재하지 않습니다");
        }

        Account save = accountRepository.findById(id);
        if (save == null) {
            throw new NullPointerException("입력한 정보에 해당하는 사용자가 존재하지 않습니다");
        }

        if (pwd == null || pwd.isBlank() || newPwd == null || newPwd.isBlank()) {
            throw new NullPointerException("비밀번호를 입력해주세요");
        }

        AccountUtils.checkAccountPwdFormat(pwd);
        AccountUtils.checkAccountPwdFormat(newPwd);

        if (passwordEncoder.matches(pwd, save.getPwd()) == false) {
            throw new RuntimeException("기존 비밀번호가 일치하지 않습니다");
        }

        // 비밀번호 암호화
        save.setPwd(passwordEncoder.encode(newPwd));

        // 변경된 비밀번호 정보 저장
        accountRepository.save(save);

        log.debug(String.format("사용자 [%s]의 비밀번호가 변경되었습니다", id));
        return true;
    }
}
