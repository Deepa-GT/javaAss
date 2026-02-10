package com.example.itemmanagement.service;

import com.example.itemmanagement.model.Item;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ItemService {
    private final List<Item> items = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public ItemService() {
        initializeSampleData();
    }

    private void initializeSampleData() {
        items.add(new Item(idCounter.getAndIncrement(), "Laptop", "High-performance laptop for work and gaming", 999.99, "Electronics", 50));
        items.add(new Item(idCounter.getAndIncrement(), "Coffee Mug", "Ceramic coffee mug with handle", 12.99, "Kitchen", 200));
        items.add(new Item(idCounter.getAndIncrement(), "Wireless Mouse", "Ergonomic wireless mouse with USB receiver", 29.99, "Electronics", 75));
    }

    public List<Item> getAllItems() {
        return new ArrayList<>(items);
    }

    public Optional<Item> getItemById(Long id) {
        return items.stream()
                .filter(item -> item.getId().equals(id))
                .findFirst();
    }

    public Item addItem(Item item) {
        item.setId(idCounter.getAndIncrement());
        items.add(item);
        return item;
    }

    public Optional<Item> updateItem(Long id, Item updatedItem) {
        for (int i = 0; i < items.size(); i++) {
            Item item = items.get(i);
            if (item.getId().equals(id)) {
                updatedItem.setId(id);
                items.set(i, updatedItem);
                return Optional.of(updatedItem);
            }
        }
        return Optional.empty();
    }

    public boolean deleteItem(Long id) {
        return items.removeIf(item -> item.getId().equals(id));
    }

    public List<Item> getItemsByCategory(String category) {
        return items.stream()
                .filter(item -> item.getCategory().equalsIgnoreCase(category))
                .toList();
    }

    public List<Item> getItemsByName(String name) {
        return items.stream()
                .filter(item -> item.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
    }
}