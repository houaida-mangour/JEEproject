package com.mycompany.obitemservice;

import com.mycompany.obitemservice.controller.ItemCategoryController;
import com.mycompany.obitemservice.model.ItemCategoryModel;
import com.mycompany.obitemservice.repository.ItemCategoryRepository;
import com.mycompany.obitemservice.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ItemCategoryControllerTest {

    @Mock
    private ItemCategoryRepository itemCategoryRepository;

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ItemCategoryController itemCategoryController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllItemCategory() {
        List<ItemCategoryModel> categories = new ArrayList<>();
        categories.add(new ItemCategoryModel("1", "Category 1"));
        categories.add(new ItemCategoryModel("2", "Category 2"));
        when(itemCategoryRepository.findAll()).thenReturn(categories);
        List<ItemCategoryModel> result = itemCategoryController.getAllItemCategory();
        assertEquals(categories, result);
    }

    @Test
    void testGetItemCategory() {
        ItemCategoryModel category = new ItemCategoryModel("1", "Category 1");
        when(itemCategoryRepository.findById("1")).thenReturn(Optional.of(category));
        ItemCategoryModel result = itemCategoryController.getItemCategory("1");
        assertEquals(category, result);
    }

    @PostMapping("/categories")
    public ResponseEntity<ItemCategoryModel> saveItemCategory(@RequestBody ItemCategoryModel categoryModel) {
        ItemCategoryModel savedItem = itemCategoryRepository.save(categoryModel);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedItem.getId())
                .toUri();
        return ResponseEntity.created(uri).body(savedItem);
    }

    @Test
    void testUpdateItemCategory() {
        ItemCategoryModel category = new ItemCategoryModel("1", "Category 1");
        when(itemCategoryRepository.findById("1")).thenReturn(Optional.of(category));

        ItemCategoryModel updatedCategory = new ItemCategoryModel("1", "Updated Category");
        when(itemCategoryRepository.save(any())).thenReturn(updatedCategory);

        ResponseEntity<ItemCategoryModel> responseEntity = itemCategoryController.updateItemCategory("1", updatedCategory);
        assertEquals(updatedCategory, responseEntity.getBody());
    }

    @Test
    void testDeleteItemCategory() {
        doNothing().when(itemRepository).deleteAllByCategoryId("1");
        doNothing().when(itemCategoryRepository).deleteById("1");
        ResponseEntity<String> responseEntity = itemCategoryController.deleteItemCategory("1");
        assertEquals("1", responseEntity.getBody());
    }
}
