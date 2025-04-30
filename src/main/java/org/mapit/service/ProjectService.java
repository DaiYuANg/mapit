package org.mapit.service;

import io.smallrye.mutiny.Uni;
import org.mapit.model.parameter.CreateProjectParameter;
import org.mapit.model.Paged;
import org.mapit.model.ProjectQuery;
import org.mapit.model.vo.ProjectVo;

public interface ProjectService {
  Uni<Paged<ProjectVo>> page(ProjectQuery query);

  Uni<Void> create(CreateProjectParameter projectParameter);
}
