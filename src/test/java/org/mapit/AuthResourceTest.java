package org.mapit;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.vertx.RunOnVertxContext;
import io.restassured.http.ContentType;
import io.smallrye.mutiny.helpers.test.UniAssertSubscriber;
import jakarta.inject.Inject;
import lombok.val;
import net.datafaker.Faker;
import org.hamcrest.CoreMatchers;
import org.hamcrest.Matcher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapit.entity.InternalUser;
import org.mapit.model.LoginParameterBuilder;
import org.mapit.repository.UserRepository;

import static io.restassured.RestAssured.given;

@QuarkusTest
class AuthResourceTest {

  @Inject
  UserRepository userRepository;

  @Test
  @RunOnVertxContext
  void testLogin() {
    Panache.withTransaction(() -> {
        val faker = new Faker();
        val user = new InternalUser()
          .setUsername(faker.name().username())
          .setPassword(faker.internet().password());
        return userRepository.persist(user);
      })
      .subscribe()
      .withSubscriber(UniAssertSubscriber.create());
    val login = LoginParameterBuilder.builder()
      .username("test")
      .password("test")
      .build();
    given()
      .body(login)
      .contentType(ContentType.JSON)
      .when()
      .post("/api/v1/auth/login")
      .then()
      .statusCode(200)
      .body(CoreMatchers.notNullValue());
  }
}