import { ReactNode } from "react"
import { Link, useRouter } from "blitz"
import classnames from "classnames"

import Layout from "app/core/layouts/Layout"

type ProfileLayoutProps = {
  title?: string
  children: ReactNode
}

type Route = { label: string; href: string }

const Item = ({ label, href }: Route) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <a
        className={classnames(
          "flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400",
          { "bg-gray-100": router.pathname.includes(href) },
          { "bg-white": !router.pathname.includes(href) }
        )}
      >
        <span className="mx-4 text-lg font-normal">{label}</span>
        <span className="flex-grow text-right"></span>
      </a>
    </Link>
  )
}

const Sidebar = () => {
  const routes: Route[] = [
    {
      label: "My profile",
      href: "#",
    },
    {
      label: "Store settings",
      href: "/profile/store",
    },
    {
      label: "Adresses",
      href: "/profile/addresses",
    },
  ]
  return (
    <div className="w-72">
      <nav className="px-6">
        {routes.map((route, index) => (
          <Item key={index} {...route} />
        ))}
      </nav>
    </div>
  )
}

const ProfileLayout = ({ title, children }: ProfileLayoutProps) => {
  return (
    <Layout title={title || "Profile"}>
      <div className="relative bg-white dark:bg-gray-800">
        <div className="flex flex-col max-w-5xl mx-auto sm:flex-row">
          <Sidebar />
          <main className="m-auto">{children}</main>
        </div>
      </div>
      <style jsx global>{`
        a,
        button {
          background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
          border-radius: 0.5em;
          cursor: pointer;
          padding: 1em;
          margin: 1em 0.1em;
        }
        li > a {
          background-color: #fff;
          border-radius: 0;
          border-color: rgba(243, 244, 246, var(--tw-bg-opacity));
          border-top: 1px solid;
          border-bottom: 1px solid;
          width: 100%;
          margin: 1px 0;
        }
        li {
          display: flex;
          width: 100%;
        }
        p {
          margin: 1.5em 0;
        }
        main > div {
          display: grid;
          grid-gap: 0.5em;
        }
      `}</style>
    </Layout>
  )
}

export default ProfileLayout
