package org.docs.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "days")
public class Day {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String key;

    @JsonIgnore
    @OneToMany(mappedBy="day")
    Set<EventDay> eventDays = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy="day")
    Set<Doc> docs = new HashSet<>();

    public Day() {
    }

    public Day(String name, String key) {
        this.name = name;
        this.key = key;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
