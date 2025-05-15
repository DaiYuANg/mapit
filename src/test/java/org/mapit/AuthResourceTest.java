package org.mapit;


import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import org.mapit.repository.UserRepository;

@QuarkusTest
class AuthResourceTest {

  @Inject
  UserRepository userRepository;

  @Test
  void testLogin() {
//    Panache.withTransaction(() -> {
//        val faker = new Faker();
//        val user = new InternalUser()
//          .setUsername(faker.name().username())
//          .setPassword(faker.internet().password());
//        return userRepository.persist(user);
//      })
//      .subscribe()
//      .withSubscriber(UniAssertSubscriber.create());
//    val login = LoginParameterBuilder.builder()
//      .username("test")
//      .password("test")
//      .build();
//    given()
//      .body(login)
//      .contentType(ContentType.JSON)
//      .when()
//      .post("/api/v1/auth/login")
//      .then()
//      .statusCode(200)
//      .body(CoreMatchers.notNullValue());
  }
}