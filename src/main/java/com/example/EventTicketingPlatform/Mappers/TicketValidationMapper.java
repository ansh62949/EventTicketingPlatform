package com.example.EventTicketingPlatform.Mappers;

import com.example.EventTicketingPlatform.domain.Entities.TicketValidation;
import com.example.EventTicketingPlatform.domain.dtos.TicketValidationResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TicketValidationMapper {
    @Mapping(target = "ticketId", source = "ticket.id")
    TicketValidationResponseDto toTicketValidationResponseDto(TicketValidation ticketValidation);
}