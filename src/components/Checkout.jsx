import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../pages/Footer'
import { useCart } from '../context/CartContext'
import ConfirmModal from './ConfirmModal'
import deleteIcon from '../assets/delete.png'
import { jsPDF } from 'jspdf'

function Checkout() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const cart = useCart()
  const navigate = useNavigate()
  const [orderTotal, setOrderTotal] = useState(0.0)
  const [showConfirm, setShowConfirm] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [emptyErrorVisible, setEmptyErrorVisible] = useState(false)
  const [formErrors, setFormErrors] = useState({ fullName: '', phone: '', address: '' })
  const [isProcessing, setIsProcessing] = useState(false)
  const fullNameRef = useRef(null)
  const phoneRef = useRef(null)
  const addressRef = useRef(null)
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

  // EXACT LAYOUT MATCHING YOUR IMAGE
  function generateOrderPdfBlob() {
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' })
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 40
      const usableWidth = pageWidth - 2 * margin

      let y = 40

      // Shop Info - Top Left
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(100)
      doc.text('shopfollowgod.com', margin, y)
      y += 12
      doc.text('Owerri, Nigeria', margin, y)
      y += 12
      doc.text('CASH INVOICE', margin, y)

      // Date - Top Right
      const today = new Date()
      const dateStr = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }) + ' ' + today.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      doc.text(`Date: ${dateStr}`, pageWidth - margin, 52, { align: 'right' })

      y += 30

      // Title
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(20)
      doc.setTextColor(0)
      doc.text('CUSTOMER ORDER ALERT', pageWidth / 2, y, { align: 'center' })

      y += 40

      // ORDER FROM section
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('ORDER FROM:', margin, y)
      y += 18

      // Name label (bold) + detail (normal)
      doc.setFontSize(11)
      const nameLabel = 'Name: '
      doc.setFont('helvetica', 'bold')
      doc.text(nameLabel, margin + 20, y)
      const nameLabelWidth = doc.getTextWidth(nameLabel)
      doc.setFont('helvetica', 'normal')
      doc.text(fullName ? fullName.toUpperCase() : 'N/A', margin + 20 + nameLabelWidth + 4, y)
      y += 15

      // Phone label (bold) + detail (normal)
      const phoneLabel = 'Phone Number: '
      doc.setFont('helvetica', 'bold')
      doc.text(phoneLabel, margin + 20, y)
      const phoneLabelWidth = doc.getTextWidth(phoneLabel)
      doc.setFont('helvetica', 'normal')
      doc.text(phone || 'N/A', margin + 20 + phoneLabelWidth + 4, y)
      y += 15

      // Address label (bold) then wrapped address lines (normal)
      const addrLabel = "Receiver's Address: "
      doc.setFont('helvetica', 'bold')
      doc.text(addrLabel, margin + 20, y)
      const addrLabelWidth = doc.getTextWidth(addrLabel)
      doc.setFont('helvetica', 'normal')
      const addrLines = doc.splitTextToSize(address || 'N/A', usableWidth - 40 - addrLabelWidth)
      doc.text(addrLines, margin + 20 + addrLabelWidth, y)
      y += addrLines.length * 15 + 20

      // Table Header
      const colItem = 50
      const colDesc = 240
      const colQty = 80
      const colAmount = 100
      const tableTop = y
      const headerH = 30
      const rowH = 35

      doc.setFillColor(230, 215, 215)
      doc.rect(margin, tableTop, usableWidth, headerH, 'F')
      doc.setTextColor(80)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.text('Item', margin + colItem / 2, tableTop + 20, { align: 'center' })
      doc.text('Description', margin + colItem + colDesc / 2, tableTop + 20, { align: 'center' })
      doc.text('Qty', margin + colItem + colDesc + colQty / 2, tableTop + 20, { align: 'center' })
      doc.text('Amount', margin + usableWidth - colAmount / 2, tableTop + 20, { align: 'center' })

      // Table Grid
      doc.setDrawColor(200)
      doc.setLineWidth(0.5)
      doc.rect(margin, tableTop, usableWidth, headerH + rowH * (cart.items.length + 10), 'S')

      // Vertical lines
      let vx = margin + colItem
      doc.line(vx, tableTop, vx, tableTop + headerH + rowH * (cart.items.length + 10))
      vx += colDesc
      doc.line(vx, tableTop, vx, tableTop + headerH + rowH * (cart.items.length + 10))
      vx += colQty
      doc.line(vx, tableTop, vx, tableTop + headerH + rowH * (cart.items.length + 10))


      // Rows
      let currentY = tableTop + headerH
      cart.items.forEach((item, i) => {
        const rowY = currentY + rowH / 2

        // Alternating row shading
        if (i % 2 === 1) {
          doc.setFillColor(245, 245, 245)
          doc.rect(margin, currentY, usableWidth, rowH, 'F')
        }

        doc.setTextColor(0)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(11)
        doc.text(`${i + 1}`, margin + colItem / 2, rowY, { align: 'center' })
        doc.text((item.title || '').toUpperCase(), margin + colItem + 10, rowY)
        doc.text(`${item.qty}`, margin + colItem + colDesc + colQty / 2, rowY, { align: 'center' })
        const amount = Number(item.price || 0) * Number(item.qty || 1)
        doc.text(`${amount.toLocaleString()}`, margin + usableWidth - colAmount / 2, rowY, { align: 'center' })

        currentY += rowH
      })

      // Empty rows to fill table
      for (let i = cart.items.length; i < 10; i++) {
        currentY += rowH
      }

  const totalBoxW = 200
const totalBoxH = 45
const totalY = currentY + 30

doc.setFillColor(230, 215, 215)
doc.rect(pageWidth - margin - totalBoxW, totalY, totalBoxW, totalBoxH, 'F')

doc.setTextColor(80)
doc.setFont('helvetica', 'bold')
doc.setFontSize(13)
doc.text('Total: ', pageWidth - margin - totalBoxW + 22, totalY + 26)

doc.setFontSize(18)
doc.text(orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
         pageWidth - margin - totalBoxW + 90, totalY + 30)

y = totalY + totalBoxH + 40


      return doc.output('blob')
    } catch (err) {
      console.error('PDF generation error', err)
      return null
    }
  }

  async function sendPdfToTelegram(pdfBlob) {
    if (!pdfBlob || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return
    const form = new FormData()
    form.append('document', pdfBlob, 'order.pdf')
    form.append('chat_id', TELEGRAM_CHAT_ID)
    form.append('caption', `New Order from ${fullName} — ${phone}`)
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
        method: 'POST',
        body: form
      })
    } catch (err) {
      console.error('Telegram send error', err)
    }
  }

  function showToast(msg, duration = 3000) {
    setToastMessage(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), duration)
  }

  useEffect(() => {
    setOrderTotal(cart.total || 0)
  }, [cart.total])

  async function handlePlaceOrder(e) {
    e.preventDefault()
    if (isProcessing) return
    if (!cart.items || cart.items.length === 0) {
      setEmptyErrorVisible(true)
      setTimeout(() => setEmptyErrorVisible(false), 3000)
      return
    }

    const errors = {}
    if (!fullName.trim()) errors.fullName = 'Full name is required'
    else if (fullName.trim().length < 3) errors.fullName = 'Full name must be at least 3 characters'

    if (!phone.trim()) errors.phone = 'Phone is required'
    else if (phone.replace(/\D/g, '').length !== 11) errors.phone = 'Phone must be 11 digits'

    if (!address.trim()) errors.address = 'Delivery address is required'
    else if (address.trim().length < 5) errors.address = 'Delivery address must be at least 5 characters'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setTimeout(() => setFormErrors({ fullName: '', phone: '', address: '' }), 4000)

      try {
        // Determine first invalid field (prioritise phone so user isn't scrolled back to name)
        const firstInvalidRef = errors.phone ? phoneRef : errors.fullName ? fullNameRef : errors.address ? addressRef : null

        if (firstInvalidRef && firstInvalidRef.current) {
          // Smooth scroll on mobile small screens, otherwise just focus
          const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches
          if (isMobile && firstInvalidRef.current.scrollIntoView) {
            firstInvalidRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // small delay to ensure element is in view before focusing
            setTimeout(() => firstInvalidRef.current.focus && firstInvalidRef.current.focus(), 300)
          } else {
            firstInvalidRef.current.focus && firstInvalidRef.current.focus()
          }
        }
      } catch (err) {
        // ignore scrolling errors
      }

      return
    }

    setIsProcessing(true)
    const pdfBlob = generateOrderPdfBlob()
    if (pdfBlob) {
      await Promise.race([
        sendPdfToTelegram(pdfBlob),
        new Promise(resolve => setTimeout(() => resolve('timeout'), 3000))
      ])
        .then(result => showToast(result === 'timeout' ? 'Telegram timed out (continuing)' : 'Invoice sent to Telegram', 3000))
        .catch(() => showToast('Failed to send to Telegram', 3000))
    }

    // snapshot items and total so we can clear the cart immediately
    const itemsSnapshot = cart.items ? cart.items.map(i => ({ ...i })) : []
    const totalSnapshot = orderTotal

    cart.clear?.()
    setFullName('')
    setPhone('')
    setAddress('')
    setOrderTotal(0)
    setFormErrors({ fullName: '', phone: '', address: '' })

    // remove focus from inputs so UI doesn't keep them active after clearing
    try {
      fullNameRef.current?.blur && fullNameRef.current.blur()
      phoneRef.current?.blur && phoneRef.current.blur()
      addressRef.current?.blur && addressRef.current.blur()
    } catch (err) {
      // ignore
    }

    const message = encodeURIComponent(
      `New Order\n\nCustomer: ${fullName}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n` +
      itemsSnapshot.map((item, idx) => `${idx + 1}. ${item.title} x${item.qty} - ₦${Number(item.price).toLocaleString()} each`).join('\n') +
      `\n\nOrder Total: ₦${totalSnapshot.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\nThank you!\nSend account details`
    )

    window.location.href = `https://wa.me/2349031161058?text=${message}`
    setIsProcessing(false)
  }

  function handleClearCart() {
    setShowConfirm(true)
  }

  function confirmClearCart() {
    cart.clear?.()
    setShowConfirm(false)
    showToast('Cart cleared')
  }

  const fmt = (v) => '₦' + Number(v || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-12 md:pt-28" style={{ backgroundColor: 'hsl(44, 45%, 99%)' }}>
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold">Checkout</h1>
          <p className="mt-3 text-sm text-gray-500">
            You're just a few steps away from getting your order — fast, secure and premium delivery.
          </p>
          <div className="flex flex-row md:flex-row items-center justify-center gap-4 mt-6 bg-white/50 rounded-md px-4 py-3">
            <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3 px-3 py-2 rounded-md">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">1</div>
              <div className="text-xs text-gray-600">Order</div>
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3 px-3 py-2 rounded-md opacity-70">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border">2</div>
              <div className="text-xs text-gray-600">Processing</div>
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3 px-3 py-2 rounded-md opacity-70">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border">3</div>
              <div className="text-xs text-gray-600">Payment</div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
          <form className="rounded-xl shadow-md p-8 w-full" style={{ backgroundColor: 'hsl(51, 23%, 94%)' }}>
            <h2 className="font-semibold text-lg mb-6">Shipping Address Details</h2>

            <label className="block text-xs font-medium text-gray-900 mb-2">Full Name</label>
            <div className="relative mb-4">
              <input
                ref={fullNameRef}
                value={fullName}
                onChange={(e) => setFullName(e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50))}
                placeholder="Your full name"
                className="w-full rounded-md border border-gray-300 py-3 pl-4 pr-10 text-base outline-none"
                style={{ fontSize: 16 }}
              />
              {fullName.trim().length >= 3 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#16A34A" />
                    <path d="M17 8L10 15L7 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
            {formErrors.fullName && <div className="text-sm text-red-600 mb-2">{formErrors.fullName}</div>}

            <label className="block text-xs font-medium text-gray-900 mb-2">Phone</label>
            <div className="relative mb-4">
              <input
                ref={phoneRef}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                placeholder="e.g 07031111111"
                type="tel"
                maxLength={11}
                className="w-full rounded-md border border-gray-300 py-3 pl-4 pr-10 text-base outline-none"
                style={{ fontSize: 16 }}
              />
              {phone.length === 11 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#16A34A" />
                    <path d="M17 8L10 15L7 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
            {formErrors.phone && <div className="text-sm text-red-600 mb-2">{formErrors.phone}</div>}

            <label className="block text-xs font-medium text-gray-900 mb-2">Delivery address</label>
            <div className="relative mb-4">
              <input
                ref={addressRef}
                value={address}
                onChange={(e) => setAddress(e.target.value.slice(0, 200))}
                placeholder="Enter your address"
                className="w-full rounded-md border border-gray-300 py-3 pl-4 pr-10 text-base outline-none"
                style={{ fontSize: 16 }}
              />
              {address.trim().length >= 5 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#16A34A" />
                    <path d="M17 8L10 15L7 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
            {formErrors.address && <div className="text-sm text-red-600 mb-2">{formErrors.address}</div>}
          </form>

          <aside className="bg-gray-100 rounded-xl shadow-md p-6 w-full">
            <h3 className="font-semibold text-lg mb-4">Your Order</h3>
            <div className="text-sm text-gray-500 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Product</span>
                <span>Total</span>
              </div>
              <div className="space-y-3 my-4">
                {cart.items && cart.items.length > 0 ? (
                  cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                      <button
                        type="button"
                        onClick={() => navigate(`/product/${item.id}`, { state: { imgSrc: item.image } })}
                        className="p-0 rounded focus:outline-none"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                        />
                      </button>
                      <div className="flex-1 text-sm">
                        <div className="font-medium">{item.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => cart.decrementItem(item.id)}
                            disabled={item.qty <= 1}
                            className={`w-7 h-7 rounded border border-gray-200 text-sm ${item.qty <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                          >
                            −
                          </button>
                          <div className="min-w-[36px] text-center text-sm">{item.qty}</div>
                          <button
                            onClick={() => cart.addItem(item, { qty: 1 })}
                            className="w-7 h-7 rounded border border-gray-200 text-sm hover:bg-gray-100"
                          >
                            +
                          </button>
                          <button
                            onClick={() => cart.removeItem(item.id)}
                            className="ml-3 p-1 rounded hover:bg-gray-100"
                          >
                            <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="font-medium">{fmt(Number(item.price) * item.qty)}</div>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-sm text-gray-500">Your cart is empty</div>
                )}
              </div>
              <div className="flex justify-between py-4">
                <span className="font-medium">Order Total</span>
                <span className="font-medium">{fmt(orderTotal)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-3 rounded-md font-semibold bg-[#0f1b23] text-white disabled:opacity-70"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
              <button
                onClick={handleClearCart}
                className="w-full bg-white border border-gray-200 text-red-600 py-3 rounded-md font-semibold"
              >
                Clear Cart
              </button>
              {emptyErrorVisible && (
                <div className="text-sm text-red-600 mt-2 text-center">Cart is empty</div>
              )}
            </div>
          </aside>
        </section>

        <ConfirmModal
          open={showConfirm}
          title="Clear cart?"
          message="Do you want to clear your cart? This action cannot be undone."
          onConfirm={confirmClearCart}
          onCancel={() => setShowConfirm(false)}
        />

        {toastVisible && (
          <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md">{toastMessage}</div>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export default Checkout