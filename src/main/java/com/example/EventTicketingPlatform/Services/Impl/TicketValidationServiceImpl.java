package com.example.EventTicketingPlatform.Services.Impl;

import com.example.EventTicketingPlatform.Exceptions.QrCodeNotFoundException;
import com.example.EventTicketingPlatform.Exceptions.TicketNotFoundException;
import com.example.EventTicketingPlatform.Exceptions.TicketSoldOutException;
import com.example.EventTicketingPlatform.Repositories.QrCodeRepository;
import com.example.EventTicketingPlatform.Repositories.TicketRepository;
import com.example.EventTicketingPlatform.Repositories.TicketValidationRepository;
import com.example.EventTicketingPlatform.Services.TicketValidationService;
import com.example.EventTicketingPlatform.domain.Entities.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.UUID;


@Service
@RequiredArgsConstructor
@Transactional
public class TicketValidationServiceImpl  implements TicketValidationService {


    private final QrCodeRepository qrCodeRepository;
    private final TicketValidationRepository ticketValidationRepository;
    private  final TicketRepository ticketRepository;
    @Override
    public TicketValidation validateTicketByQrCode(UUID qrCodeId) {

       QrCode qrcode = qrCodeRepository.findById(qrCodeId)
                .orElseThrow (() -> new QrCodeNotFoundException(
                       String.format("QR code with ID %s was not found",qrCodeId
                       )
        ));

        Ticket ticket = qrcode.getTicket();
        return ValidateTicket(ticket);

    }

    private TicketValidation ValidateTicket(Ticket ticket) {
        TicketValidation ticketValidation = new TicketValidation();
        ticketValidation.setTicket(ticket);
        ticketValidation.setValidationMethod(TicketValidationMethod.QR_SCAN);

        TicketValidationStatusEnum ticketvalidationStatus= ticket.getValidations().stream()
                .filter( v-> TicketValidationStatusEnum.VALID.equals(v.getStatus()))
                .findFirst()
                .map(v-> TicketValidationStatusEnum.INVALID)
                .orElse(TicketValidationStatusEnum.VALID);

        ticketValidation.setStatus(ticketvalidationStatus);

        return ticketValidationRepository.save(ticketValidation);
    }

    @Override
    public TicketValidation validateTicketManually(UUID ticketId) {
      Ticket ticket = ticketRepository.findById(ticketId)
              .orElseThrow(TicketNotFoundException::new);
      return  ValidateTicket(ticket );
    }
}
