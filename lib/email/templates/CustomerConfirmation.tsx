import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface CustomerConfirmationProps {
  name: string;
  productName: string;
  cartItems?: Array<{
    categoryName: string;
    quantity: string;
    unit: string | null;
    articleNumber?: string;
  }>;
  message?: string;
  siteUrl: string;
}

export function CustomerConfirmation({
  name,
  productName,
  cartItems = [],
  message,
  siteUrl,
}: CustomerConfirmationProps) {
  const hasCartItems = cartItems && cartItems.length > 0;

  return (
    <Html>
      <Head />
      <Preview>Ihre Anfrage bei August Meyer – Bestätigung</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>August Meyer</Heading>
            <Text style={headerSubtext}>GmbH & Co. KG</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Vielen Dank für Ihre Anfrage!</Heading>
            
            <Text style={text}>
              Sehr geehrte/r {name},
            </Text>
            
            <Text style={text}>
              wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
            </Text>

            {/* Request Summary */}
            <Section style={summaryBox}>
              <Heading style={h3}>Zusammenfassung Ihrer Anfrage</Heading>
              
              <Text style={label}>Produkt:</Text>
              <Text style={value}>{productName}</Text>

              {hasCartItems && (
                <>
                  <Hr style={divider} />
                  {cartItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <Text style={label}>Kategorie:</Text>
                      <Text style={value}>{item.categoryName}</Text>
                      
                      {item.articleNumber && (
                        <>
                          <Text style={label}>Artikelnummer:</Text>
                          <Text style={value}>{item.articleNumber}</Text>
                        </>
                      )}
                      
                      {item.quantity && (
                        <>
                          <Text style={label}>Menge:</Text>
                          <Text style={value}>
                            {item.quantity}{item.unit ? ` ${item.unit}` : ''}
                          </Text>
                        </>
                      )}
                      
                      {item.categoryName.toLowerCase().includes('putzlappen') && (
                        <>
                          <Text style={label}>Verpackung:</Text>
                          <Text style={value}>10 kg Pressballen in Folie</Text>
                          <Text style={label}>Palettengröße:</Text>
                          <Text style={value}>36 x 10 kg = 1 Europalette</Text>
                        </>
                      )}
                      
                      {index < cartItems.length - 1 && <Hr style={divider} />}
                    </React.Fragment>
                  ))}
                </>
              )}

              {message && (
                <>
                  <Hr style={divider} />
                  <Text style={label}>Ihre Nachricht:</Text>
                  <Text style={value}>{message}</Text>
                </>
              )}
            </Section>

            {/* Contact Information */}
            <Section style={contactBox}>
              <Heading style={h3}>Kontakt</Heading>
              <Text style={contactText}>
                <strong>August Meyer GmbH & Co. KG</strong><br />
                Seibertstr. 5<br />
                35708 Haiger<br />
                Deutschland
              </Text>
              <Text style={contactText}>
                Tel.: 0 27 73 / 50 80<br />
                Fax: 0 27 73 / 71 48 5<br />
                E-Mail: <Link href="mailto:info@august-meyer.de" style={link}>info@august-meyer.de</Link>
              </Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Link href={`${siteUrl}/kontakt`} style={button}>
                Kontakt aufnehmen
              </Link>
            </Section>

            {/* Footer */}
            <Hr style={footerDivider} />
            <Text style={footerText}>
              Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#0b1a33',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#0b1a33',
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#13294b',
  padding: '32px 24px',
  textAlign: 'center' as const,
  borderBottom: '2px solid #00ffb3',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  lineHeight: '1.2',
};

const headerSubtext = {
  color: '#c7d2e0',
  fontSize: '14px',
  margin: '0',
};

const content = {
  padding: '32px 24px',
  backgroundColor: '#0b1a33',
};

const h2 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px',
  lineHeight: '1.3',
};

const h3 = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
  lineHeight: '1.3',
};

const text = {
  color: '#c7d2e0',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const summaryBox = {
  backgroundColor: '#13294b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '2px',
  padding: '24px',
  margin: '24px 0',
};

const label = {
  color: '#c7d2e0',
  fontSize: '14px',
  fontWeight: '600',
  margin: '12px 0 4px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const value = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0 0 8px',
  lineHeight: '1.5',
};

const divider = {
  borderColor: 'rgba(255,255,255,0.08)',
  margin: '16px 0',
};

const contactBox = {
  backgroundColor: '#13294b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '2px',
  padding: '24px',
  margin: '24px 0',
};

const contactText = {
  color: '#c7d2e0',
  fontSize: '14px',
  lineHeight: '1.8',
  margin: '0 0 12px',
};

const link = {
  color: '#00ffb3',
  textDecoration: 'underline',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#00ffb3',
  color: '#000000',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '12px 32px',
  borderRadius: '2px',
  display: 'inline-block',
};

const footerDivider = {
  borderColor: 'rgba(255,255,255,0.08)',
  margin: '32px 0 16px',
};

const footerText = {
  color: '#c7d2e0',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
};

