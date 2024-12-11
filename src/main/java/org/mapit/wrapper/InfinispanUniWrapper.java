package org.mapit.wrapper;

import static io.smallrye.mutiny.Uni.createFrom;

import io.smallrye.mutiny.Uni;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.BiFunction;
import org.infinispan.client.hotrod.RemoteCache;
import org.infinispan.commons.api.query.Query;

@SuppressWarnings("unused")
public record InfinispanUniWrapper<K, V>(RemoteCache<K, V> cache) {

  public Uni<V> put(K key, V value) {
    return createFrom().completionStage(cache.putAsync(key, value));
  }

  public Uni<V> put(K key, V value, Long time, TimeUnit timeUnit) {
    return createFrom().completionStage(cache.putAsync(key, value, time, timeUnit));
  }

  public Uni<V> put(K key, V value, long lifespan, TimeUnit lifespanUnit, long maxIdle, TimeUnit maxIdleUnit) {
    return createFrom().completionStage(cache.putAsync(key, value, lifespan, lifespanUnit, maxIdle, maxIdleUnit));
  }

  public Uni<Void> clear() {
    return createFrom().completionStage(cache.clearAsync());
  }

  public Uni<Void> putAll(Map<? extends K, ? extends V> data) {
    return createFrom().completionStage(cache.putAllAsync(data));
  }

  public Uni<Void> putAll(Map<? extends K, ? extends V> data, long lifespan, TimeUnit unit) {
    return createFrom().completionStage(cache.putAllAsync(data, lifespan, unit));
  }

  public Uni<Void> putAll(Map<? extends K, ? extends V> data, long lifespan, TimeUnit lifespanUnit, long maxIdle, TimeUnit maxIdleUnit) {
    return createFrom().completionStage(cache.putAllAsync(data, lifespan, lifespanUnit, maxIdle, maxIdleUnit));
  }

  public Uni<V> get(K k) {
    return createFrom().completionStage(cache.getAsync(k));
  }

  public <R> Uni<Query<R>> query(String k) {
    return createFrom().item(cache.query(k));
  }

  public Uni<V> get(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction) {
    return createFrom().completionStage(cache.computeAsync(key, remappingFunction));
  }
}
