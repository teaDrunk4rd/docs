package org.docs.payload.request;

import java.util.List;

public class IdsRequest {
    private List<Integer> ids;

    public IdsRequest() {
    }

    public IdsRequest(List<Integer> eventIds) {
        this.ids = eventIds;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }
}
