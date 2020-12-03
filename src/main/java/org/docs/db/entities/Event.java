package org.docs.db.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "AvatarId", nullable = true)
    private File avatar;

    @ManyToMany(mappedBy = "events")
    Set<Doc> docs = new HashSet<>();

    @ManyToMany(mappedBy = "events")
    Set<Doc> users = new HashSet<>();

    @OneToMany(mappedBy="event")
    Set<EventDay> eventDays;

    public Event() {
    }

    public Event(String name) {
        this.name = name;
    }

    public Event(String name, File avatar) {
        this.name = name;
        this.avatar = avatar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public File getAvatar() {
        return avatar;
    }

    public void setAvatar(File avatar) {
        this.avatar = avatar;
    }
}
