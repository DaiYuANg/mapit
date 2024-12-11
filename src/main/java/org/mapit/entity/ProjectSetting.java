package org.mapit.entity;

import static org.mapit.constant.TableNaming.PROJECT_SETTINGS;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.ToString;
import org.mapit.converter.StringArrayConverter;

@Table(name = PROJECT_SETTINGS)
@Entity
@ToString(callSuper = true)
public class ProjectSetting extends BaseEntity {
  @Convert(converter = StringArrayConverter.class)
  private String[] allowAccessUrl;
}
