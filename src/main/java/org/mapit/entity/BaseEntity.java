package org.mapit.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.mapit.annotation.SnowflakeGenerator;

import java.util.Date;

import static org.mapit.constant.FieldNaming.CREATE_AT;
import static org.mapit.constant.FieldNaming.UPDATE_AT;

@MappedSuperclass
@Getter
@Setter
@Accessors(chain = true)
@ToString
public class BaseEntity extends PanacheEntityBase {

  @Id
  @GeneratedValue(generator = "SnowflakeGenerator")
  @SnowflakeGenerator
  private Long id;

  @CreationTimestamp
  @Column(name = CREATE_AT)
  private Date createAt;

  @UpdateTimestamp
  @Column(name = UPDATE_AT)
  private Date updateAt;
}
