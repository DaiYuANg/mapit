package org.mapit.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import static org.mapit.constant.TableNaming.INTERNAL_USER;

@Entity
@Table(name = INTERNAL_USER)
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class InternalUser extends BaseEntity {
  private String username;

  private String password;
}
