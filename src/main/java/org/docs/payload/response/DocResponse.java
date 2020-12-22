package org.docs.payload.response;

import org.docs.db.entities.Day;
import org.docs.db.entities.Role;

public class DocResponse {
    private String name;
    private Day day;
    private String content;
    private Role role;
    private Boolean isSigned;
    private String pin;

    public DocResponse() {
    }

    public DocResponse(String name, Day day, String content, Role role, Boolean isSigned, String pin) {
        this.name = name;
        this.day = day;
        this.content = content;
        this.role = role;
        this.isSigned = isSigned;
        this.pin = pin;
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

    public Boolean getSigned() {
        return isSigned;
    }

    public void setSigned(Boolean signed) {
        isSigned = signed;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}
