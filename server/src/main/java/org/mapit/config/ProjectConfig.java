package org.mapit.config;

import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Produces;
import lombok.val;
import org.jetbrains.annotations.NotNull;
import org.mapit.constant.ProjectHeader;
import org.mapit.model.ProjectContext;

public class ProjectConfig {

  @Produces
  @RequestScoped
  ProjectContext projectId(@NotNull RoutingContext context) {
    val request = context.request();
    val projectId = Long.valueOf(request.getHeader(ProjectHeader.PROJECT_ID));
    val projectToken = request.getHeader(ProjectHeader.PROJECT_TOKEN);
    return ProjectContext.builder()
      .projectId(projectId)
      .projectToken(projectToken)
      .build();
  }
}
