import com.xenoterracide.gradle.semver.GitMetadataExtension

plugins {
  java
  alias(libs.plugins.quarkus)
  alias(libs.plugins.dotenv)
  alias(libs.plugins.version.check)
  alias(libs.plugins.maniftest)
  alias(libs.plugins.lombok)
  alias(libs.plugins.plantuml)
  alias(libs.plugins.semver)
  alias(libs.plugins.spotless)
  alias(libs.plugins.docker.compose)
}

apply<RSAKeyPlugin>()

allprojects {
  repositories {
    mavenCentral()
    mavenLocal()
    gradlePluginPortal()
    google()
  }
}

dependencies {
  implementation(enforcedPlatform(libs.quarkus.bom))
  implementation(libs.quarkus.hibernate.reactive)
  implementation(libs.quarkus.mutiny)
  implementation(libs.quarkus.rest)
  implementation(libs.quarkus.hibernate.reactive.panache)
  implementation(libs.quarkus.hibernate.reactive.rest.data.panache)
  implementation(libs.quarkus.config.yaml)
  implementation(libs.quarkus.scheduler)
  implementation(libs.quarkus.smallrye.jwt)
  implementation(libs.quarkus.logging.json)
  implementation(libs.quarkus.vertx)
  implementation(libs.quarkus.reactive.mysql.client)
  implementation(libs.quarkus.hibernate.validator)
  implementation(libs.quarkus.websockets.next)
  implementation(libs.quarkus.rest.jackson)
  implementation(libs.quarkus.quartz)
  implementation(libs.quarkus.jackson)
  implementation(libs.quarkus.mailer)
  implementation(libs.quarkus.reactive.pg.client)
  implementation(libs.quarkus.smallrye.jwt.build)
  implementation(libs.quarkus.quinoa)
  implementation(libs.quarkus.arc)
  implementation(libs.quarkus.info)
  implementation(libs.quarkus.logging.manager)
  implementation(libs.quarkus.infinispan.client)
  implementation(libs.quarkus.infinispan.cache)
  implementation(libs.quarkus.graphql)
  implementation(libs.quarkus.container.image.docker)
  implementation(libs.quarkus.smallrye.health)
  implementation(libs.quarkus.smallrye.openapi)
  implementation(libs.quarkus.flyway)
  implementation(libs.quarkus.jdbc.mysql)
  implementation(libs.quarkus.jdbc.mariadb)
  implementation(libs.quarkus.jdbc.postgresql)
  implementation(libs.quarkus.systemd.notifiy)

  implementation(libs.record.builder.core)
  annotationProcessor(libs.record.builder.processor)

  implementation(libs.mapstruct)
  annotationProcessor(libs.mapstruct.processor)

  implementation(projects.sharedDataStructure)

  implementation(libs.agrona)

  implementation(libs.vavr)
  implementation(libs.guava)

  compileOnly(libs.jetbrainsAnnotation)
  implementation(libs.password4j)

  implementation(libs.apache.common.lang3)

  implementation(libs.hutool.core)

  implementation(libs.slf4j)
  implementation(libs.slf4jJulBridage)
  implementation(libs.slf4jJdkPlatform)
  annotationProcessor(libs.hibernate.validator.annotation.processor)
  annotationProcessor(libs.hibernate.jpamodelgen)
  testImplementation(libs.quarkus.junit5)
  testImplementation(libs.rest.assured)
}

val git: GitMetadataExtension = semver.git

group = "org.mapit"
version = git.commitShort!!

java {
  sourceCompatibility = JavaVersion.VERSION_21
  targetCompatibility = JavaVersion.VERSION_21
}

tasks.withType<Test> {
  systemProperty("java.util.logging.manager", "org.jboss.logmanager.LogManager")
}
tasks.withType<JavaCompile> {
  options.encoding = "UTF-8"
  options.compilerArgs.add("-parameters")
}

spotless {
  java {
    target("**/*.java")
    indentWithSpaces(2)
    importOrder()
    removeUnusedImports()
    trimTrailingWhitespace()
  }
}