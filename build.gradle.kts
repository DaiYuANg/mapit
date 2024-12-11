import com.xenoterracide.gradle.semver.GitMetadataExtension

plugins {
  `java-library`
  alias(libs.plugins.dotenv)
  alias(libs.plugins.version.check)
  alias(libs.plugins.semver)
  alias(libs.plugins.spotless)
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

val git: GitMetadataExtension = semver.git

group = "org.mapit"
version = git.commitShort!!

spotless {
  java {
    target("**/*.java")
    indentWithSpaces(2)
    importOrder()
    removeUnusedImports()
    trimTrailingWhitespace()
  }
}

subprojects {
  apply<JavaLibraryPlugin>()
  tasks.test {
    useJUnitPlatform()
  }
}