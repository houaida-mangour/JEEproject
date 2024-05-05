//package com.mycompany.obitemservice.controller;

//import com.mycompany.obitemservice.model.ItemModel;
//import com.mycompany.obitemservice.repository.ItemRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;

//@RestController
//@RequestMapping("/api/v1")
//public class APIController {

//  @Autowired
//  private ItemRepository itemRepository;

    // Renamed to avoid conflict
//  @GetMapping("/items/{id}")
//  public ItemModel getItemDetails(@PathVariable String id) {
//      return itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Cannot Find Item By ID: " + id));
//  }

//  @RequestMapping(value = "/items", method = RequestMethod.POST)
//  public ItemModel saveItem(@RequestBody ItemModel item) {
//      return itemRepository.save(item);
//  }

//  @RequestMapping(value = "/items", method = RequestMethod.PUT)
// public ItemModel updateItem(@RequestBody ItemModel item) {
//      return itemRepository.save(item);
//   }

//  @RequestMapping(value = "/items/{id}", method = RequestMethod.DELETE)
//  public void deleteItem(@PathVariable String id) {
//      itemRepository.deleteById(id);
//  }
//}