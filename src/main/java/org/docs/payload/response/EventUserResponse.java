package org.docs.payload.response;

public class EventUserResponse {
    private Integer id;
    private String user;
    private String role;

    public EventUserResponse() {
    }

    public EventUserResponse(Integer id, String user, String role) {
        this.id = id;
        this.user = user;
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
