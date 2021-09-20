package com.yura.hotwargames.service;

import com.yura.hotwargames.model.Item;
import com.yura.hotwargames.repository.ItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class IndexService {
    @Autowired
    private ItemRepository itemRepository;

    public String getIndexList(){
        JSONArray jsonArray = new JSONArray();
        try {
            itemRepository.findAll().forEach(e -> {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", e.getId());
                jsonObject.put("type", e.getType());
                jsonObject.put("title", e.getTitle());
                jsonObject.put("review", e.getReview());
                jsonObject.put("url", e.getUrl());
                jsonArray.add(jsonObject);
            });
        } catch (Exception e){
            e.printStackTrace();
        }
        return jsonArray.toString();
    }

    public int addItem(int type, String title, String review, String url){
        try {
            Item item = new Item();
            item.setType(type);
            item.setTitle(title);
            item.setReview(review);
            item.setUrl(url);
            itemRepository.save(item);
            return 0;
        } catch (Exception e){
            e.printStackTrace();
            return 1;
        }
    }

    public int deleteItem(int id){
        try {
            itemRepository.deleteById(id);
            return 0;
        } catch (Exception e){
            e.printStackTrace();
            return 1;
        }
    }

    public int updateItem(int id, int type, String title, String review, String url){
        try {
            Item item = new Item();
            item.setId(id);
            item.setType(type);
            item.setTitle(title);
            item.setReview(review);
            item.setUrl(url);
            itemRepository.save(item);
            return 0;
        } catch (Exception e){
            e.printStackTrace();
            return 1;
        }
    }
}
