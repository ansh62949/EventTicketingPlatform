package com.example.EventTicketingPlatform.Config;

import com.example.EventTicketingPlatform.Repositories.EventRepository;
import com.example.EventTicketingPlatform.Repositories.UserRepository;
import com.example.EventTicketingPlatform.domain.Entities.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        User organizer = userRepository.findByEmail("organizer@eventix.com").orElse(null);
        
        if (organizer == null) {
            organizer = new User();
            organizer.setName("Cinematic Events");
            organizer.setEmail("organizer@eventix.com");
            organizer.setPassword(passwordEncoder.encode("password"));
            organizer.setRole(UserRole.ORGANIZER);
            organizer.setCreatedAt(LocalDateTime.now());
            organizer.setUpdatedAt(LocalDateTime.now());
            organizer = userRepository.save(organizer);
            System.out.println(">> Default Organizer Created");
        }

        // Seed events if they don't exist
        seedEvent(organizer, "Midnight City Festival 2026", "Join us for a night of music and visual arts.", "Downtown Arena, Los Angeles", 2, "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop", 45.0);
        seedEvent(organizer, "Neon Rave: Ultraviolet", "Immersive electronic music experience.", "The Warehouse, Brooklyn", 1, "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop", 65.0);
        seedEvent(organizer, "Grand Orchestral Gala", "Sophisticated evening of classical masterpieces.", "The Opera House, Vienna", 3, "https://images.unsplash.com/photo-1514320296841-2e4971ba7541?q=80&w=2070&auto=format&fit=crop", 150.0);
        seedEvent(organizer, "CyberTech Expo 2026", "Explore the future of AI and robotics.", "Exhibition Center, Singapore", 4, "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", 299.0);
    }

    private void seedEvent(User organizer, String name, String desc, String venue, int monthsAhead, String imageUrl, double price) {
        if (eventRepository.findByName(name).isEmpty()) {
            Event event = new Event();
            event.setName(name);
            event.setDescription(desc);
            event.setVenue(venue);
            event.setStart(LocalDateTime.now().plusMonths(monthsAhead));
            event.setEnd(LocalDateTime.now().plusMonths(monthsAhead).plusHours(6));
            event.setSalesStart(LocalDateTime.now().minusDays(1));
            event.setSalesEnd(LocalDateTime.now().plusMonths(monthsAhead));
            event.setStatus(EventStatuEnum.PUBLISHED);
            event.setOrganizer(organizer);
            event.setImageUrl(imageUrl);
            event.setCreatedAt(LocalDateTime.now());
            event.setUpdatedAt(LocalDateTime.now());

            List<TicketType> tt = new ArrayList<>();
            TicketType standard = new TicketType();
            standard.setName("Standard Access");
            standard.setPrice(price);
            standard.setTotalAvailable(1000);
            standard.setEvent(event);
            standard.setCreatedAt(LocalDateTime.now());
            standard.setUpdatedAt(LocalDateTime.now());
            tt.add(standard);
            event.setTicketTypes(tt);
            
            eventRepository.save(event);
            System.out.println(">> Seeded Event: " + name);
        }
    }
}
