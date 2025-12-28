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
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface AdminNotificationProps {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  productName: string;
  cartItems?: Array<{
    categoryId: string;
    categoryName: string;
    quantity: string;
    unit: string | null;
    articleNumber?: string;
  }>;
  referrer?: string;
  timestamp: string;
}

export function AdminNotification({
  name,
  email,
  company,
  phone,
  message,
  productName,
  cartItems = [],
  referrer,
  timestamp,
}: AdminNotificationProps) {
  const hasCartItems = cartItems && cartItems.length > 0;
  const formattedDate = new Date(timestamp).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Html>
      <Head />
      <Preview>Neue Anfrage über Website – {name}{company ? ` (${company})` : ''}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Neue Anfrage</Heading>
            <Text style={headerSubtext}>August Meyer Website</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Neue Anfrage erhalten</Heading>
            
            <Text style={text}>
              Eine neue Anfrage wurde über die Website eingereicht.
            </Text>

            {/* Contact Information Table */}
            <Section style={dataBox}>
              <Heading style={h3}>Kontaktdaten</Heading>
              
              <Row style={row}>
                <Column style={labelColumn}>
                  <Text style={label}>Name:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{name}</Text>
                </Column>
              </Row>

              <Row style={row}>
                <Column style={labelColumn}>
                  <Text style={label}>E-Mail:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Link href={`mailto:${email}`} style={emailLink}>{email}</Link>
                </Column>
              </Row>

              {company && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Unternehmen:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{company}</Text>
                  </Column>
                </Row>
              )}

              {phone && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Telefon:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{phone}</Text>
                  </Column>
                </Row>
              )}

              {message && (
                <>
                  <Hr style={divider} />
                  <Text style={label}>Nachricht:</Text>
                  <Text style={value}>{message}</Text>
                </>
              )}
            </Section>

            {/* Product Information */}
            <Section style={dataBox}>
              <Heading style={h3}>Produktinformationen</Heading>
              
              <Row style={row}>
                <Column style={labelColumn}>
                  <Text style={label}>Produkt:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{productName}</Text>
                </Column>
              </Row>

              {hasCartItems && (
                <>
                  <Hr style={divider} />
                  {cartItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <Row style={row}>
                        <Column style={labelColumn}>
                          <Text style={label}>Kategorie:</Text>
                        </Column>
                        <Column style={valueColumn}>
                          <Text style={value}>{item.categoryName}</Text>
                        </Column>
                      </Row>

                      {item.articleNumber && (
                        <Row style={row}>
                          <Column style={labelColumn}>
                            <Text style={label}>Artikelnummer:</Text>
                          </Column>
                          <Column style={valueColumn}>
                            <Text style={value}>{item.articleNumber}</Text>
                          </Column>
                        </Row>
                      )}

                      {item.quantity && (
                        <Row style={row}>
                          <Column style={labelColumn}>
                            <Text style={label}>Menge:</Text>
                          </Column>
                          <Column style={valueColumn}>
                            <Text style={value}>
                              {item.quantity}{item.unit ? ` ${item.unit}` : ''}
                            </Text>
                          </Column>
                        </Row>
                      )}

                      {index < cartItems.length - 1 && <Hr style={divider} />}
                    </React.Fragment>
                  ))}
                </>
              )}
            </Section>

            {/* Metadata */}
            <Section style={dataBox}>
              <Heading style={h3}>Metadaten</Heading>
              
              <Row style={row}>
                <Column style={labelColumn}>
                  <Text style={label}>Zeitstempel:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{formattedDate}</Text>
                </Column>
              </Row>

              {referrer && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Herkunft:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Link href={referrer} style={link}>{referrer}</Link>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Action */}
            <Section style={actionBox}>
              <Text style={actionText}>
                <strong>Antworten:</strong> Diese E-Mail direkt beantworten, um dem Kunden zu antworten.
              </Text>
            </Section>

            {/* Footer */}
            <Hr style={footerDivider} />
            <Text style={footerText}>
              Diese E-Mail wurde automatisch generiert.
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

const dataBox = {
  backgroundColor: '#13294b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '2px',
  padding: '24px',
  margin: '24px 0',
};

const row = {
  margin: '8px 0',
};

const labelColumn = {
  width: '140px',
  verticalAlign: 'top' as const,
};

const valueColumn = {
  verticalAlign: 'top' as const,
};

const label = {
  color: '#c7d2e0',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const value = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0',
  lineHeight: '1.5',
};

const divider = {
  borderColor: 'rgba(255,255,255,0.08)',
  margin: '16px 0',
};

const emailLink = {
  color: '#00ffb3',
  textDecoration: 'underline',
  fontSize: '16px',
};

const link = {
  color: '#00ffb3',
  textDecoration: 'underline',
  fontSize: '14px',
  wordBreak: 'break-all' as const,
};

const actionBox = {
  backgroundColor: '#00ffb3',
  border: '1px solid #00ffb3',
  borderRadius: '2px',
  padding: '16px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const actionText = {
  color: '#000000',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
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

