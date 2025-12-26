package com.example.EventTicketingPlatform.Services.Impl;

import com.example.EventTicketingPlatform.Exceptions.TicketSoldOutException;
import com.example.EventTicketingPlatform.Exceptions.TicketTypeNotFoundException;
import com.example.EventTicketingPlatform.Exceptions.UserNotFoundException;
import com.example.EventTicketingPlatform.Repositories.TicketRepository;
import com.example.EventTicketingPlatform.Repositories.TicketTypeRepository;
import com.example.EventTicketingPlatform.Repositories.UserRepository;
import com.example.EventTicketingPlatform.Services.QrCodeService;
import com.example.EventTicketingPlatform.Services.TicketTypeService;
import com.example.EventTicketingPlatform.domain.Entities.Ticket;
import com.example.EventTicketingPlatform.domain.Entities.TicketStatusEnum;
import com.example.EventTicketingPlatform.domain.Entities.TicketType;
import com.example.EventTicketingPlatform.domain.Entities.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketTypeServiceImpl implements TicketTypeService {
    private final UserRepository userRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final  TicketRepository ticketRepository;
    private final QrCodeService qrCodeService;

    @Override
    @Transactional
    public Ticket purchaseTicket(UUID userId, UUID ticketTypeId) {
// Look up the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(
                        String.format("User with ID %s was not found", userId)
                ));
// Get ticket type with pessimistic lock
        TicketType ticketType = ticketTypeRepository.findByIdWithLock(ticketTypeId)
                .orElseThrow(() -> new TicketTypeNotFoundException(
                        String.format("Ticket type with ID %s was not found", ticketTypeId)
                ));
// Check ticket availability
        int purchasedTickets = ticketRepository.countByTicketTypeId(ticketType.getId());
        Integer totalAvailable = ticketType.getTotalAvailable();
        if (purchasedTickets + 1 > totalAvailable) {
            throw new TicketSoldOutException();
        }
// Create new ticket
        Ticket ticket = new Ticket();
        ticket.setStatus(TicketStatusEnum.PURCHASED);
        ticket.setTicketType(ticketType);
        ticket.setPurchaser(user);
        // Save and generate QR code
        Ticket savedTicket = ticketRepository.save(ticket);
        qrCodeService.generateQrCode(savedTicket);
        return ticketRepository.save(savedTicket);
    }
}