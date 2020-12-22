package org.docs.payload.request;

import java.util.List;

public class UserFreeEventsRequest {
    private List<Integer> eventIds;

    public UserFreeEventsRequest() {
    }

    public UserFreeEventsRequest(List<Integer> eventIds) {
        this.eventIds = eventIds;
    }

    public List<Integer> getEventIds() {
        return eventIds;
    }

    public void setEventIds(List<Integer> eventIds) {
        this.eventIds = eventIds;
    }
}
