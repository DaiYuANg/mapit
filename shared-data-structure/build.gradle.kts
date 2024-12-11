plugins {
  `java-library`
  alias(libs.plugins.lombok)
}

group = "org.mapit.data.structure"

dependencies {
  implementation(libs.record.builder.core)
  annotationProcessor(libs.record.builder.processor)
  implementation("com.fasterxml.jackson.core:jackson-annotations:2.18.2")
  implementation("com.fasterxml.jackson.core:jackson-databind:2.18.2")
}
