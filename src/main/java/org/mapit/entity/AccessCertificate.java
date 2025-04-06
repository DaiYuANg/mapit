package org.mapit.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.experimental.Accessors;

import java.util.Date;

@Entity
@Table
@Accessors(chain = true)
public class AccessCertificate extends BaseEntity {
  private String token;

  private Date expiresAt;
}
