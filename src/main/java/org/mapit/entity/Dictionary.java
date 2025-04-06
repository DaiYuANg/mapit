package org.mapit.entity;

import jakarta.persistence.*;
import java.util.Map;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.SoftDelete;
import org.mapit.constant.TableNaming;
import org.mapit.converter.JsonConverter;

@Entity
@Table(name = TableNaming.DICTIONARY)
@Getter
@Setter
@ToString(callSuper = true)
@Accessors(chain = true)
public class Dictionary extends BaseEntity {

  @Column
  private String name;

  @Column
  private String key;

  @Column
  private String description;

  @Column
  private String remark;

  @SoftDelete
  private Boolean delete;

  @OneToMany
  @ToString.Exclude
  private Set<DictionaryItem> items;

  @Column(insertable = false, updatable = false)
  private Long projectId;

  @ManyToOne
  private Project project;

  @Convert(converter = JsonConverter.class)
  @Column(columnDefinition = "json")
  private Map<String, Object> meta;
}
