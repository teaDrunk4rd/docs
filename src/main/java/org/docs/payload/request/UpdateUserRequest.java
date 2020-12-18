package org.docs.payload.request;

import org.docs.db.entities.User;
import org.docs.db.repos.RoleRepo;
import org.docs.db.repos.UserRepo;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UpdateUserRequest {
    private Integer id;
    @NotBlank(message = "Заполните email")
    @Email(message = "Неверно введён email")
    private String email;
    @NotBlank(message = "Заполните имя")
    private String firstName;
    @NotBlank(message = "Заполните фамилию")
    private String lastName;
    @NotNull(message = "Заполните роль")
    private Integer roleId;
    private String country;
    private String about;
    private String pin;
    private boolean isConfirmed;

    public UpdateUserRequest() {
    }

    public UpdateUserRequest(Integer id, @NotBlank(message = "Заполните email") @Email(message = "Неверно введён email") String email, @NotBlank(message = "Заполните имя") String firstName, @NotBlank(message = "Заполните фамилию") String lastName, @NotNull(message = "Заполните роль") Integer roleId, String country, String about, String PIN, boolean isConfirmed) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.country = country;
        this.about = about;
        this.pin = PIN;
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

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public boolean getConfirmed() {
        return isConfirmed;
    }

    public void setConfirmed(boolean confirmed) {
        isConfirmed = confirmed;
    }

    public String validate(UserRepo userRepo, RoleRepo roleRepo, User user) {
        if (userRepo.findByEmail(this.getEmail()) != null && !user.getEmail().equals(this.getEmail()))
            return "Пользователь с таким email уже существует";
        else if (roleRepo.findById(this.getRoleId()).orElse(null) == null)
            return "Данной роли не существует";

        return null;
    }
}
