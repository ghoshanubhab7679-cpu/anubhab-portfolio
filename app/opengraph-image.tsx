import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050505 0%, #101a33 100%)',
          padding: 64,
          color: 'white',
          fontFamily: 'Sora',
        }}
      >
        <div style={{ fontSize: 28, textTransform: 'uppercase', letterSpacing: 6, color: '#5ee7ff' }}>Anubhab Ghosh</div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 16, lineHeight: 1.05 }}>AI Creator • Motion Designer</div>
        <div style={{ fontSize: 32, marginTop: 20, color: '#d9e3ff' }}>Cinematic stories, premium ads, and futuristic visuals.</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
