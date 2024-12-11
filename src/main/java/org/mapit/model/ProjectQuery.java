package org.mapit.model;

import jakarta.ws.rs.QueryParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@EqualsAndHashCode(callSuper = true)
@Data
@ToString(callSuper = true)
public class ProjectQuery extends PageQuery {

  @QueryParam("name")
  private String name;
}
