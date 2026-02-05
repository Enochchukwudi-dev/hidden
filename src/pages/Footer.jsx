

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/blacklogo.jpg'
import snapchatIcon from '../assets/snapchat.svg'
import instaIcon from '../assets/insta.svg'
import tiktokIcon from '../assets/tiktok.svg'
import eye from '../assets/eye.png' 
import { MapPinCheck, Mail, Phone, Send } from 'lucide-react' 

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showReturns, setShowReturns] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [showTick, setShowTick] = useState(false)
  const [thankYouHtml, setThankYouHtml] = useState('')

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowTerms(false);
        setShowPrivacy(false);
        setShowReturns(false);
        setShowAbout(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const navigate = useNavigate();

  const openMail = (to, body = '') => {
    try {
      const mailtoHref = `mailto:${to}?body=${encodeURIComponent(body)}`;
      const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&body=${encodeURIComponent(body)}`;
      // Try native mail client first
      window.location.href = mailtoHref;
      // Fallback: open Gmail compose in a new tab shortly after
      setTimeout(() => {
        window.open(gmailHref, '_blank');
      }, 800);
    } catch (err) {
      const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&body=${encodeURIComponent(body)}`;
      window.open(gmailHref, '_blank');
    }
  };
  return (
    <footer style={{ backgroundColor: 'black', fontFamily: "'Montserrat', 'Roboto', sans-serif" }} className="text-gray-100">
      <div className="max-w-7xl mx-auto px-8 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Left: logo + description + socials */}
          <div className="md:col-span-3">
            <button onClick={() => navigate('/')} aria-label="Go to home" className="p-0 bg-transparent border-0 inline-block">
              <img src={logo} alt="Follow God" className="h-10 md:h-12 lg:15 w-auto mb-6 cursor-pointer" />
            </button>
            <p className="text-sm font-thin text-gray-400 leading-relaxed max-w-sm">
              Faith-inspired fashion for everyday wear, shop curated collections made with care.
            </p>

            <div className="flex items-center gap-5 mt-6">
              <a href="https://www.instagram.com/followgod.ng" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-md  flex items-center justify-center hover:scale-105 transition" title="Instagram">
                <img src={instaIcon} alt="Instagram" className="h-8 w-8" />
              </a>

              <a href="https://www.tiktok.com/@intro840?_r=1&_t=ZS-91ziswsgTLx" target="_blank" rel="noreferrer" aria-label="TikTok" className="h-9 w-9 rounded-md bg-white/80 flex items-center justify-center hover:scale-105 transition" title="TikTok">
                <img src={tiktokIcon} alt="TikTok" className="h-4 w-4" />
              </a>

              <a href="https://www.snapchat.com/add/nnebue2021?share_id=7YnRKIgbTnG3P9AJCCfNVQ&locale=en_001@rg=ngzzzz" target="_blank" rel="noreferrer" aria-label="Snapchat" className="h-9 w-9 rounded-md bg-white/1 flex items-center justify-center hover:scale-105 transition" title="Snapchat">
                <img src={snapchatIcon} alt="Snapchat" className="h-8 w-8" />
              </a>
            </div>
          </div>

          {/* Column: Shop */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-wider font-semibold text-gray-100 uppercase">SHOP</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li><button onClick={() => navigate('/shop')} className="hover:underline cursor-pointer ">All Products</button></li>
              <li><button onClick={() => navigate('/shop?category=best-sellers')} className="hover:underline cursor-pointer">Best Sellers</button></li>
            </ul>
          </div>

          {/* Column: Company */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-wider font-semibold text-gray-100 uppercase">COMPANY</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li><button onClick={() => setShowAbout(true)} className="hover:underline cursor-pointer">About Us</button></li>
            </ul>
          </div>

          {/* Column: Support */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-wider font-semibold text-gray-100 uppercase">SUPPORT</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li><button onClick={() => navigate('/faq')} className="hover:underline cursor-pointer">FAQs</button></li>
            </ul>
          </div>

          {/* Right: Stay in touch + contact */}
          <div className="md:col-span-5 lg:col-span-5 mt-5" >
            <h4 className="text-xs tracking-wider font-semibold text-gray-100 uppercase">STAY IN TOUCH</h4>
            <p className="text-xs text-gray-400 mt-3">Sign Up For Exclusive Offers And New Drops.</p>

            <form onSubmit={(e) => {
              e.preventDefault()
              setEmailError('')
              const re = /\S+@\S+\.\S+/
              if (!email || !re.test(email)) {
                setEmailError('Please enter a valid email address')
                return
              }
              // start subscribing animation
              setIsSubscribing(true)
              setShowTick(false)
              setThankYouHtml('')
              // show tick and thank you partial message after 1.5s
              setTimeout(() => {
                setShowTick(true)
                setThankYouHtml('Thank you for subscribing to our newsletter<br/>If email is valid we will keep you updated')
                // clear thank-you message after 4s of appearance
                setTimeout(() => setThankYouHtml(''), 4000)
              }, 1500)
              // finish subscribing after 3s
              setTimeout(() => {
                setIsSubscribing(false)
                setEmail('')
                // keep tick visible briefly
                setTimeout(() => setShowTick(false), 2500)
              }, 3000)
            }} className="mt-6 flex items-center gap-3 flex-col sm:flex-row">
              <div className="flex-1 relative w-full sm:w-auto">
                <input
                  aria-label="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md py-2 px-4 bg-white/8 placeholder:text-gray-600 outline-none border border-white/10 text-gray-200"
                />
                {emailError && (
                  <div className="text-sm text-red-400 mt-2">{emailError}</div>
                )}
              </div>
              <div className="relative inline-flex items-center">
                <button disabled={isSubscribing} className={`px-6 py-2 rounded-lg font-light ${isSubscribing ? 'bg-gray-500 text-white' : 'bg-[#0f1b23] text-gray-200'}`}>
                  {isSubscribing ? 'Subscribing........' : (<><Send className="h-4 w-4 inline-block mr-2" aria-hidden />Subscribe</>)}
                </button>
                  {showTick && (
                    <div className="ml-3 -mr-8 animate-pulse" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#16A34A" />
                        <path d="M17 8L10 15L7 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
              </div>
            </form>
              {thankYouHtml && (
                <div className="mt-3 text-sm text-yellow-400" dangerouslySetInnerHTML={{ __html: thankYouHtml }} />
              )}

            <div className="mt-7 space-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <MapPinCheck className="h-4 w-4 text-gray-400" aria-hidden />
                <span>Online Store</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-4 w-4 text-gray-400" aria-hidden />
                <a
                  href="mailto:followgodng01@gmail.com?body=Reaching%20out%20from%20folllowgod%20website"
                  onClick={(e) => {
                    e.preventDefault();
                    openMail('followgodng01@gmail.com', 'Reaching out from folllowgod website');
                  }}
                  className="hover:underline cursor-pointer"
                >
                  followgodng01@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-4 w-4 text-gray-400" aria-hidden />
                <a href="tel:+2349031161058" className="hover:underline">+2349031161058</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Terms Modal */}
      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAbout(false)} />

          <div className="z-10 w-full max-w-md mx-4">
            <div className="bg-[#f3efe6] rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 border-b border-[#e6e0d6]">
                <h2 id="aboutModalTitle" className="text-2xl font-extrabold text-gray-800">About FOLLOW GOD</h2>
                <button onClick={() => setShowAbout(false)} className="text-gray-600 bg-white/60 rounded-full w-8 h-8 flex items-center justify-center">×</button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto text-gray-700 space-y-4 text-sm">
                <p>Welcome to FOLLOW GOD, where faith meets fashion. We're a faith inspired apparel brand dedicated to creating high quality, thoughtfully designed pieces that celebrate purpose, identity, and self expression.</p>

                <p>Every collection we create is crafted with care and intention. From bold statement hoodies to timeless essentials, we prioritize ethical sourcing, transparent craftsmanship, and honest communication. We believe that fashion should uplift and inspire your community, and that's exactly what we're building here.</p>

                <p>Our vision is simple: create collections that resonate with people who value quality, meaning, and purpose in what they wear. We source responsibly, design thoughtfully, and craft every piece to last, because true style is timeless.</p>

                <p>Thank you for supporting our mission. Your trust helps us continue to grow, innovate, and serve a community that values more than just fashion.</p>

                <p>
                  <strong>Questions? Let's connect.</strong>
                  <br />Email: <a
                    href="mailto:followgodng01@gmail.com?body=Reaching%20out%20from%20folllowgod%20website"
                    onClick={(e) => {
                      e.preventDefault();
                      openMail('followgodng01@gmail.com', 'Reaching out from folllowgod website');
                    }}
                    className="underline"
                  >followgodng01@gmail.com</a>
                  <br />Phone: <a href="tel:+2349031161058" className="underline">+2349031161058</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowTerms(false)} />

          <div className="z-10 w-full max-w-md mx-4">
            <div className="bg-[#f3efe6] rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 border-b border-[#e6e0d6]">
                <h2 id="termsModalTitle" className="text-2xl font-extrabold text-gray-800">Terms of Service</h2>
                <button onClick={() => setShowTerms(false)} className="text-gray-600 bg-white/60 rounded-full w-8 h-8 flex items-center justify-center">×</button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto text-gray-700 space-y-4 text-sm">
                <p className="lead"><strong>1. Agreement to Terms</strong><br />By accessing and using the FOLLOW GOD website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

                <p><strong>2. Use License</strong><br />Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile, disassemble, or reverse engineer any software contained on the website; remove any copyright or other proprietary notations; or transfer the materials to another person or "mirror" the materials on any other server.</p>

                <p><strong>3. Disclaimer</strong><br />The materials on our website are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

                <p><strong>4. Limitations</strong><br />In no event shall FOLLOW GOD or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.</p>

                <p><strong>5. Accuracy of Materials</strong><br />The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.</p>

                <p><strong>6. Links</strong><br />We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPrivacy(false)} />

            <div className="z-10 w-full max-w-md mx-4">
              <div className="bg-[#f3efe6] rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-start justify-between p-4 border-b border-[#e6e0d6]">
                  <h2 id="privacyModalTitle" className="text-2xl font-extrabold text-gray-800">Privacy Policy</h2>
                  <button onClick={() => setShowPrivacy(false)} className="text-gray-600 bg-white/60 rounded-full w-8 h-8 flex items-center justify-center">×</button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto text-gray-700 space-y-4 text-sm">
                  <h3 className="text-lg font-semibold">Privacy Policy</h3>

                  <p>
                    <strong>1. Introduction</strong><br />
                    FOLLOW GOD ("we", "our", or "us") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
                  </p>

                  <p>
                    <strong>2. Information Collection and Use</strong><br />
                    We collect several different types of information for various purposes to provide and improve our service to you.
                  </p>

                  <p>
                    <strong>Types of Data Collected:</strong><br />
                    • Personal Data: While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: Email address, First name and last name, Phone number, Address, State, Province, ZIP/Postal code, City, Cookies and Usage Data.
                  </p>

                  <p>
                    <strong>Usage Data:</strong><br />
                    We may also collect information about how the service is accessed and used ("Usage Data"). This may include information such as your computer's IP address, browser type, browser version, pages you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
                  </p>

                  <p>
                    <strong>3. Use of Data</strong><br />
                    FOLLOW GOD uses the collected data for various purposes: to provide and maintain our service, to notify you about changes to our service, to allow you to participate in interactive features of our service, to provide customer support, to gather analysis or valuable information so we can improve our service, to monitor the usage of our service, and to detect, prevent and address technical issues.
                  </p>

                  <p>
                    <strong>4. Security of Data</strong><br />
                    The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                  </p>
                </div>
              </div>
            </div>
          </div>
      )}

        {/* Returns & Refunds Modal */}
        {showReturns && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowReturns(false)} />

            <div className="z-10 w-full max-w-md mx-4">
              <div className="bg-[#f3efe6] rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-start justify-between p-4 border-b border-[#e6e0d6]">
                  <h2 id="returnsModalTitle" className="text-2xl font-extrabold text-gray-800">Returns & Refunds</h2>
                  <button onClick={() => setShowReturns(false)} className="text-gray-600 bg-white/60 rounded-full w-8 h-8 flex items-center justify-center">×</button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto text-gray-700 space-y-4 text-sm">
                  <p><strong>1. Return Period</strong><br />Customers may return items within 14 days of purchase. Items must be unworn, unwashed, and in original packaging with all tags attached. After 14 days from the date of purchase, no returns will be accepted.</p>

                  <p>
                    <strong>2. Return Process</strong>
                    <br />To initiate a return, contact us at <a
                      href="mailto:followgodng01@gmail.com"
                      onClick={(e) => {
                        e.preventDefault();
                        openMail('followgodng01@gmail.com', 'Reaching out from folllowgod website');
                      }}
                      className="underline"
                    >followgodng01@gmail.com</a> with your order number and reason for return. We will provide you with return shipping instructions. Please note that customers are responsible for return shipping costs unless the return is due to a defect or our error.
                  </p>

                  <p><strong>3. Inspection & Refunds</strong><br />Once we receive your return, we will inspect the item(s) within 5-7 business days. If approved, we will process your refund within 10 business days. Refunds will be issued to the original payment method.</p>

                  <p><strong>4. Non-Returnable Items</strong><br />Items marked as clearance or final sale cannot be returned. Undergarments and swimwear that have been tried on are not returnable for hygiene reasons.</p>

                  <p><strong>5. Defects & Damage</strong><br />If you receive a damaged or defective item, please contact us immediately with photos. We will replace the item or issue a full refund at no cost to you, including return shipping.</p>

                  <p>
                    <strong>6. Contact Us</strong>
                    <br />For any questions about our returns policy, please reach out to us at <a
                      href="mailto:followgodng01@gmail.com"
                      onClick={(e) => {
                        e.preventDefault();
                        openMail('followgodng01@gmail.com', 'Reaching out from folllowgod website');
                      }}
                      className="underline"
                    >followgodng01@gmail.com</a> or call <a href="tel:+2349031161058" className="underline">+2349031161058</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Bottom bar */}
      <div style={{ backgroundColor: 'black' }} className="py-6 flex flex-col">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-7">
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <button onClick={() => setShowTerms(true)} className="hover:underline">Terms</button>
            <button onClick={() => setShowPrivacy(true)} className="hover:underline">Privacy</button>
            <button onClick={() => setShowReturns(true)} className="hover:underline">Returns</button>
          </div>

          <div className="text-sm text-gray-500">© FOLLOW GOD — 2026</div>

          <div className="flex items-center gap-4 flex-col ">
            <div className="text-sm text-gray-400">built with -</div>
            <div className="text-sm font-semibold text-yellow-50 flex items-center">
              <img src={eye} alt="Byund" className="h-4 w-4 inline-block mr-2" />
              Byund Technologies
            </div>
            <a
              href="https://wa.me/2349162919586?text=Hello%20Enoch%2C%20Reaching%20out%20from%20followgod%20web"
              target="_blank"
              rel="noreferrer"
              className="ml-4 border border-white/20 rounded-md px-3 py-2 text-sm text-gray-200 inline-block"
            >
              Reach Us
            </a>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer