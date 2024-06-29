package com.ojt.studentManagementWithReact.project_react_student.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

@Configuration
public class CloudConfig {

    @Bean
    public Cloudinary cloudinary() {
        var map = new HashMap<String, String>();
        String CLOUD_NAME = "dws6icl91";
        map.put("cloud_name", CLOUD_NAME);
        String API_KEY = "861442768946264";
        map.put("api_key", API_KEY);
        String API_SECRET = "64TznD35NYGem1UsVLxz4GD5e88";
        map.put("api_secret", API_SECRET);
        return new Cloudinary(map);
    }
}
