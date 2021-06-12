import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

import NavHeader from "../components/NavHeader"
import BrandHeader from "../components/BrandHeader"
import Footer from "../components/Footer"
import Banner from "../components/Banner"
import HorizontalProducts from "../components/HorizontalProducts"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User roles: <code>{currentUser.roles}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div
      className="overflow-x-hidden"
      style={{
        fontFamily: "Roboto",
      }}
    >
      <NavHeader />
      <BrandHeader />
      <Banner />
      {/* <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense> */}

      <section className="flex justify-center w-screen mt-6">
        <div className="w-full max-w-5xl px-4 sm:p-0">
          <section className="gap-6 grid grid-rows-3 sm:grid-rows-none sm:grid-cols-3">
            <img src="https://picsum.photos/400" alt="Lorem Picsum" />
            <img src="https://picsum.photos/400" alt="Lorem Picsum" />
            <img src="https://picsum.photos/400" alt="Lorem Picsum" />
          </section>
        </div>
      </section>

      <HorizontalProducts
        title="Popular in Women"
        url="https://files.sirclocdn.xyz/frontend-test-37/men-products.json"
      />
      <HorizontalProducts
        title="Popular in Men"
        url="https://files.sirclocdn.xyz/frontend-test-37/women-products.json"
      />
      <HorizontalProducts
        title="Popular in Accessories"
        url="https://files.sirclocdn.xyz/frontend-test-37/accessories-products.json"
      />

      <section className="flex justify-center w-screen mt-6">
        <div className="w-full max-w-5xl px-4 xl:p-0">
          <hr className="mt-12" />

          <section className="my-12">
            <h3 className="font-bold text-sm uppercase">
              Koleksi lengkap fashion dari brand-brand terbaik
            </h3>
            <p className="my-4 text-xs font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt feugiat
              vestibulum. Donec vel tempor dolor. Sed varius pellentesque urna sed viverra. Morbi
              eget dui sed velit condimentum dapibus. Vestibulum non fringilla metus, in faucibus
              arcu. Phasellus et mi nunc. Phasellus dolor mauris, bibendum et justo non, faucibus
              eleifend tellus. Vivamus sit amet quam ac dui viverra finibus.
            </p>
            <h3 className="font-bold text-sm uppercase">Belanja fashion di Mavelin Indonesia</h3>
            <p className="my-4 text-xs font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt feugiat
              vestibulum. Donec vel tempor dolor. Sed varius pellentesque urna sed viverra. Morbi
              eget dui sed velit condimentum dapibus. Vestibulum non fringilla metus, in faucibus
              arcu. Phasellus et mi nunc. Phasellus dolor mauris, bibendum et justo non, faucibus
              eleifend tellus. Vivamus sit amet quam ac dui viverra finibus.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
