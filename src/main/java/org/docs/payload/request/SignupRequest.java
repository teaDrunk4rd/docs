package org.docs.payload.request;

import org.docs.db.repos.UserRepo;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class SignupRequest {
    @NotBlank(message = "Заполните email")
    @Email(message = "Неверно введён email")
    private String email;
    @NotBlank(message = "Заполните имя")
    private String firstName;
    @NotBlank(message = "Заполните фамилию")
    private String lastName;

    private String country;
    @NotBlank(message = "Заполните пароль")
    private String password;
    @NotBlank(message = "Заполните подтверждение пароля")
    private String passwordConfirmation;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }

    public String validate(UserRepo userRepo) {
        if (userRepo.findByEmail(this.getEmail()) != null)
            return "Пользователь с таким email уже существует";
        else if (!this.getPassword().equals(this.getPasswordConfirmation()))
            return "Пароль и подтверждение пароля должны совпадать";

        return null;
    }
}
