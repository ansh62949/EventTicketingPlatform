package com.example.EventTicketingPlatform.Controllers;

import com.example.EventTicketingPlatform.Mappers.TicketMapper;
import com.example.EventTicketingPlatform.Services.QrCodeService;
import com.example.EventTicketingPlatform.Services.TicketService;
import com.example.EventTicketingPlatform.domain.dtos.BookTicketRequest;
import com.example.EventTicketingPlatform.domain.dtos.GetTicketResponseDto;
import com.example.EventTicketingPlatform.domain.dtos.ListTicketResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static util.JwtUtil.parserUserId;

@RestController
@RequestMapping(path = "/api/v1/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;
    private final TicketMapper ticketMapper;
    private final QrCodeService qrCodeService;

    // List tickets for the authenticated user
    @GetMapping("/my-tickets")
    public Page<ListTicketResponseDto> listTickets(
            @AuthenticationPrincipal Jwt jwt,
            Pageable pageable
    ) {
        UUID userId = parserUserId(jwt);
        return ticketService.listTicketsForUser(userId, pageable)
                .map(ticketMapper::toListTicketResponseDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void purchaseTicket(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody BookTicketRequest request
    ) {
        UUID userId = parserUserId(jwt);
        ticketService.bookTicket(userId, request.getTicketTypeId(), request.getQuantity());
    }

    // Get details of a specific ticket
    @GetMapping(path = "/{ticketId:[0-9a-fA-F\\-]{36}}")
    public ResponseEntity<GetTicketResponseDto> getTicket(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID ticketId
    ) {
        UUID userId = parserUserId(jwt);
        return ticketService.getTicketForUser(userId, ticketId)
                .map(ticketMapper::toGetTicketResponseDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get QR code image for a ticket
    @GetMapping(path = "/{ticketId:[0-9a-fA-F\\-]{36}}/qr-codes")
    public ResponseEntity<byte[]> getTicketQrCode(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID ticketId
    ) {
        UUID userId = parserUserId(jwt);
        byte[] qrCodeImage = qrCodeService.getQrcodeImageForUserAndTicket(userId, ticketId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentLength(qrCodeImage.length);

        return ResponseEntity.ok()
                .headers(headers)
                .body(qrCodeImage);
    }
}
