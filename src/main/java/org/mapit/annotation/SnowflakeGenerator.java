package org.mapit.annotation;

import org.hibernate.annotations.IdGeneratorType;
import org.mapit.config.HibernateSnowflakeIdGenerator;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@IdGeneratorType( HibernateSnowflakeIdGenerator.class )
@Target({METHOD, FIELD})
@Retention(RUNTIME)
public @interface SnowflakeGenerator {
}
