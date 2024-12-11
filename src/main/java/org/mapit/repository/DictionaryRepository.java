package org.mapit.repository;

import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.reactive.mutiny.Mutiny;
import org.mapit.entity.Dictionary;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class DictionaryRepository implements PanacheRepositoryBase<Dictionary, Long> {
  private final Mutiny.SessionFactory sessionFactory;
}
