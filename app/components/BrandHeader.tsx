import { Suspense } from "react"
import { Link, useMutation, Routes } from "blitz"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

function BrandHeader() {
  return (
    <div className="flex justify-center w-screen p-3 text-xs sm:py-8">
      <nav className="flex justify-between w-full max-w-5xl">
        <div className="inline-flex">
          <Suspense fallback="Loading user data...">
            <div className="flex flex-col my-auto">
              <UserInfo />
            </div>
          </Suspense>
        </div>
        <div className="flex justify-center h-10">
          <img className="object-contain" src="/logo.png" alt="Brand" />
        </div>
        <ul className="inline-flex text-gray-700">
          <li className="flex flex-col justify-center">
            <button className="flex justify-center">
              <BagIcon />
              <span className="flex flex-col justify-center h-full ml-2">0</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

function BagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4H19C19.5523 4 20 4.44771 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44771 4 5 4ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM12 12C9.23858 12 7 9.31371 7 6H9C9 8.56606 10.6691 10 12 10C13.3309 10 15 8.56606 15 6H17C17 9.31371 14.7614 12 12 12Z"
        fill="currentColor"
      />
    </svg>
  )
}

function UserInfo() {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div>
          <div className="relative inline-block dropdown">
            <button className="inline-flex items-center px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded">
              <span className="mr-1">{currentUser.name || currentUser.email}</span>
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>
            </button>
            <ul className="absolute z-10 hidden pt-1 text-gray-700 dropdown-menu">
              <li>
                <Link href={Routes.ProfileHome()}>
                  <a className="block w-full px-4 py-2 whitespace-no-wrap bg-gray-200 rounded-t hover:bg-gray-400">
                    Profile
                  </a>
                </Link>
              </li>
              {/* <li>
                <a className="block px-4 py-2 whitespace-no-wrap bg-gray-200 hover:bg-gray-400" href="#">
                  Center
                </a>
              </li> */}
              <li>
                <button
                  className="block px-4 py-2 whitespace-no-wrap bg-gray-200 rounded-b hover:bg-gray-400"
                  onClick={async () => {
                    await logoutMutation()
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        <style>{`
          .dropdown:hover .dropdown-menu {
            display: block;
          }
        `}</style>
      </>
    )
  }
  return (
    <section className="flex">
      <Link href={Routes.LoginPage()}>
        <a className="button small">
          <strong>Login</strong>
        </a>
      </Link>
      <strong className="mx-2">/</strong>
      <Link href={Routes.SignupPage()}>
        <a className="button small">
          <strong>Sign Up</strong>
        </a>
      </Link>
    </section>
  )
}

export default BrandHeader
