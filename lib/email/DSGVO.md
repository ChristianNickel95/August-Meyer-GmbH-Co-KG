# DSGVO-Konformität für E-Mail-Versand

## Übersicht

Für den E-Mail-Versand in Deutschland/EU ist DSGVO-Konformität wichtig. Hier eine Übersicht der Optionen:

## ✅ DSGVO-konforme Lösungen

### 1. Resend (Empfohlen) ⭐

**Kostenlos:** 3.000 E-Mails/Monat  
**DSGVO:** ✅ Vollständig konform (EU-Server)  
**Setup:** Einfach (API Key)

**Vorteile:**
- Server in EU (DSGVO-konform)
- Professionelle Zustellbarkeit
- Analytics und Logs
- Einfache Integration
- Kostenlos für kleine/mittlere Volumen

**Nachteile:**
- Domain-Verifizierung nötig (einfach über DNS)
- Ab 3.000 E-Mails/Monat kostenpflichtig

**Setup:**
1. Account auf https://resend.com erstellen
2. Domain verifizieren (DNS-Einträge)
3. API Key generieren
4. In `.env.local` eintragen

---

### 2. Eigener SMTP-Server (Hosting-Provider)

**Kostenlos:** Oft im Hosting-Paket enthalten  
**DSGVO:** ✅ Sehr gut (wenn Server in Deutschland/EU)  
**Setup:** Mittel (SMTP-Konfiguration)

**Vorteile:**
- Volle Kontrolle über Daten
- Keine Limits (je nach Provider)
- Professionell
- Daten bleiben in Deutschland/EU

**Nachteile:**
- Setup nötig
- Abhängig von Hosting-Provider

**Typische SMTP-Einstellungen (Beispiele):**
- **Strato:** `smtp.strato.de`, Port 587
- **1&1 IONOS:** `smtp.ionos.de`, Port 587
- **Hetzner:** `smtp.your-server.de`, Port 587
- **All-Inkl:** `smtp.all-inkl.com`, Port 587

---

### 3. SendGrid

**Kostenlos:** 100 E-Mails/Tag  
**DSGVO:** ✅ Konform (EU-Server möglich)  
**Setup:** Mittel

**Vorteile:**
- Etabliert und zuverlässig
- Gute Zustellbarkeit
- EU-Server verfügbar

**Nachteile:**
- Niedrigeres kostenloses Limit als Resend
- Setup etwas komplexer

---

### 4. Mailgun

**Kostenlos:** 5.000 E-Mails/Monat (nur 3 Monate)  
**DSGVO:** ✅ Konform (EU-Server möglich)  
**Setup:** Mittel

**Vorteile:**
- Hohes kostenloses Limit (zeitlich begrenzt)
- Professionell

**Nachteile:**
- Nach 3 Monaten kostenpflichtig
- Setup etwas komplexer

---

## ❌ Nicht DSGVO-konform

### Gmail/Outlook/Yahoo SMTP

**Problem:** Daten werden über US-Server geleitet (Schrems II Urteil)

**Warum problematisch:**
- US-Cloud Act erlaubt Zugriff auf Daten
- Keine ausreichenden Garantien für EU-Daten
- Risiko von Abmahnungen/DSGVO-Verstößen

**Empfehlung:** Nicht für Produktion verwenden, nur für Tests.

---

## Empfehlung für August Meyer

### Für Produktion:
1. **Hetzner SMTP** ⭐ (Hosting bei Hetzner - Daten bleiben in Deutschland, beste DSGVO-Konformität)
2. **Resend** (gute Balance aus Einfachheit, Kosten, DSGVO - EU-Server)
3. **SendGrid** (etabliert, viele Features, EU-Server)

### Für Entwicklung/Testing:
- Test-Modus (HTML-Dateien speichern)
- Oder Resend Test-Domain

---

## Rechtliche Hinweise

**Wichtig:**
- E-Mail-Versand muss in Datenschutzerklärung erwähnt werden
- Kunden müssen informiert werden, dass E-Mails versendet werden
- Opt-in für Marketing-E-Mails (nicht für Bestätigungs-E-Mails nötig)
- Datenverarbeitung dokumentieren

**Beispiel für Datenschutzerklärung:**
> "Bei Anfragen über unser Kontaktformular versenden wir automatisch Bestätigungs-E-Mails. Diese werden über [Provider] versendet, dessen Server sich in der EU befinden und DSGVO-konform sind."

---

## Migration zwischen Anbietern

Das System unterstützt automatisch:
1. SMTP (wenn `SMTP_SERVICE` oder `SMTP_HOST` gesetzt)
2. Resend (wenn `RESEND_API_KEY` gesetzt)
3. Test-Modus (wenn nichts gesetzt)

Wechsel einfach durch Änderung der ENV-Variablen möglich.

