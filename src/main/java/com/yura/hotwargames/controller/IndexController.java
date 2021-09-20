package com.yura.hotwargames.controller;

import com.yura.hotwargames.service.IndexService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;

@Controller
@Slf4j
public class IndexController {
    @Autowired
    private IndexService indexService;

    @GetMapping("/")
    public ModelAndView index(){
        ModelAndView modelAndView = new ModelAndView("index");
        return modelAndView;
    }

    @GetMapping("/list")
    @ResponseBody
    public String getList(){
        try {
            return indexService.getIndexList();
        } catch(Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @PostMapping("/")
    @ResponseBody
    public int addItem(@RequestBody Map<String, Object> item){
        try {
            return indexService.addItem(Integer.parseInt(String.valueOf(item.get("type"))), (String)item.get("title"), (String)item.get("review"), (String)item.get("url"));
        } catch (Exception e) {
            e.printStackTrace();
            return 1;
        }
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public int deleteItem(@PathVariable int id){
        try {
            return indexService.deleteItem(Integer.parseInt(String.valueOf(id)));
        } catch (Exception e){
            e.printStackTrace();
            return 1;
        }
    }

    @PatchMapping("/{id}")
    @ResponseBody
    public int updateItem(@PathVariable int id, @RequestBody Map<String, Object> item){
        try {
            return indexService.updateItem(id, Integer.parseInt(String.valueOf(item.get("type"))), (String)item.get("title"), (String)item.get("review"), (String)item.get("url"));
        } catch(Exception e){
            e.printStackTrace();
            return 1;
        }
    }
}
