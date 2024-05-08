package com.mycompany.obitemservice.repository;

import com.mycompany.obitemservice.model.ItemModel;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ItemReactifRepository extends ReactiveMongoRepository<ItemModel, String> {
    Mono<Void> deleteAllByCategoryId(String categoryId);
    Flux<ItemModel> findAllByCategoryId(String categoryId);
}