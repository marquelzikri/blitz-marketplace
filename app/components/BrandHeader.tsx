import { Suspense } from "react"
import { Link, useMutation, Routes } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

function BrandHeader() {
  return (
    <div className="flex justify-center w-screen text-xs p-3 sm:py-8">
      <nav className="flex flex-col sm:flex-row justify-between w-full max-w-5xl">
        <ul className="inline-flex flex-row-reverse sm:flex-row order-3 sm:order-1">
          <li className="flex flex-col justify-center">
            <div className="relative">
              <select
                className="block appearance-none border bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option className="">IDR</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </li>
          <li className="mx-4 flex">
            <button className="uppercase">Bahasa</button>
            <span className="flex flex-col justify-center mx-2 text-lg">{" - "}</span>
            <button className="font-bold uppercase">English</button>
          </li>
        </ul>
        <div className="h-10 sm:h-full order-1 sm:order-2 flex justify-center">
          <img className="object-contain" src="/logo.png" alt="Brand" />
        </div>
        <ul className="inline-flex justify-end order-2 sm:order-3 my-4 sm:m-0 text-gray-700">
          {/* <li className="flex flex-col justify-center mr-6 uppercase">Log in / Register</li> */}
          <Suspense fallback="Loading...">
            <li className="flex flex-col justify-center mr-6 uppercase">
              <UserInfo />
            </li>
          </Suspense>
          <li className="flex flex-col justify-center">
            <button className="flex justify-center">
              <BagIcon />
              <span className="flex flex-col h-full justify-center ml-2">0</span>
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
}

export default BrandHeader
