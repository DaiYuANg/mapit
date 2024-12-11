package org.mapit.model;

import jakarta.ws.rs.QueryParam;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import java.util.Optional;

@Data
@Slf4j
public class PageQuery {

  @QueryParam("pageSize")
  private Integer pageSize;

  @QueryParam("current")
  private Integer current;

  /**
   * 分页 页数 计算公式 == 1 提前计算首页 跳过 公式计算
   *
   * @return 第几页
   */
  public Integer getPageNumStartFromZero() {
    val computed = getCurrent() == 1 ? 0 : (current - 1) * pageSize;
    return Math.max(computed, 0);
  }

  public Integer getCurrent() {
    return Optional.ofNullable(current).orElse(1);
  }

  public Integer getPageSize() {
    return Optional.ofNullable(pageSize).orElse(10);
  }
}
