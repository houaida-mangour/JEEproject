package com.mycompany.obitemservice.repository;

import com.mycompany.obitemservice.model.ItemCategoryModel;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ItemCategoryReactifRepository extends ReactiveMongoRepository<ItemCategoryModel, String> {
    Mono<Void> deleteAllById(String id);
    Flux<ItemCategoryModel> findAllById(String id);
}