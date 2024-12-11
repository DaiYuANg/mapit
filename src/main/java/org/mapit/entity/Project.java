package org.mapit.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.Set;

@Table
@Entity
@Getter
@Setter
@Accessors(chain = true)
public class Project extends BaseEntity {

  private String name;

  private String description;

  private String accessToken;

  @OneToMany
  private Set<Dictionary> dictionaries;
}
