plugins { `kotlin-dsl` }

repositories {
  mavenLocal()
  mavenCentral()
  gradlePluginPortal()
  google()
}

dependencies {
  implementation(files(libs.javaClass.superclass.protectionDomain.codeSource.location))
  implementation(libs.apache.common.lang3)
}