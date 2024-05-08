package com.mycompany.obitemservice;

import com.mycompany.obitemservice.controller.ItemController;
import com.mycompany.obitemservice.model.ItemModel;
import com.mycompany.obitemservice.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ItemControllerTest {

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ItemController itemController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetItem() {
        ItemModel item = new ItemModel("1", "Item 1", "Description 1", 10.0, "category1");
        when(itemRepository.findById("1")).thenReturn(Optional.of(item));
        ItemModel retrievedItem = itemController.getItem("1");
        assertEquals(item, retrievedItem);
    }

    @Test
    void testUpdateItem() {
        ItemModel item = new ItemModel("1", "Item 1", "Description 1", 10.0, "category1");
        when(itemRepository.findById("1")).thenReturn(Optional.of(item));
        ItemModel updatedItem = new ItemModel("1", "Updated Item 1", "Updated Description 1", 15.0, "updatedCategory");
        when(itemRepository.save(updatedItem)).thenReturn(updatedItem);
        ItemModel result = itemController.updateItem("1", updatedItem).getBody();
        assertEquals(updatedItem, result);
    }

    @Test
    void testUpdateItemPrice() {
        ItemModel item = new ItemModel("1", "Item 1", "Description 1", 10.0, "category1");
        when(itemRepository.findById("1")).thenReturn(Optional.of(item));
        ItemModel updatedItem = new ItemModel("1", "Item 1", "Description 1", 15.0, "category1");
        when(itemRepository.save(updatedItem)).thenReturn(updatedItem);
        ItemModel result = itemController.updateItemPrice("1", updatedItem).getBody();
        assertEquals(updatedItem, result);
    }

    @Test
    void testDeleteItem() {
        doNothing().when(itemRepository).deleteById("1");
        itemController.deleteItem("1");
        verify(itemRepository, times(1)).deleteById("1");
    }
}