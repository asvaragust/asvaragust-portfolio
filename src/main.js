import './style.css'

// ===== Ubah di sini kalau nomor atau teks WhatsApp berubah =====
const WA_NUMBER = '6285161232779' // 083894212194 dalam format internasional
const WA_TEXT = 'Halo Asvaragust, saya mau memesan website untuk bisnis saya. Boleh konsultasi dulu?'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`

const modal = document.getElementById('modal')
const modalTitle = document.getElementById('modal-title')
const modalBody = document.getElementById('modal-body')

// Semua elemen <a data-wa> otomatis jadi tombol WhatsApp
function applyWa(root) {
  root.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = WA_URL
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  })
}

// Klik navbar -> isi modal dari <template id="tpl-NAMA">
document.querySelectorAll('[data-open]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const tpl = document.getElementById(`tpl-${btn.dataset.open}`)
    modalTitle.textContent = btn.dataset.title
    modalBody.replaceChildren(tpl.content.cloneNode(true))
    applyWa(modalBody)
    modalBody.scrollTop = 0
    modal.showModal()
  })
})

// Tutup lewat tombol, klik di luar modal, atau tombol Esc (bawaan <dialog>)
document.getElementById('modal-close').addEventListener('click', () => modal.close())
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close()
})

// Hormati pengguna yang mematikan animasi di perangkatnya
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('video')?.pause()
}

applyWa(document)
