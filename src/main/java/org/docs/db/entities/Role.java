package org.docs.db.entities;

import org.docs.db.ERole;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String key;

    @OneToMany(mappedBy = "role")
    Set<User> users;

    @OneToMany(mappedBy = "role")
    Set<Doc> docs;

    private static HashMap<String, ERole> ERoles = new HashMap<String, ERole>() {{
        put("admin", ERole.ROLE_ADMIN);
        put("expert", ERole.ROLE_EXPERT);
        put("listener", ERole.ROLE_LISTENER);
    }};

    public Role() {
    }

    public Role(String name, String key) {
        this.name = name;
        this.key = key;
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

    public ERole getERole() {
        return ERoles.get(this.key);
    }
}
