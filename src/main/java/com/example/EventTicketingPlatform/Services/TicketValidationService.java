package com.example.EventTicketingPlatform.Services;

import com.example.EventTicketingPlatform.domain.Entities.TicketValidation;

import java.util.UUID;
public interface TicketValidationService {
    TicketValidation validateTicketByQrCode(UUID qrCodeId);
    TicketValidation validateTicketManually(UUID ticketId);
}

