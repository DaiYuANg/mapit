package org.mapit.repository;

import io.smallrye.mutiny.Uni;
import org.hibernate.annotations.processing.CheckHQL;
import org.hibernate.annotations.processing.Find;
import org.mapit.entity.Project;

@CheckHQL
public interface ProjectQueryRepository {

  @Find
  Uni<Project> findProjectByIdAndAccessKey(Long id, String accessKey);
}
