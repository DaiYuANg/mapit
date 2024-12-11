package org.mapit.springboot.http;

import org.mapit.springboot.model.Dict;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange(url = "/api/v1/{owner}/{repo}", accept = "application/json")
public interface MapitRequestAPI {

  @GetExchange("/repos/{owner}/{repo}")
  Dict getRepository(@PathVariable String owner, @PathVariable String repo);
}
