package org.mapit.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.hibernate.query.Page;
import org.mapit.entity.Dictionary;
import org.mapit.model.query.DictionaryQuery;
import org.mapit.model.Paged;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class DictionaryRepository implements PanacheRepositoryBase<Dictionary, Long> {

  public Uni<Paged<Dictionary>> pagedUni(DictionaryQuery query) {
    return Uni.createFrom().nullItem();
//    return sessionFactory.withSession(session ->
//      session
//        .createQuery("SELECT COUNT(*) FROM Dictionary", Long.class)
//        .getSingleResult()
//        .flatMap(count -> {
//          val page = Page.page(query.getPageSize(), query.getPageNumStartFromZero());
//          return session
//            .createQuery("FROM Dictionary", Dictionary.class)
//            .setPage(page)
//            .getResultList()
//            .map(pageResult ->
//              PagedBuilder.<Dictionary>builder()
//                .total(count)
//                .data(pageResult)
//                .build()
//            );
//        })
  }
}
