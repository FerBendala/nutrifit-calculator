import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Calculadora Fitness';
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            backgroundImage: 'linear-gradient(45deg, #f0f9ff 0%, #e0f2fe 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#3b82f6',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: 40,
                  fontWeight: 'bold',
                }}
              >
                🧮
              </div>
            </div>
          </div>
          
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: '#1e293b',
              textAlign: 'center',
              marginBottom: 20,
              maxWidth: 1000,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          
          <div
            style={{
              fontSize: 24,
              color: '#64748b',
              textAlign: 'center',
              maxWidth: 800,
            }}
          >
            Calculadoras gratuitas de calorías, macros, IMC y más. 
            Herramientas profesionales para tu nutrición y fitness.
          </div>
          
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              fontSize: 20,
              color: '#94a3b8',
            }}
          >
            calculadora-fitness.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Failed to generate OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}