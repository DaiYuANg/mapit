package org.mapit.service;

import io.smallrye.mutiny.Uni;
import org.mapit.model.parameter.CreateUser;
import org.mapit.model.parameter.LoginParameter;
import org.mapit.model.parameter.LoginResult;

public interface AuthService {
    Uni<Void> registerUser(CreateUser createUser);

    Uni<LoginResult> login(LoginParameter loginParameter);
}
