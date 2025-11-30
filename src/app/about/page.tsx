import HeroSection from "@/components/layout/common/HeroSection";
import Story from "@/components/layout/About/story";
import Values from "@/components/layout/About/values";
import Mission from "@/components/layout/About/mission";
import Vision from "@/components/layout/About/vision";
import Verification from "@/components/layout/About/verification";
import KeyPillars from "@/components/layout/About/keyPillars";


export default function AboutPage() {
return (
<div className="scroll-smooth">
    <HeroSection   imgUrl="/hero.png"
            title="Our Story"
            subTitle="EcoSphere exists to make sustainable choices effortless. We carefully curate eco-friendly products you can trust—no guesswork, no greenwashing—just honest, responsible items designed to support a cleaner planet and a better future."
          />
<Story />
<Values />
<Mission />
<Vision />
<Verification />
<KeyPillars />
</div>
);
}