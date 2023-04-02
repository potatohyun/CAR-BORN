package site.carborn.service.common;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.entity.common.Terms;
import site.carborn.repository.common.TermsRepository;

@Slf4j
@Service
@Transactional
public class TermsService {
    @Autowired
    TermsRepository termsRepository;

    public String getTerms(int id) {
        Terms terms = termsRepository.findById(id).orElseThrow(() ->
                new NullPointerException("정보를 조회할 수 없습니다")
        );

        return terms.getContent();
    }
}
