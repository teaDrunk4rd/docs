package org.docs.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsGetter {
    public UserDetailsImpl getUserDetails() {
        return ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }
}
