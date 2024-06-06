import { CheckCircle2 } from "lucide-react";
import codeImg from "../../assets/img/mockup.png";
import { checklistItems } from "../../constants";

const Workflow = () => {
    return (
        <div className="mt-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
                Resuelve matrices{" "}
                <span className="bg-primary-dark text-transparent bg-clip-text">
                    al instante.
                </span>
            </h2>
            <div className="flex flex-wrap justify-center">
                <div className="p-5 w-full lg:w-1/2 ">
                    <img src={codeImg} alt="Coding" />
                </div>
                <div className="pt-12 w-full lg:w-1/2">
                    {checklistItems.map((item, index) => (
                        <div key={index} className="flex mb-12">
                            <div className="text-white mx-6 bg-primary-dark h-10 w-10 p-2 justify-center items-center rounded-full">
                                <CheckCircle2 />
                            </div>
                            <div>
                                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                                <p className="text-md text-neutral-500">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Workflow;