package org.mapit.service;

import io.smallrye.mutiny.Uni;
import org.mapit.model.CreateUser;
import org.mapit.model.LoginParameter;
import org.mapit.model.LoginResult;

public interface AuthService {
    Uni<Void> registerUser(CreateUser createUser);

    Uni<LoginResult> login(LoginParameter loginParameter);
}
