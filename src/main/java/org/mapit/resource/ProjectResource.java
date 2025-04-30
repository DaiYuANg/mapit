package org.mapit.resource;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.model.parameter.CreateProjectParameter;
import org.mapit.model.Paged;
import org.mapit.model.ProjectQuery;
import org.mapit.model.vo.ProjectVo;
import org.mapit.service.ProjectService;

@Path("/api/v1/project")
@RequiredArgsConstructor
@Slf4j
//@Authenticated
public class ProjectResource {

  private final ProjectService projectService;

  @GET
  public Uni<Paged<ProjectVo>> list(@BeanParam ProjectQuery query) {
    log.atInfo().log("Param:{}", query);
    return projectService.page(query);
  }

  @POST
  public Uni<Void> create(CreateProjectParameter projectParameter) {
    return projectService.create(projectParameter);
  }
}
