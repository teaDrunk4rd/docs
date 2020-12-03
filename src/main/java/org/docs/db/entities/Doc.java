package org.docs.db.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="docs")
public class Doc {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "RoleId", nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "DayId", nullable = false)
    private Day day;

    @Column(nullable = true)
    private String PIN;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean isSigned = false;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
        name = "event_docs",
        joinColumns = { @JoinColumn(name = "doc_id") },
        inverseJoinColumns = { @JoinColumn(name = "event_id") }
    )
    Set<Event> events = new HashSet<>();

    public Doc() {
    }

    public Doc(String name, String content, Role role, Day day) {
        this.name = name;
        this.content = content;
        this.role = role;
        this.day = day;
    }

    public Doc(String name, String content, Role role, Day day, Set<Event> events) {
        this.name = name;
        this.content = content;
        this.role = role;
        this.day = day;
        this.events = events;
    }

    public Doc(String name, String content, Role role, Day day, String PIN, Boolean isSigned) {
        this.name = name;
        this.content = content;
        this.role = role;
        this.day = day;
        this.PIN = PIN;
        this.isSigned = isSigned;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Day getDay() {
        return day;
    }

    public void setDay(Day day) {
        this.day = day;
    }

    public String getPIN() {
        return PIN;
    }

    public void setPIN(String PIN) {
        this.PIN = PIN;
    }

    public Boolean getSigned() {
        return isSigned;
    }

    public void setSigned(Boolean signed) {
        isSigned = signed;
    }
}
