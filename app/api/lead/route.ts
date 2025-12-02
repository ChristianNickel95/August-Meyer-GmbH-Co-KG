import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  productName: string;
  cartItems?: Array<{
    categoryId: string;
    categoryName: string;
    quantity: string;
    unit: string | null;
  }>;
  cartSummary?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: LeadData = await request.json();
    
    // Validate required fields
    // Message is only required if no cart items are present
    const hasCartItems = body.cartItems && body.cartItems.length > 0;
    if (!body.name || !body.email || (!body.message && !hasCartItems)) {
      return NextResponse.json(
        { error: 'Fehlende Pflichtfelder' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email
    // 3. Integrate with CRM system
    // 4. Log the lead
    
    // For now, we'll just log the data and return success
    console.log('New lead received:', {
      ...body,
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      hasCartItems: body.cartItems && body.cartItems.length > 0,
      cartItemCount: body.cartItems?.length || 0
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Ihre Anfrage wurde erfolgreich gesendet. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.',
        leadId: `LEAD-${Date.now()}`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing lead:', error);
    
    return NextResponse.json(
      { 
        error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' 
      },
      { status: 500 }
    );
  }
}
