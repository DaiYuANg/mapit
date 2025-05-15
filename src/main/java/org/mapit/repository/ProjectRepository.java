package org.mapit.repository;

import static io.smallrye.mutiny.Uni.combine;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.hibernate.query.Page;
import org.mapit.entity.Project;
import org.mapit.model.Paged;
import org.mapit.model.ProjectQuery;

import java.util.ArrayList;

@Slf4j
@RequiredArgsConstructor
@ApplicationScoped
public class ProjectRepository implements PanacheRepositoryBase<Project, Long> {

//  private final Mutiny.SessionFactory sessionFactory;

  public Uni<Paged<Project>> pagedUni(ProjectQuery query) {
    return Uni.createFrom().nullItem();
//    return sessionFactory.withSession(session ->
//      session
//        .createQuery("SELECT COUNT(*) FROM Project", Long.class)
//        .getSingleResult()
//        .flatMap(count -> {
//          val page = Page.page(query.getPageSize(), query.getPageNumStartFromZero());
//          return session
//            .createQuery("FROM Project ", Project.class)
//            .setPage(page)
//            .getResultList()
//            .map(pageResult ->
//              PagedBuilder.<Project>builder()
//                .total(count)
//                .data(pageResult)
//                .build()
//            );
//        })
  }
}
