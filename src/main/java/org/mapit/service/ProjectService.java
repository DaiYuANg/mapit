package org.mapit.service;

import io.smallrye.mutiny.Uni;
import org.mapit.model.CreateProjectParameter;
import org.mapit.model.Paged;
import org.mapit.model.ProjectQuery;
import org.mapit.model.ProjectVo;

public interface ProjectService {
  Uni<Paged<ProjectVo>> list(ProjectQuery query);

  Uni<Void> create(CreateProjectParameter projectParameter);
}
