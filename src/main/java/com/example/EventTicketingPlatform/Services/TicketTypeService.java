package com.example.EventTicketingPlatform.Services;

import com.example.EventTicketingPlatform.domain.Entities.Ticket;

import java.util.UUID;

public interface TicketTypeService {
    Ticket purchaseTicket(UUID userId , UUID ticketTypeId);
}
