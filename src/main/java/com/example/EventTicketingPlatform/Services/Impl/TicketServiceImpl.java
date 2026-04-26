package com.example.EventTicketingPlatform.Services.Impl;

import com.example.EventTicketingPlatform.Repositories.TicketRepository;
import com.example.EventTicketingPlatform.Repositories.TicketTypeRepository;
import com.example.EventTicketingPlatform.Repositories.UserRepository;
import com.example.EventTicketingPlatform.Services.TicketService;
import com.example.EventTicketingPlatform.domain.Entities.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final com.example.EventTicketingPlatform.Services.QrCodeService qrCodeService;

    @Override
    public Page<Ticket> listTicketsForUser(UUID userId, Pageable pageable) {
        return ticketRepository.findByPurchaserId(userId, pageable);
    }

    @Override
    public Optional<Ticket> getTicketForUser(UUID userId, UUID ticketId) {
        return ticketRepository.findByIdAndPurchaserId(ticketId, userId);
    }

    @Override
    @Transactional
    public void bookTicket(UUID userId, UUID ticketTypeId, int quantity) {
        User purchaser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        TicketType ticketType = ticketTypeRepository.findById(ticketTypeId)
                .orElseThrow(() -> new RuntimeException("Ticket Type not found"));

        for (int i = 0; i < quantity; i++) {
            Ticket ticket = new Ticket();
            ticket.setPurchaser(purchaser);
            ticket.setTicketType(ticketType);
            ticket.setStatus(TicketStatusEnum.PURCHASED);
            ticket.setCreatedAt(LocalDateTime.now());
            ticket.setUpdatedAt(LocalDateTime.now());
            Ticket savedTicket = ticketRepository.save(ticket);
            
            // Generate QR Code for the ticket
            qrCodeService.generateQrCode(savedTicket);
        }
    }
}
