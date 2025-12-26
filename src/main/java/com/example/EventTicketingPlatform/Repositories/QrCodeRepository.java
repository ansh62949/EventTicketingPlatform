package com.example.EventTicketingPlatform.Repositories;

import com.example.EventTicketingPlatform.domain.Entities.QrCode;
import com.example.EventTicketingPlatform.domain.Entities.QrCodeStatusEnum;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



import java.util.UUID;


@Repository
public interface QrCodeRepository extends JpaRepository<QrCode, UUID> {
    Optional<QrCode> findByTicketIdAndTicketPurchaserId(UUID ticketId, UUID ticketPurchaseId);

//    Optional<QrCode> findByIdAndStatus(UUID id, QrCodeStatusEnum status);

    Optional<QrCode> findByIdAndStatus(UUID Id, QrCodeStatusEnum status);
}