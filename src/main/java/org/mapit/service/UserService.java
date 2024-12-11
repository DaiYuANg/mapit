package org.mapit.service;

import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.repository.UserRepository;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userMoreRepository;
}
