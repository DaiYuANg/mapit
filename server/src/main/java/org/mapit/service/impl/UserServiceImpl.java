package org.mapit.service.impl;

import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.repository.UserRepository;
import org.mapit.service.UserService;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userMoreRepository;
}
