package com.mycompany.obitemservice.controller;

import com.mycompany.obitemservice.model.ItemCategoryModel;
import com.mycompany.obitemservice.repository.ItemCategoryReactifRepository;
import com.mycompany.obitemservice.repository.ItemReactifRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;

@Component
@RequestMapping("/api/v1")
public class ItemCategoryReactifController {

    @Autowired
    private ItemCategoryReactifRepository itemCategoryReactifRepository;
    @Autowired
    private ItemReactifRepository itemReactifRepository;

    @GetMapping("/categorie")
    public Flux<ItemCategoryModel> getAllItemCategory() {
        return itemCategoryReactifRepository.findAll();
    }

    @GetMapping("/categorie/{id}")
    public Mono<ItemCategoryModel> getItemCategory(@PathVariable String id) {
        return itemCategoryReactifRepository.findById(id);
    }

    @PostMapping("/categorie")
    public Mono<ServerResponse> saveItemCategory(@RequestBody ItemCategoryModel categoryModel) {
        return Mono.just(categoryModel)
                .flatMap(itemCategoryReactifRepository::insert)
                .flatMap(savedItem -> ServerResponse.created(URI.create("/api/v1/categories/" + savedItem.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(savedItem));
    }

    @PutMapping("/categorie/{id}")
    public Mono<ServerResponse> updateItemCategory(@PathVariable String id, @RequestBody ItemCategoryModel item) {
        return itemCategoryReactifRepository.findById(id)
                .flatMap(imFromDB -> Mono.just(item)
                        .map(i -> {
                            BeanUtils.copyProperties(i, imFromDB);
                            return imFromDB;
                        }))
                .flatMap(itemCategoryReactifRepository::save)
                .flatMap(imFromDB -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(imFromDB));
    }

    @DeleteMapping("/categorie/{id}")
    public Mono<ServerResponse> deleteItemCategory(@PathVariable String id) {
        return itemReactifRepository.deleteAllByCategoryId(id)
                .then(itemCategoryReactifRepository.deleteById(id))
                .then(ServerResponse.ok().build());
    }
}