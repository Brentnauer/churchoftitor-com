"use client";
import SimpleIBM5100 from '../components/SimpleIBM5100';

export default function HomePage() {
  return (
    <>
      <SimpleIBM5100 
        onStatusChange={(status) => {
          console.log('Emulator status:', status);
        }}
        onDisplayUpdate={(canvas) => {
          console.log('Display updated:', canvas);
        }}
      />
    </>
  );
}