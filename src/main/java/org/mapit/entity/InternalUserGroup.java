package org.mapit.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Set;

@Entity
@Table
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
@Accessors(chain = true)
public class InternalUserGroup extends BaseEntity {

  @Column
  private String name;

  @OneToMany
  private Set<InternalUser> users;
}
