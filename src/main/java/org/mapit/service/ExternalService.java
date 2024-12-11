package org.mapit.service;

import io.smallrye.mutiny.Uni;
import org.mapit.model.GetAccessToken;
import org.mapit.model.VerifyAccessKeyResult;

public interface ExternalService {
  Uni<VerifyAccessKeyResult> verifyAccessKey(GetAccessToken getAccessToken);
}
