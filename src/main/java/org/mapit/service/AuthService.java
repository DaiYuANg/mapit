package org.mapit.service;

import io.smallrye.mutiny.Uni;
import org.mapit.model.LoginParameter;
import org.mapit.model.LoginResult;

public interface AuthService {
  Uni<LoginResult> login(LoginParameter loginParameter);
}
