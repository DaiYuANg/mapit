package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;

import java.util.ArrayList;
import java.util.List;

@RecordBuilder
public record Paged<T>(
  Long total,
  List<T> data
) {
}
