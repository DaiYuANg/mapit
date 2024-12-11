package org.mapit.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.mapit.annotation.SnowflakeGenerator;

import java.util.Date;

@MappedSuperclass
@Getter
@Accessors(chain = true)
public class BaseEntity extends PanacheEntityBase {

  @Id
  @GeneratedValue(generator = "SnowflakeGenerator")
  @SnowflakeGenerator
  private Long id;

  @CreationTimestamp
  private Date createAt;

  @UpdateTimestamp
  private Date updateAt;

}
