import type { ClinicInfo } from '@/lib/types'

export default function MapEmbed({ clinic }: { clinic: ClinicInfo }) {
  return (
    <section className="map-section">
      <div className="map-inner">
        <div className="sec-header">
          <div className="sec-label"><span>Map</span></div>
          <h2 className="sec-title">Find us on the map.</h2>
        </div>
        <div className="map-embed">
          {clinic.mapEmbedUrl ? (
            <iframe
              src={clinic.mapEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Map -- add <code>mapEmbedUrl</code> to config</span>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
