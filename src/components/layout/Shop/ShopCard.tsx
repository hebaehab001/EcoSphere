import Image from "next/image";

interface IShop {
  title: string;
  desc: string;
  img: string;
}

export default function ShopCard({ shop }: { shop: IShop }) {
  return (
    <a
      href="#"
      className="
    group relative w-full
    overflow-hidden rounded-3xl shadow-md
    min-h-60
    transition-[height,transform] duration-300 ease-out
    hover:scale-[1.03] cursor-pointer
  "
    >
      {/* Background image (fills card) */}
      <div className="absolute inset-0">
        <Image
          src={shop.img}
          alt={shop.title}
          width={800}
          height={800}
          className="w-full h-full object-cover transition-all duration-300 ease-out will-change-transform will-change-filter group-hover:scale-105 group-hover:blur-sm"
        />
        {/* subtle dark overlay so text is readable */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Foreground text panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 bg-black/60">
        <h3 className="text-white font-semibold text-lg transition-colors duration-200 group-hover:underline">
          {shop.title}
        </h3>

        {/* Description: reveal via max-height (smooth), not line-clamp */}
        <div
          className="
            text-white text-sm mt-1 overflow-hidden
            max-h-[1.6rem]        /* ~1 line */
            group-hover:max-h-[4.8rem] /* ~3 lines */
            transition-[max-height,opacity] duration-300 ease-out
            opacity-90 group-hover:opacity-100
          "
        >
          <p className="leading-5">{shop.desc}</p>
        </div>
      </div>
    </a>
  );
}
