package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;
import jakarta.ws.rs.core.Response;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;

@RecordBuilder
public record Result<T>(
  String code,
  String status,
  T data
) {

  @Contract(" -> new")
  public static <T> @NotNull Result<T> normal() {
    return ResultBuilder.Result(String.valueOf(Response.Status.OK.getStatusCode()), "00000", null);
  }
}