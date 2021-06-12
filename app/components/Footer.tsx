function Footer() {
  return (
    <footer className="w-screen">
      <SocialSection />
      <ImagesSection />
      <NavSection />
    </footer>
  )
}

function NavSection() {
  return (
    <section className="flex justify-center w-full mt-16 sm:my-16 text-gray-700">
      <div className="flex flex-col sm:flex-row justify-between max-w-5xl w-full mx-4 xl:mx-0">
        <article className="w-full sm:w-1/3 px-4 sm:mt-12 sm:m-0 sm:p-0 order-2 sm:order-1">
          <img className="w-48 object-cover" src="/logo.png" alt="Brand" />
          <p className="text-sm my-4">
            Mavelin is a Wordpress E-Commerce theme focused to collecting, grouping your content
            Then selling your stuffs. It is perfect for small-to-high traffic e-commerce bussiness
            site.
          </p>
          <small className="font-semibold uppercase">
            Copyrights © 2017 Mavelin. Powered By Sirclo
          </small>
        </article>

        <section className="grid grid-rows-3 sm:grid-rows-none sm:grid-cols-3 gap-8 w-full sm:w-1/2 px-4 sm:p-0 order-1 sm:order-2">
          <FooterNavList
            title="Categories"
            routes={[
              {
                route: "#",
                label: "Man",
              },
              {
                route: "#",
                label: "Woman",
              },
              {
                route: "#",
                label: "Sunglasses",
              },
              {
                route: "#",
                label: "Necklaces",
              },
              {
                route: "#",
                label: "Sandals",
              },
              {
                route: "#",
                label: "T-Shirt",
              },
              {
                route: "#",
                label: "Parents",
              },
              {
                route: "#",
                label: "Kids",
              },
              {
                route: "#",
                label: "Jeans",
              },
              {
                route: "#",
                label: "Jackets",
              },
              {
                route: "#",
                label: "Blazer",
              },
              {
                route: "#",
                label: "Luggage",
              },
            ]}
          />

          <FooterNavList
            title="Brand"
            routes={[
              {
                route: "#",
                label: "Kenn Munk",
              },
              {
                route: "#",
                label: "Artistoys",
              },
              {
                route: "#",
                label: "SIMON & ME",
              },
              {
                route: "#",
                label: "WildeSkin",
              },
              {
                route: "#",
                label: "PooMS",
              },
              {
                route: "#",
                label: "mimobot*",
              },
              {
                route: "#",
                label: "2K",
              },
              {
                route: "#",
                label: "Jamungo",
              },
              {
                route: "#",
                label: "AIAIAI",
              },
              {
                route: "#",
                label: "Die Gestalten Verlag",
              },
              {
                route: "#",
                label: "Arkitip",
              },
            ]}
          />

          <FooterNavList
            title="Connect with Us"
            routes={[
              {
                route: "#",
                label: "Email Us",
              },
              {
                route: "#",
                label: "Facebook",
              },
              {
                route: "#",
                label: "Twitter",
              },
              {
                route: "#",
                label: "Youtube",
              },
              {
                route: "#",
                label: "Rdio",
              },
              {
                route: "#",
                label: "Foursquare",
              },
              {
                route: "#",
                label: "Newsletter",
              },
              {
                route: "#",
                label: "RSS",
              },
            ]}
          />
        </section>
      </div>
    </section>
  )
}

function ImagesSection() {
  return (
    <section className="flex justify-center w-full overflow-y-scroll sm:overflow-y-hidden">
      <img
        className="w-1/2 sm:w-1/6 object-cover"
        src="https://picsum.photos/400"
        alt="Footer thumbnail item"
      />
      <img
        className="w-1/2 sm:w-1/6 object-cover"
        src="https://picsum.photos/400"
        alt="Footer thumbnail item"
      />
      <img
        className="w-1/2 sm:w-1/6 object-cover"
        src="https://picsum.photos/400"
        alt="Footer thumbnail item"
      />
      <img
        className="w-1/2 sm:w-1/6 object-cover"
        src="https://picsum.photos/400"
        alt="Footer thumbnail item"
      />
      <img
        className="w-1/2 sm:w-1/6 object-cover"
        src="https://picsum.photos/400"
        alt="Footer thumbnail item"
      />
      <img
        className="w-1/2 sm:w-1/6 object-cover"
        src="https://picsum.photos/400"
        alt="Footer thumbnail item"
      />
    </section>
  )
}

function SocialSection() {
  return (
    <section
      className="flex justify-center w-full py-8"
      style={{
        background: "#F4F4F4",
      }}
    >
      <section className="flex flex-col sm:flex-row justify-between w-full max-w-3xl mx-4 xl:mx-0">
        <section className="flex justify-center text-gray-700 order-2 sm:order-1 mt-8 sm:m-0">
          <button className="flex flex-col justify-center fill-current h-full mx-2">
            <FacebookIcon />
          </button>
          <button className="flex flex-col justify-center fill-current h-full mx-2">
            <TwitterIcon />
          </button>
          <button className="flex flex-col justify-center fill-current h-full mx-2">
            <InstagramIcon />
          </button>
          <button className="flex flex-col justify-center fill-current h-full mx-2">
            <PinterestIcon />
          </button>
        </section>
        <form className="w-full max-w-sm order-1 sm:order-2 px-4 sm:p-0">
          <div className="flex items-center border-b border-gray-700 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Your Email Address"
              aria-label="Email Address"
            />
            <button
              className="flex-shrink-0 border-transparent border-4 text-gray-700 hover:text-gray-800 text-xs font-semibold uppercase py-1 px-2 rounded"
              type="button"
            >
              Subscribe
            </button>
          </div>
        </form>
      </section>
    </section>
  )
}

function FooterNavList({
  title,
  routes,
}: {
  title: string
  routes: { route: string; label: string }[]
}) {
  return (
    <section>
      <h2 className="font-bold text-lg">{title}</h2>
      <ul className="font-medium text-sm mt-2">
        {routes.map((route, index) => (
          <li key={index} className="mb-2">
            <a href={route.route}>{route.label}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        d="M21.231 0h-18.462c-1.529 0-2.769 1.24-2.769 2.769v18.46c0 1.531 1.24 2.771 2.769 2.771h18.463c1.529 0 2.768-1.24 2.768-2.771v-18.46c0-1.529-1.239-2.769-2.769-2.769zm-9.231 7.385c2.549 0 4.616 2.065 4.616 4.615 0 2.549-2.067 4.616-4.616 4.616s-4.615-2.068-4.615-4.616c0-2.55 2.066-4.615 4.615-4.615zm9 12.693c0 .509-.413.922-.924.922h-16.152c-.511 0-.924-.413-.924-.922v-10.078h1.897c-.088.315-.153.64-.2.971-.05.337-.081.679-.081 1.029 0 4.079 3.306 7.385 7.384 7.385s7.384-3.306 7.384-7.385c0-.35-.031-.692-.081-1.028-.047-.331-.112-.656-.2-.971h1.897v10.077zm0-13.98c0 .509-.413.923-.924.923h-2.174c-.511 0-.923-.414-.923-.923v-2.175c0-.51.412-.923.923-.923h2.174c.511 0 .924.413.924.923v2.175z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

function PinterestIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default Footer
