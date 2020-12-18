package org.docs.payload.response;

public class UsersResponse {
    private Integer id;
    private String email;
    private String fullName;
    private String role;
    private String country;
    private Boolean isConfirmed;

    public UsersResponse() {
    }

    public UsersResponse(Integer id, String email, String fullName, String role, String country, Boolean isConfirmed) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.country = country;
        this.isConfirmed = isConfirmed;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Boolean getConfirmed() {
        return isConfirmed;
    }

    public void setConfirmed(Boolean confirmed) {
        isConfirmed = confirmed;
    }
}
