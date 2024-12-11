package org.mapit.resource;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.model.CreateUser;
import org.mapit.model.LoginParameter;
import org.mapit.model.LoginResult;
import org.mapit.service.AuthService;

@Path("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthResource {
  private final AuthService authService;

  @POST
  @Path("login")
  public Uni<LoginResult> login(LoginParameter loginParameter) {
    return authService.login(loginParameter);
  }

  @POST
  @Path("register")
  public Uni<Void> register(CreateUser createUser) {
    return authService.registerUser(createUser);
  }
}
