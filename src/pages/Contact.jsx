
import Footer from '../pages/Footer'

const Contact = () => {
  return (
    <>
    <section className="py-20 px-6 bg-white mb-40 text-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase text-gray-500 mb-3">Tagline</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact us</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">

          <div className="flex flex-col items-center">
            <span className="p-4 rounded-full border border-gray-200 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <h3 className="text-xl font-bold mb-3">Email</h3>
            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
            <a href="mailto:email@example.com" className="text-sm underline text-gray-700">email@example.com</a>
          </div>

          <div className="flex flex-col items-center">
            <span className="p-4 rounded-full border border-gray-200 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.862 9.862 0 01-4-.84L3 20l1.2-3.6A7.937 7.937 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
            <h3 className="text-xl font-bold mb-3">Whatsapp</h3>
            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
            <a href="#" className="text-sm underline text-gray-700">Start new chat</a>
          </div>

          <div className="flex flex-col items-center">
            <span className="p-4 rounded-full border border-gray-200 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l.75 2.496a1 1 0 01-.21.981L8.5 9.5a11.042 11.042 0 005 5l1.34-1.34a1 1 0 01.982-.21l2.496.75A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C8.954 21 3 15.046 3 8V7a0 0 0 010 0z" />
              </svg>
            </span>
            <h3 className="text-xl font-bold mb-3">Phone</h3>
            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
            <a href="tel:+15550000000" className="text-sm underline text-gray-700">+1 (555) 000-0000</a>
          </div>

          <div className="flex flex-col items-center">
            <span className="p-4 rounded-full border border-gray-200 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s8-5.5 8-11a8 8 0 10-16 0c0 5.5 8 11 8 11z" />
              </svg>
            </span>
            <h3 className="text-xl font-bold mb-3">Office</h3>
            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
            <a href="#" className="text-sm underline text-gray-700">123 Sample St, Sydney NSW 2000 AU</a>
          </div>

        </div>
      </div>
    </section>
    <Footer />
    </>

  )
}

export default Contact