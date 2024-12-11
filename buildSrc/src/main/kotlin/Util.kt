import org.apache.commons.lang3.SystemUtils.IS_OS_WINDOWS

val shell by lazy {
  if (IS_OS_WINDOWS) {
    mutableListOf("cmd", "/c")
  } else {
    mutableListOf("sh", "-c")
  }
}
