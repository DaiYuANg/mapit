package org.mapit.repository;

import io.quarkus.hibernate.reactive.panache.PanacheRepository;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.hibernate.query.Page;
import org.hibernate.reactive.mutiny.Mutiny;
import org.mapit.entity.Project;
import org.mapit.model.Paged;
import org.mapit.model.PagedBuilder;
import org.mapit.model.ProjectQuery;

import java.util.ArrayList;

import static io.smallrye.mutiny.Uni.combine;

@Slf4j
@RequiredArgsConstructor
@ApplicationScoped
public class ProjectRepository implements PanacheRepositoryBase<Project, Long> {

  private final Mutiny.SessionFactory sessionFactory;

  public Uni<Paged<Project>> pagedUni(ProjectQuery query) {
    val total = sessionFactory.withStatelessSession(
        session ->
          session.createQuery("SELECT COUNT(*) FROM Project", Long.class)
            .getSingleResult()
      )
      .log("Project Count");
    val data = sessionFactory.withSession(
        session -> {
          val page = Page.page(query.getPageSize(), query.getPageNumStartFromZero());
          return session.createQuery("FROM Project ", Project.class)
            .setPage(page)
            .getResultList();
        }
      )
      .log("Query Project");

    return combine().all().unis(total, data)
      .asTuple()
      .map(tuple -> PagedBuilder.<Project>builder()
        .total(tuple.getItem1())
        .data(tuple.getItem2())
        .build())
      ;
  }
}
