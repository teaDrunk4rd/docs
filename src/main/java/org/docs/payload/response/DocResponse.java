package org.docs.payload.response;

import org.docs.db.entities.Day;
import org.docs.db.entities.Role;

public class DocResponse {
    private String name;
    private Day day;
    private String content;
    private Role role;

    public DocResponse() {
    }

    public DocResponse(String name, Day day, String content, Role role) {
        this.name = name;
        this.day = day;
        this.content = content;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Day getDay() {
        return day;
    }

    public void setDay(Day day) {
        this.day = day;
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
}
