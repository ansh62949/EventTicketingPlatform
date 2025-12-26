package com.example.EventTicketingPlatform.Services;

import com.example.EventTicketingPlatform.domain.Entities.QrCode;
import com.example.EventTicketingPlatform.domain.Entities.Ticket;

import java.util.UUID;

public interface QrCodeService {
    QrCode generateQrCode(Ticket ticket);

    byte[] getQrcodeImageForUserAndTicket(UUID userId,UUID ticketId);
}
