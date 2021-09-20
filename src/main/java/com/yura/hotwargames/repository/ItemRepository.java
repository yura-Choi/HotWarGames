package com.yura.hotwargames.repository;

import com.yura.hotwargames.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}
