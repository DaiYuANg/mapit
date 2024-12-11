package org.mapit.repository;

import io.smallrye.mutiny.Uni;
import org.hibernate.annotations.processing.CheckHQL;
import org.hibernate.annotations.processing.Find;
import org.mapit.entity.InternalUser;

@CheckHQL
public interface UserQueryRepository {

  @Find
  Uni<InternalUser> findUserByUsername(String username);
}
