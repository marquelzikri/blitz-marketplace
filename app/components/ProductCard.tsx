import { Routes, Link } from "blitz"
import { Product, Organization, Variant } from "db"

function ProductCard({
  // discount,
  // imgUrl,
  title,
  permalink,
  organization,
  variants,
}: Product & { organization: Organization; variants: Variant[] }) {
  const price =
    Math.min.apply(
      Math,
      variants?.map((variant) => variant.price)
    ) || 0

  return (
    <Link
      href={Routes.ShowProductDetailPage({
        store: organization.permalink,
        product: permalink,
      })}
    >
      <a className="font-normal text-left">
        <article className="flex flex-col m-0 text-sm sm:mx-2">
          {/* <img className="object-cover h-card-img" src={imgUrl} alt={`${title} thumbnail`} /> */}
          {/* {discount ? (
            <div className="absolute top-0 right-0 flex justify-end sm:relative">
              <div>
                <div className="flex justify-center w-8 h-12 p-2 bg-red-500">
                  <span className="text-xs text-white">
                    Off <br />
                    {discount}%
                  </span>
                </div>
                <div
                  className="triangle-down"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "1rem solid transparent",
                    borderRight: "1rem solid transparent",
                    borderTop: "1rem solid #f56565",
                  }}
                ></div>
              </div>
            </div>
          ) : null} */}
          <small className="mt-4 text-gray-500">{organization.name}</small>
          <span className="text-sm font-semibold">{title}</span>
          <span className="text-sm font-semibold">$ {price}</span>
        </article>
      </a>
    </Link>
  )
}

export default ProductCard
