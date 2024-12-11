import io.spring.gradle.dependencymanagement.dsl.DependencyManagementExtension

plugins {
  java
  alias(libs.plugins.spring.boot)
  alias(libs.plugins.spring.dependency.management)
  alias(libs.plugins.lombok)
}

group = "org.mapit.sdk.spring.boot"
the<DependencyManagementExtension>().apply {
  imports {
    mavenBom(org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES)
  }
}
java {
  toolchain {
    languageVersion = JavaLanguageVersion.of(21)
  }
}

configurations {
  compileOnly {
    extendsFrom(configurations.annotationProcessor.get())
  }
}

dependencies {
  implementation(projects.sharedDataStructure)
  implementation(libs.mica.auto)
  implementation(libs.spring.boot.starter)
  implementation(libs.spring.boot.starter.web)
  implementation(libs.spring.boot.starter.json)
  implementation(libs.spring.boot.starter.aop)
  implementation(libs.spring.boot.starter.actuator)
  annotationProcessor(libs.spring.boot.configuration.processor)
  testImplementation(libs.spring.boot.starter.test)
  testRuntimeOnly(libs.junit.platform.launcher)
}

tasks.test {
  useJUnitPlatform()
}

tasks.bootJar {
  enabled = false
}