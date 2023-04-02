package site.carborn.service;

import org.springframework.data.domain.Page;

public interface BoardService {
    public Page<?> getList(int page);
    public <T> T getView(int id);
    public <T> int insert(T board);
    public <T> int update(T board);
    public void delete(int id);
}
