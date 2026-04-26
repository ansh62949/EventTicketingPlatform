package com.example.EventTicketingPlatform.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookTicketRequest {
    private UUID ticketTypeId;
    private int quantity;
}
