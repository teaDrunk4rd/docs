package org.docs.payload.response;

import java.util.List;

public class DocFreeEventsRequest {
    private List<Integer> eventIds;

    public DocFreeEventsRequest() {
    }

    public DocFreeEventsRequest(List<Integer> eventIds) {
        this.eventIds = eventIds;
    }

    public List<Integer> getEventIds() {
        return eventIds;
    }

    public void setEventIds(List<Integer> eventIds) {
        this.eventIds = eventIds;
    }
}
