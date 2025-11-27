import HeroFilter from "../../utils/HeroFilter";

const Hero = () => {
  return (
    <section className="w-full md:h-[50vh] h-[100vh] flex items-center justify-center md:py-20 py-10 bg-primary-500">
        <HeroFilter/>
    </section>
  )
}

export default Hero;