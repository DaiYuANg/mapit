package org.mapit.repository;

import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import jakarta.inject.Singleton;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.reactive.mutiny.Mutiny;
import org.mapit.entity.InternalUser;

@Singleton
@Slf4j
@RequiredArgsConstructor
public class UserRepository implements PanacheRepositoryBase<InternalUser, Long> {
  private final Mutiny.SessionFactory sessionFactory;
}
