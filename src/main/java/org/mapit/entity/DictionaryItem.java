package org.mapit.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.SoftDelete;
import org.mapit.converter.JsonConverter;

import java.util.Map;

import static org.mapit.constant.TableNaming.DICTIONARY_ITEM;

@Entity
@Table(name = DICTIONARY_ITEM)
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class DictionaryItem extends BaseEntity {

  @Column
  private String name;

  @Column
  private String value;

  @Column
  private String description;

  @Column
  private String remark;

  @ManyToOne
  private Dictionary dictionary;

  @SoftDelete
  private Boolean delete;

  @Convert(converter = JsonConverter.class)
  @Column(columnDefinition = "json")
  private Map<String, Object> meta;
}
