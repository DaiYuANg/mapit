package org.mapit.entity;

import static org.mapit.constant.TableNaming.DICTIONARY_ITEM;

import jakarta.persistence.*;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.SoftDelete;
import org.mapit.converter.JsonConverter;

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

  @Column(insertable = false, updatable = false)
  private Long dictionaryId;

  @ManyToOne
  private Dictionary dictionary;

  @SoftDelete
  private Boolean delete;

  @Convert(converter = JsonConverter.class)
  @Column(columnDefinition = "json")
  private Map<String, Object> meta;
}
