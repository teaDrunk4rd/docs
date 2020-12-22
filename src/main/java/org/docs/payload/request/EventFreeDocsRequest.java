package org.docs.payload.request;

import java.util.List;

public class EventFreeDocsRequest {
    private List<Integer> docIds;

    public EventFreeDocsRequest() {
    }

    public EventFreeDocsRequest(List<Integer> eventIds) {
        this.docIds = eventIds;
    }

    public List<Integer> getDocIds() {
        return docIds;
    }

    public void setDocIds(List<Integer> docIds) {
        this.docIds = docIds;
    }
}
