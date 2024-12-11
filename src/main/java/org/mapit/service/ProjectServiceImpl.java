package org.mapit.service;

import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.RandomStringUtils;
import org.mapit.converter.ProjectConverter;
import org.mapit.model.CreateProjectParameter;
import org.mapit.model.Paged;
import org.mapit.model.ProjectQuery;
import org.mapit.model.ProjectVo;
import org.mapit.repository.ProjectRepository;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
  private final ProjectRepository projectRepository;

  private final ProjectConverter projectConverter;

  @Override
  @WithSession
  public Uni<Paged<ProjectVo>> list(ProjectQuery query) {
    return projectRepository.pagedUni(query).map(projectConverter::entity2Vo);
  }

  @Override
  @WithTransaction
  public Uni<Void> create(CreateProjectParameter projectParameter) {
    return Uni.createFrom().item(projectConverter.create(projectParameter))
      .invoke(entity -> {
        val token = RandomStringUtils.secure().next(20);
        entity.setAccessToken(token);
      })
      .flatMap(projectRepository::persist)
      .replaceWithVoid();
  }
}
