package kr.codesqaud.cafe.repository;

import kr.codesqaud.cafe.basic.Article;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository {

    public int save(Article article) ;

    public int update(int articleId, String Title, String content);

    public int delete(int articleId);

    public Optional<Article> findByArticleId(int index);

    public List<Article> findAll() ;
}
