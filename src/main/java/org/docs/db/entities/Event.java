package org.docs.db.entities;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    private Set<Doc> docs;

    @ManyToMany(cascade = { CascadeType.MERGE })
    @JoinTable(
        name = "event_users",
        joinColumns = { @JoinColumn(name = "event_id") },
        inverseJoinColumns = { @JoinColumn(name = "user_id") }
    )
    private Set<User> users;

    @OneToMany(mappedBy="event")
    private Set<EventDay> eventDays;

    public Event() {
    }

    public Event(String name) {
        this.name = name;
    }

    public Event(String name, Set<User> users) {
        this.name = name;
        this.users = users;
    }

    public String getDates() {
        SimpleDateFormat df = new SimpleDateFormat("dd.MM.yyyy");

        List<EventDay> eventDays = this.getEventDays().stream()
            .sorted(Comparator.comparing(EventDay::getDate))
            .collect(Collectors.toList());

        if (eventDays.size() > 1)
            return df.format(eventDays.get(0).getDate()) + "-" + df.format(eventDays.get(eventDays.size() - 1).getDate());
        else if (eventDays.size() == 1)
            return df.format(eventDays.get(0).getDate());

        return null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Set<Doc> getDocs() {
        return docs;
    }

    public void setDocs(Set<Doc> docs) {
        this.docs = docs;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<EventDay> getEventDays() {
        return eventDays;
    }

    public void setEventDays(Set<EventDay> eventDays) {
        this.eventDays = eventDays;
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
