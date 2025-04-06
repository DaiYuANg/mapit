package org.mapit.converter;

import java.util.List;

import org.mapit.entity.Project;
import org.mapit.model.CreateProjectParameter;
import org.mapit.model.Paged;
import org.mapit.model.ProjectVo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA)
public interface ProjectConverter {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateAt", ignore = true)
  @Mapping(target = "dictionaries", ignore = true)
  @Mapping(target = "createAt", ignore = true)
  @Mapping(target = "accessKey", ignore = true)
  Project create(CreateProjectParameter createProjectParameter);

  ProjectVo entity2Vo(Project project);

  List<ProjectVo> entity2Vo(List<Project> project);

  Paged<ProjectVo> entity2Vo(Paged<Project> project);
}
