package org.mapit.entity;

import static org.mapit.constant.TableNaming.PROJECT;

import jakarta.persistence.*;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.mapit.constant.ProjectType;
import org.mapit.converter.ProjectTypeConverter;

@Table(
  uniqueConstraints = @UniqueConstraint(columnNames = "accessKey"),
  name = PROJECT
)
@Entity
@Getter
@Setter
@Accessors(chain = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class Project extends BaseEntity {

  private String name;

  private String description;

  @Column
  private String accessKey;

  @Convert(converter = ProjectTypeConverter.class)
  private ProjectType type;

  @OneToMany
  private Set<Dictionary> dictionaries;
}
