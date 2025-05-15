package org.mapit.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.enterprise.inject.Produces;
import jakarta.persistence.EntityManager;

public class QueryDSLConfig {

  @Produces
  JPAQueryFactory jpaQueryFactory(EntityManager entityManager) {
    return new JPAQueryFactory(entityManager);
  }
}
