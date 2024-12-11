package org.mapit.springboot.processor;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class MappingProcessor {
  @Pointcut("@annotation(org.mapit.springboot.annotation.Mapping)")
  public void pointcut() {

  }

  @Before("pointcut()")
  public void beforeAdvice(JoinPoint joinPoint) {
    System.out.println("beforeAdvice...");
  }
}
