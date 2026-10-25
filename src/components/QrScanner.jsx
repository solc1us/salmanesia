
import { useState } from 'react'

export default function QrScanner({ onScan }) {
  const [cameraStatus, setCameraStatus] = useState('idle')
  const [message, setMessage] = useState('')

  function stopCamera() {
    const video = document.getElementById('member5-camera')

    if (video) {
      video.dataset.scanning = 'false'

      if (video.srcObject) {
        const tracks = video.srcObject.getTracks()

        tracks.forEach((track) => {
          track.stop()
        })

        video.srcObject = null
      }
    }

    setCameraStatus('idle')
  }

  async function startCamera() {
    const video = document.getElementById('member5-camera')

    if (!video) return

    setMessage('')

    if (!('BarcodeDetector' in window)) {
      setMessage(
        'Browser tidak mendukung QR Scanner. Gunakan input tiket manual.'
      )
      return
    }

    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setMessage(
        'Kamera tidak tersedia. Gunakan localhost atau HTTPS.'
      )
      return
    }

    try {
      const detector = new window.BarcodeDetector({
        formats: ['qr_code'],
      })

      const scanId = String(Date.now()) + Math.random()

      video.dataset.scanning = scanId
      setCameraStatus('starting')

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
        },
        audio: false,
      })

      if (
        !video.isConnected ||
        video.dataset.scanning !== scanId
      ) {
        stream.getTracks().forEach((track) => track.stop())
        return
      }

      video.srcObject = stream
      await video.play()

      if (
        !video.isConnected ||
        video.dataset.scanning !== scanId
      ) {
        stream.getTracks().forEach((track) => track.stop())
        return
      }

      setCameraStatus('active')

      async function scanFrame() {
        if (
          !video.isConnected ||
          video.dataset.scanning !== scanId
        ) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        try {
          if (video.readyState >= 2) {
            const results = await detector.detect(video)

            if (video.dataset.scanning !== scanId) {
              return
            }

            if (results.length > 0) {
              const ticketId = results[0].rawValue

              stopCamera()
              onScan(ticketId)
              return
            }
          }
        } catch {
          stopCamera()
          setMessage('Gagal membaca QR dari kamera.')
          return
        }

        setTimeout(scanFrame, 350)
      }

      scanFrame()
    } catch {
      stopCamera()
      setMessage(
        'Tidak dapat membuka kamera. Periksa izin browser.'
      )
    }
  }

  async function handleImageUpload(event) {
    const file = event.target.files[0]

    event.target.value = ''

    if (!file) return

    stopCamera()
    setMessage('')

    if (
      !('BarcodeDetector' in window) ||
      !('createImageBitmap' in window)
    ) {
      setMessage(
        'Browser tidak mendukung scan gambar QR. Gunakan input manual.'
      )
      return
    }

    let imageBitmap

    try {
      const detector = new window.BarcodeDetector({
        formats: ['qr_code'],
      })

      imageBitmap = await createImageBitmap(file)

      const results = await detector.detect(imageBitmap)

      if (results.length === 0) {
        setMessage('QR tidak ditemukan pada gambar.')
      } else {
        const ticketId = results[0].rawValue
        onScan(ticketId)
      }
    } catch {
      setMessage('Gambar gagal dibaca. Pilih gambar QR lain.')
    } finally {
      if (imageBitmap) {
        imageBitmap.close()
      }
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Arahkan QR Code tiket ke kamera atau pilih
        gambar QR dari perangkat.
      </p>

      <video
        id="member5-camera"
        className={`w-full rounded-xl bg-slate-900 ${
          cameraStatus === 'idle' ? 'hidden' : 'block'
        }`}
        muted
        playsInline
        aria-label="Kamera pemindai QR"
      />

      <div className="flex flex-wrap gap-3">
        {cameraStatus === 'idle' ? (
          <button
            type="button"
            onClick={startCamera}
            className="rounded-lg bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
          >
            Buka Kamera
          </button>
        ) : (
          <button
            type="button"
            onClick={stopCamera}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Tutup Kamera
          </button>
        )}
      </div>

      <div>
        <label
          htmlFor="qr-image"
          className="mb-2 block text-sm font-medium"
        >
          Scan QR dari Gambar
        </label>

        <input
          id="qr-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full rounded-lg border border-slate-300 p-2 text-sm"
        />
      </div>

      {cameraStatus === 'starting' && (
        <p role="status" className="text-sm text-slate-600">
          Meminta izin kamera...
        </p>
      )}

      {cameraStatus === 'active' && (
        <p role="status" className="text-sm text-teal-700">
          Kamera aktif. Silakan arahkan QR Code.
        </p>
      )}

      {message && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {message}
        </p>
      )}
    </div>
  )
}
