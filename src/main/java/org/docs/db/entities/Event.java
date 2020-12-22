package org.docs.db.entities;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name="events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(mappedBy = "events")
    private Set<Doc> docs;

    @ManyToMany(cascade = { CascadeType.MERGE })
    @JoinTable(
        name = "event_users",
        joinColumns = { @JoinColumn(name = "event_id", nullable = false) },
        inverseJoinColumns = { @JoinColumn(name = "user_id", nullable = false) }
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
    
    public Date getEventDay(String key) {
        Iterator<EventDay> iterator = this.getEventDays().stream().filter(e -> e.getDay().getKey().equals(key)).iterator();
        return iterator.hasNext() ? iterator.next().getDate() : null;
    }
}
