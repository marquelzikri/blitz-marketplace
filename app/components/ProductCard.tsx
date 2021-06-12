function ProductCard({
  name,
  category,
  price,
  discount,
  imgUrl,
  setModalData,
}: {
  name: string
  category: string
  price: string
  discount?: number
  imgUrl: string
  setModalData: Function
}) {
  return (
    <button className="text-left font-normal" onClick={() => setModalData({ name, imgUrl })}>
      <article className="flex flex-col m-0 sm:mx-2 text-sm">
        <img className="h-card-img object-cover" src={imgUrl} alt={`${name} thumbnail`} />
        {discount ? (
          <div className="flex justify-end absolute sm:relative top-0 right-0">
            <div>
              <div className="bg-red-500 flex h-12 justify-center w-8 p-2">
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
        ) : null}
        <small className="mt-4 text-gray-500">{category}</small>
        <span className="font-semibold text-sm">{name}</span>
        <span className="font-semibold text-sm">IDR {price}</span>
      </article>
    </button>
  )
}

export default ProductCard
