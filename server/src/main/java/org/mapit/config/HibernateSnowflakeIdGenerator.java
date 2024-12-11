package org.mapit.config;

import lombok.extern.slf4j.Slf4j;
import org.agrona.concurrent.SnowflakeIdGenerator;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

@Slf4j
public class HibernateSnowflakeIdGenerator implements IdentifierGenerator {
  private static final SnowflakeIdGenerator snowflake = new SnowflakeIdGenerator(1);

  @Override
  public Object generate(SharedSessionContractImplementor sharedSessionContractImplementor, Object o) {
    return snowflake.nextId();
  }
}
