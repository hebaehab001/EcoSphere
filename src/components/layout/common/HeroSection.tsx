"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface IProps {
  imgUrl: string;
  title: string;
  subTitle: string;
}

const HeroSection = ({ imgUrl, subTitle, title }: IProps) => {
  return (
    <section className="mb-20 md:mb-28 lg:mb-10">
      <div className="relative w-full">
        <div className="relative w-full h-[450px] md:h-[520px] lg:h-[600px]">
          <Image
            src={imgUrl}
            alt="hero"
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        {/* Overlay Box: placed below the image */}
        <motion.div
          className="mt-6 mx-auto w-[80%] bg-primary/70 dark:bg-primary/50 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center text-center shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold mb-3 text-primary-foreground">
            {title}
          </h1>

          <p className="mt-2 lg:text-lg text-base text-primary-foreground/80 w-[90%] leading-relaxed">
            {subTitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
