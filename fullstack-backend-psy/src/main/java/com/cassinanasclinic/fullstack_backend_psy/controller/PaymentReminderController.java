package com.cassinanasclinic.fullstack_backend_psy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cassinanasclinic.fullstack_backend_psy.service.PaymentReminderService;

@RestController // Use RestController to return responses directly
public class PaymentReminderController {

    @Autowired
    private PaymentReminderService paymentReminderService;

    @GetMapping("/trigger-payment-reminder")
    public String sendPaymentReminder() {
        paymentReminderService.sendPaymentReminders();
        return "Payment reminders have been triggered.";
    }
}
