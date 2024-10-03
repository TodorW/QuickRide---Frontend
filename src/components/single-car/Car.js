import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import Header from "../layout/Header";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options.",
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    "The 6-Pack includes two black, two white, and two heather gray Basic Tees.",
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Car = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <div className="bg-gray-900 text-gray-100">
      <Header />{" "}
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-400 hover:text-gray-300"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-500"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-400 hover:text-gray-300"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Main content: image left, details right */}
        <div className="mx-auto mt-6 max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image on the left */}
          <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
            <img
              alt={product.images[0].alt}
              src={product.images[0].src}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Product info on the right */}
          <div className="mt-4 lg:mt-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl">
              {product.name}
            </h1>
            <p className="text-3xl tracking-tight text-gray-100 mt-4">
              {product.price}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-100"
                          : "text-gray-600",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            {/* Product options */}
            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-100">Color</h3>
                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="flex items-center space-x-3"
                  >
                    {product.colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        aria-label={color.name}
                        className={classNames(
                          color.selectedClass,
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-gray-600"
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-100">Size</h3>
                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="grid grid-cols-4 gap-4 mt-4"
                >
                  {product.sizes.map((size) => (
                    <Radio
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      className={classNames(
                        size.inStock
                          ? "cursor-pointer bg-gray-800 text-gray-100"
                          : "cursor-not-allowed bg-gray-700 text-gray-400",
                        "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-600 focus:outline-none"
                      )}
                    >
                      {size.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>

              {/* Add to cart button */}
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md bg-indigo-400 py-3 px-8 text-base font-medium text-gray-100 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add to cart
              </button>
            </form>

            {/* Product description */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-100">Description</h3>
              <p className="mt-4 text-base text-gray-300">
                {product.description}
              </p>

              <h3 className="text-sm font-medium text-gray-100 mt-10">
                Highlights
              </h3>
              <ul className="list-disc pl-4 text-sm text-gray-300 mt-4">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <h3 className="text-sm font-medium text-gray-100 mt-10">
                Details
              </h3>
              <p className="mt-4 text-sm text-gray-300">{product.details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
