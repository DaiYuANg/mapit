package org.mapit.service.impl;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.RandomStringUtils;
import org.mapit.constant.ProjectType;
import org.mapit.converter.ProjectConverter;
import org.mapit.model.parameter.CreateProjectParameter;
import org.mapit.model.Paged;
import org.mapit.model.ProjectQuery;
import org.mapit.model.vo.ProjectVo;
import org.mapit.repository.ProjectRepository;
import org.mapit.service.ProjectService;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
  private final ProjectRepository projectRepository;

  private final ProjectConverter projectConverter;

  @Override
  public Uni<Paged<ProjectVo>> page(ProjectQuery query) {
    return projectRepository.pagedUni(query).map(projectConverter::entity2Vo);
  }

  @Override
  public Uni<Void> create(CreateProjectParameter projectParameter) {
    return Uni.createFrom().nullItem();
//    return Uni.createFrom()
//      .item(projectConverter.create(projectParameter))
//      .invoke(project -> {
//        project.setType(ProjectType.OWNED);
//      })
//      .invoke(entity -> {
//        val token = RandomStringUtils.secure().nextNumeric(20);
//        entity.setAccessKey(token);
//      })
//      .flatMap(projectRepository::persist)
//      .replaceWithVoid();
  }
}
