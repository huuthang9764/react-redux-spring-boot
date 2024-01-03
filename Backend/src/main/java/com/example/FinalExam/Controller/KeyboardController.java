package com.example.FinalExam.Controller;

import com.example.FinalExam.Entity.Keyboard.Keyboard;
import com.example.FinalExam.Form.Keyboard.KeyboardCreateForm;
import com.example.FinalExam.Form.Keyboard.KeyboardFillerForm;
import com.example.FinalExam.Form.Keyboard.KeyboardUpdateForm;
import com.example.FinalExam.Service.Keyboard.IKeyboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "api/v1/keyboard")
@Validated
@CrossOrigin(origins = "*")

public class KeyboardController {
    @Autowired
    private IKeyboardService service;

    @GetMapping()
    public Page<Keyboard> getAllKeyboard(
            Pageable pageable,
            @RequestParam (value = "search", required = false) String search,
            KeyboardFillerForm form){
        return service.getAllKeyboard(pageable, search, form);

    }
@PostMapping()
public ResponseEntity<String> createKeyboard(@RequestBody @Valid KeyboardCreateForm form) {
    try {
        service.createKeyboard(form);
        return ResponseEntity.ok("Keyboard created successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create keyboard");
    }
}
    @PutMapping("/{id}")
    public ResponseEntity<String> updateKeyboard(@PathVariable(name = "id") int id, @RequestBody @Valid KeyboardUpdateForm form) {
        try {
            form.setId(id);
            service.updateKeyboard(form);
            return ResponseEntity.ok("Keyboard updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update keyboard");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteKeyboard(@PathVariable(name = "id") int id) {
        try {
            service.deleteKeyboard(id);
            return ResponseEntity.ok("Keyboard deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete keyboard");
        }
    }
}
