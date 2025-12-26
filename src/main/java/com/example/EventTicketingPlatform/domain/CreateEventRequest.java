package com.example.EventTicketingPlatform.domain;



import com.example.EventTicketingPlatform.domain.Entities.EventStatuEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateEventRequest {

    private String name;
    private LocalDateTime start;
    private LocalDateTime end;
    private String venue;
    private LocalDateTime salesStart;
    private LocalDateTime salesEnd;
    private EventStatuEnum status;   // ✅ fixed name
    private List<CreateTicketTypeRequest> ticketTypes = new ArrayList<>();
}

