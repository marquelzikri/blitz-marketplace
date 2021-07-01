import { useQuery } from "blitz"
import Carousel from "react-multi-carousel"

import ProductCard from "./ProductCard"

import getProducts from "app/products/queries/getProducts"

const ITEMS_PER_SECTION = 20

function HorizontalProducts({ title, category }: { title: string; category: string }) {
  const [{ products }, { isLoading, isError }] = useQuery(getProducts, {
    orderBy: { id: "asc" },
    take: ITEMS_PER_SECTION,
    where: { categories: { some: { name: category } } },
    select: {
      id: true,
      sku: true,
      title: true,
      description: true,
      organization: true,
      organizationId: true,
      categories: true,
      variants: true,
      ratings: true,
      permalink: true,
    },
  })

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1090 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1090, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  return (
    <>
      <section className="relative flex justify-center w-screen px-4 my-8">
        <div className="relative w-full max-w-6xl px-4 pt-8 sm:px-0">
          <div className="absolute top-0 left-0 flex justify-center w-full h-8">
            <div className="w-full max-w-5xl pl-4 sm:px-0">
              <h1 className="text-sm font-black text-gray-700 uppercase">{title}</h1>
            </div>
          </div>
          {isLoading ? <span>Loading...</span> : null}
          {isError ? <span>Error occured.</span> : null}
          {products?.length > 0 ? (
            <Carousel
              partialVisbile={false}
              responsive={responsive}
              infinite
              showDots
              renderDotsOutside
              removeArrowOnDeviceType={["tablet", "mobile"]}
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
            >
              {products?.map((product: any) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </Carousel>
          ) : null}
        </div>
      </section>
      <style>{`
        .react-multi-carousel-dot-list {
          top: 8px;
          bottom: unset;
          justify-content: flex-end;
          max-width: 72rem;
          padding-right: 4rem;
        }

        .react-multi-carousel-dot {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .react-multi-carousel-dot button {
          border: none;
          width: 6px;
          height: 6px;
          background: #4a5568;
        }

        .react-multi-carousel-dot--active button {
          width: 8px;
          height: 8px;
          background: black;
        }

        .react-multi-carousel-list {
          max-width: 64rem;
        }

        .react-multi-carousel-list, .react-multi-carousel-track {
          position: unset;
        }

        .custom-right-arrow {
          position: absolute !important;
          right: 30px;
          z-index: 1;
          border: 1px solid black;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 6px;
          opacity: 0.8;
          cursor: pointer;
          transform: rotate(-45deg);
        }
        .custom-right-arrow:hover {
          opacity: 1;
        }
        .custom-left-arrow {
          position: absolute !important;
          left: 30px;
          z-index: 1;
          border: 1px solid black;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 6px;
          opacity: 0.8;
          cursor: pointer;
          transform: rotate(135deg);
        }
        .custom-left-arrow:hover {
          opacity: 1;
        }

        @media only screen and (max-width: 600px) {
          .react-multi-carousel-dot-list {
            right: 1rem;
            padding: 0;
          }
        }
      `}</style>
    </>
  )
}

const CustomLeftArrow = ({ onClick }: any) => (
  <i onClick={() => onClick()} className="custom-left-arrow" role="button" aria-hidden="true" />
)

const CustomRightArrow = ({ onClick }: any) => (
  <i onClick={() => onClick()} className="custom-right-arrow" role="button" aria-hidden="true" />
)

export default HorizontalProducts
