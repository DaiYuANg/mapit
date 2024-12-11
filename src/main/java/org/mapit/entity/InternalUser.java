package org.mapit.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class InternalUser extends BaseEntity {
  private String username;

  private String password;
}
