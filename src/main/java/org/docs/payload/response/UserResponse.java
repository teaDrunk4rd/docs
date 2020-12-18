package org.docs.payload.response;

public class UserResponse {
    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private Integer roleId;
    private String country;
    private String about;
    private String PIN;
    private Boolean isConfirmed;

    public UserResponse() {
    }

    public UserResponse(Integer id, String email, String firstName, String lastName, Integer roleId, String country, String about, String PIN, Boolean isConfirmed) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.country = country;
        this.about = about;
        this.PIN = PIN;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getPIN() {
        return PIN;
    }

    public void setPIN(String PIN) {
        this.PIN = PIN;
    }

    public Boolean getConfirmed() {
        return isConfirmed;
    }

    public void setConfirmed(Boolean confirmed) {
        isConfirmed = confirmed;
    }
}
