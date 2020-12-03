package org.docs.db.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="files")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy="avatar")
    Set<User> users;

    @OneToMany(mappedBy="avatar")
    Set<Event> events;

    public File() {
    }

    public File(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
