package org.mapit.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.entity.DictionaryItem;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class DictionaryItemRepository implements PanacheRepositoryBase<DictionaryItem, Long> {
}
