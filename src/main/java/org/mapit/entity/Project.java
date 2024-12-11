package org.mapit.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Set;

import static org.mapit.constant.TableNaming.PROJECT;

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

  @OneToMany
  private Set<Dictionary> dictionaries;
}
