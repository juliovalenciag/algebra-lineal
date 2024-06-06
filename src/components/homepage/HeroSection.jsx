import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                La mejor herramienta para
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                    {" "}
                    matrices
                </span>
            </h1>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
            Descubre la manera más rápida y eficiente de resolver matrices con nuestra página. Ideal para estudiantes, profesores, matemáticos e ingenieros.
            </p>
            <div className="flex justify-center my-10">
                <Link
                    to='/matrices'
                    className="bg-primary py-3 px-4 mx-3 rounded-md hover:bg-primary-dark text-white"
                >
                    Matrices
                </Link>
                <Link to='/espacios-vectoriales' className="py-3 px-4 mx-3 rounded-md border hover:bg-primary hover:text-white">
                    Espacios Vectoriales
                </Link>
            </div>
            <div className="flex mt-10 justify-center">

            </div>
        </div>
    );
};

export default HeroSection;