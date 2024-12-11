import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.tasks.Exec
import java.lang.System.getenv
import kotlin.io.path.Path

class RSAKeyPlugin : Plugin<Project> {
  private val defaultSize by lazy { getenv().getOrDefault("EXT_RSA_SIZE", "2048").toInt() }

  override fun apply(target: Project) {
    val privateFile =
      Path(target.layout.projectDirectory.asFile.absolutePath, "privateKey.pem").toFile()
    val publicFile =
      Path(target.layout.projectDirectory.asFile.absolutePath, "publicKey.pem").toFile()

    target.tasks.create("generatePrivateKey", Exec::class.java) {
      group = "generator"
      val privateCommand = "openssl genrsa -out ${privateFile.absolutePath} $defaultSize"
      commandLine(shell.plus(privateCommand))
    }

    target.tasks.create("generatePublicKey", Exec::class.java) {
      dependsOn("generatePrivateKey")
      group = "generator"
      val publicCommand =
        "openssl rsa -pubout -in ${privateFile.absolutePath} -out ${publicFile.absolutePath}"
      commandLine(shell.plus(publicCommand))
    }
  }
}