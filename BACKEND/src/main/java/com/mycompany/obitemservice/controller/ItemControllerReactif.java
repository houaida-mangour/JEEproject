package com.mycompany.obitemservice.controller;

import com.mycompany.obitemservice.model.ItemModel;
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
public class ItemControllerReactif {

    @Autowired
    private ItemReactifRepository itemReactifRepository;

    @GetMapping("/item")
    public Flux<ItemModel> getAllItems() {
        return itemReactifRepository.findAll();
    }

    @GetMapping("/item/{id}")
    public Mono<ItemModel> getItem(@PathVariable String id) {
        return itemReactifRepository.findById(id);
    }

    @PostMapping("/item")
    public Mono<ServerResponse> saveItem(@RequestBody Mono<ItemModel> item) {
        return item.flatMap(itemReactifRepository::insert)
                .flatMap(savedItem -> ServerResponse.created(URI.create("/api/v1/item/" + savedItem.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(savedItem));
    }

    @PutMapping("/item/{id}")
    public Mono<ServerResponse> updateItem(@PathVariable String id, @RequestBody Mono<ItemModel> item) {
        return itemReactifRepository.findById(id)
                .flatMap(imFromDB -> item.map(i -> {
                    BeanUtils.copyProperties(i, imFromDB);
                    return imFromDB;
                }))
                .flatMap(itemReactifRepository::save)
                .flatMap(imFromDB -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(imFromDB));
    }

    @PatchMapping("/item/{id}")
    public Mono<ServerResponse> updateItemPrice(@PathVariable String id, @RequestBody Mono<ItemModel> item) {
        return itemReactifRepository.findById(id)
                .flatMap(imFromDB -> item.map(i -> {
                    imFromDB.setPrice(i.getPrice());
                    return imFromDB;
                }))
                .flatMap(itemReactifRepository::save)
                .flatMap(imFromDB -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(imFromDB));
    }

    @DeleteMapping("/item/{id}")
    public Mono<ServerResponse> deleteItem(@PathVariable String id) {
        return itemReactifRepository.deleteById(id)
                .then(ServerResponse.ok().build());
    }
}