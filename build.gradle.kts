plugins {
  alias(libs.plugins.dotenv)
  alias(libs.plugins.version.check)
  alias(libs.plugins.git)
  alias(libs.plugins.spotless)
  application
  java
  alias(libs.plugins.quarkus)
  alias(libs.plugins.maniftest)
  alias(libs.plugins.lombok)
  alias(libs.plugins.plantuml)
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

group = "org.mapit"
version = git.uniqueShort.get()

spotless {
  java {
    target("**/*.java")
    importOrder()
    removeUnusedImports()
    trimTrailingWhitespace()
  }
}

dependencies {
  implementation(enforcedPlatform(libs.quarkus.bom))
  annotationProcessor(enforcedPlatform(libs.quarkus.bom))
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
  annotationProcessor(libs.quarkus.infinispan.client)
  implementation(libs.quarkus.infinispan.cache)
//  annotationProcessor("org.infinispan.protostream:protostream-processor:15.0.13.Final")
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

  implementation(libs.agrona)

  implementation(libs.vavr)
  implementation(libs.guava)

  compileOnly(libs.jetbrainsAnnotation)
  implementation(libs.password4j)

  implementation(libs.apache.common.lang3)

  implementation(libs.slf4j)
  implementation(libs.slf4jJulBridage)
  implementation(libs.slf4jJdkPlatform)
  implementation(libs.data.faker)
  annotationProcessor(libs.hibernate.validator.annotation.processor)
  annotationProcessor(libs.hibernate.jpamodelgen)
  testImplementation(libs.quarkus.junit5)
  testImplementation(libs.rest.assured)
  testImplementation(libs.quarkus.test.vertx)
}

java {
  sourceCompatibility = JavaVersion.VERSION_21
  targetCompatibility = JavaVersion.VERSION_21
}

tasks.withType<Test> {
  useJUnitPlatform()

  systemProperty("java.util.logging.manager", "org.jboss.logmanager.LogManager")
}
tasks.withType<JavaCompile> {
  options.encoding = "UTF-8"
  options.compilerArgs.add("-parameters")
}

tasks.compileQuarkusGeneratedSourcesJava {
  dependsOn(tasks.compileJava)
}