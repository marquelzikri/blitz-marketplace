import classNames from "classnames"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"

import useFetch from "../utils/useFetch"

function Banner() {
  let [response, loading, hasError] = useFetch({
    url: "https://cors-anywhere.herokuapp.com/frontend-test-37/banners.json",
  })

  if (hasError) {
    response = {
      banners: [
        {
          title: "abc",
          image_file: "https://picsum.photos/1000/500",
        },
        {
          title: "abc2",
          image_file: "https://picsum.photos/1001/500",
        },
      ],
    }

    hasError = null
  }

  return (
    <section className="flex justify-center w-screen">
      <div className="max-w-5xl">
        {loading ? (
          <span>Loading...</span>
        ) : hasError ? (
          <span>Error occured.</span>
        ) : (
          <Carousel
            autoPlay
            showArrows
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            infiniteLoop
            renderArrowPrev={(clickHandler: () => void): React.ReactNode => (
              <ChevronArrow arrowType="prev" clickHandler={clickHandler} />
            )}
            renderArrowNext={(clickHandler: () => void): React.ReactNode => (
              <ChevronArrow arrowType="next" clickHandler={clickHandler} />
            )}
          >
            {response?.banners?.map((banner: any, index: number) => (
              <div key={index}>
                <img className="object-cover" alt={banner?.title} src={banner?.image_file} />
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  )
}

function ChevronArrow({
  arrowType,
  clickHandler,
}: {
  arrowType: "prev" | "next"
  clickHandler: () => void
}) {
  return (
    <button
      className={classNames("absolute bg-black bg-opacity-50 h-16 w-8 z-10", {
        "left-0": arrowType === "prev",
        "right-0": arrowType === "next",
      })}
      onClick={clickHandler}
      style={{
        top: "calc(50% - 2rem)",
      }}
    >
      <div className="w-4 mx-auto">
        <img
          className={classNames("transform", {
            "-rotate-90": arrowType === "prev",
            "rotate-90": arrowType === "next",
          })}
          src="/chevron-arrow-up.svg"
          alt={`Arrow ${arrowType}`}
        />
      </div>
    </button>
  )
}

export default Banner
