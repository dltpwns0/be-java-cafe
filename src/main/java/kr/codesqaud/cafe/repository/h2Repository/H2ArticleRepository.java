package kr.codesqaud.cafe.repository.h2Repository;

import kr.codesqaud.cafe.basic.Article;
import kr.codesqaud.cafe.repository.ArticleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import javax.sql.DataSource;
import java.sql.*;
import java.util.List;

@Repository
@Primary
public class H2ArticleRepository implements ArticleRepository {
    private static final Logger logger = LoggerFactory.getLogger("article database");

    public final JdbcTemplate jdbcTemplate;

    @Autowired
    public H2ArticleRepository(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void save(Article article) {
        String sql = "insert into articles(writer, title, contents, timeStamp) values (?, ?, ?, ?)";

        jdbcTemplate.update(sql, article.getWriter(), article.getTitle(), article.getContents(), article.getTimeStamp());
    }

    public int delete(int index) {
        String sql = "delete from articles where articleId=?";

        return jdbcTemplate.update(sql, index);
    }

    public Article findByIndex(int index) {
        String sql = "select articleId, writer, title, contents, timeStamp from articles where articleId = ?";

        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Article.class), index);
    }

    public List<Article> findAll() {
        String sql = "select articleId, writer, title, contents, timeStamp from articles";

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Article.class));
    }

    private int getArticleSize() throws SQLException {
        String sql = "select count(*) from articles";

        return jdbcTemplate.queryForObject(sql, Integer.TYPE);
    }
}
