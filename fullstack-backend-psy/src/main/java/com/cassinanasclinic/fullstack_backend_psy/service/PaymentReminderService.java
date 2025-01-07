package com.cassinanasclinic.fullstack_backend_psy.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;
import com.cassinanasclinic.fullstack_backend_psy.model.Session;
import com.cassinanasclinic.fullstack_backend_psy.repository.PacientRepository;
import com.cassinanasclinic.fullstack_backend_psy.repository.SessionRepository;

@Service
public class PaymentReminderService {

    @Autowired
    private PacientRepository pacientRepository;

    @Autowired
    private EmailService emailService;

    //@Scheduled(cron = "0 0 8 1 * ?") // Runs every day at 8 AM
    public void sendPaymentReminders() {
        LocalDateTime fourWeeksAgo = LocalDateTime.now().minusWeeks(4);
        List<Pacient> unpaidPacients = pacientRepository.findPatientsWithUnpaidSessionsOlderThan(fourWeeksAgo);

        for (Pacient pacient : unpaidPacients) {
            String emailBody = String.format(" %s, \n\n Você tem sessões não pagas no valor de %f. "
            		+ "Favor quita-las o quanto antes.\n\nObrigado.", 
                                              pacient.getName(), pacient.getOwedValue());

            emailService.sendEmail(pacient.getEmail(), "Payment Reminder", emailBody);
        }
    }
}
