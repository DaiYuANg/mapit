package org.mapit.config;

import jakarta.enterprise.inject.Produces;
import nl.basjes.parse.useragent.UserAgentAnalyzer;

public class UserAgent {
  @Produces
  UserAgentAnalyzer userAgentAnalyzer() {
    return UserAgentAnalyzer
      .newBuilder()
      .hideMatcherLoadStats()
      .withCache(10000)
      .build();
  }
}
