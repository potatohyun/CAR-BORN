package site.carborn.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.entity.account.Account;
import site.carborn.repository.account.AccountRepository;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class HelloService {
    @Autowired
    final AccountRepository accountRepository;

    public Account hello(String accountId) {
        Account account = accountRepository.findById(accountId);

        if (account == null) {
            throw new NullPointerException("Account 데이터를 조회할 수 없습니다");
        }

        return account;
    }
}
