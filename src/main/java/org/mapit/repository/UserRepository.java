package org.mapit.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.inject.Singleton;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.entity.InternalUser;

@Singleton
@Slf4j
@RequiredArgsConstructor
public class UserRepository implements PanacheRepositoryBase<InternalUser, Long> {
}
