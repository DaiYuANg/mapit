package org.mapit.repository;

import static io.smallrye.mutiny.Uni.createFrom;

import io.quarkus.infinispan.client.Remote;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.infinispan.client.hotrod.RemoteCache;
import org.mapit.converter.DictionaryConverter;
import org.mapit.entity.Dictionary;
import org.mapit.schema.DictionaryCache;
import org.mapit.wrapper.InfinispanUniWrapper;

@ApplicationScoped
@Slf4j
public class DictionaryCacheRepository {
  private final InfinispanUniWrapper<Long, DictionaryCache> wrapper;

  private final DictionaryConverter dictionaryConverter;

  @Inject
  public DictionaryCacheRepository(@Remote("dictionary") RemoteCache<Long, DictionaryCache> cache, DictionaryConverter dictionaryConverter) {
    this.wrapper = new InfinispanUniWrapper<>(cache);
    this.dictionaryConverter = dictionaryConverter;
  }

  public Uni<Void> create(Dictionary dictionary) {
    return createFrom().item(dictionaryConverter.entity2Cache(dictionary))
      .flatMap(c -> wrapper.put(c.id(), c))
      .replaceWithVoid()
      ;
  }
}
