import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import { Product } from "db"

import ProfileLayout from "app/components/ProfileLayout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getProducts from "app/products/queries/getProducts"

const ITEMS_PER_PAGE = 100

export const ProductsList = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const userOwnedStore = currentUser?.memberships?.find((membership) => membership.isDefault)
  if (!userOwnedStore) router.push(Routes.NewStorePage())
  const page = Number(router.query.page) || 0
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: { organizationId: userOwnedStore?.organizationId },
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      {userOwnedStore ? (
        <>
          <ul>
            {products.map((product: Product) => (
              <li key={product.id}>
                <Link href={Routes.ShowProductPage({ productId: product.id })}>
                  <a>{product.title}</a>
                </Link>
              </li>
            ))}
          </ul>

          <button disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </button>
          <button disabled={!hasMore} onClick={goToNextPage}>
            Next
          </button>
        </>
      ) : null}
    </div>
  )
}

const ShowMyProductsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProductPage()}>
            <a>Create Product</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProductsList />
        </Suspense>
      </div>
    </>
  )
}

ShowMyProductsPage.authenticate = true
ShowMyProductsPage.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>

export default ShowMyProductsPage
