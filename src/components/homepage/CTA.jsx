import React from 'react';
import autores from '../../assets/img/gaussyjordan.png';

const CTA = () => {
    return (
        <div className='w-full bg-background-light py-24'>
            <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 gap-8 max-w-[600px] items-center px-4 md:px-0'>
                <img src={autores} alt='gauss-jordan' className="w-[650px] mx-auto" />
                <div>
                    <h1 className='py-2 text-3xl font-semibold'>
                        ¡Prueba nuestra herramienta de matrices hoy!
                    </h1>
                    <p className='py-2 text-lg text-gray-600'>
                        Empieza a resolver matrices de manera rápida y precisa con nuestra plataforma fácil de usar. Ideal para estudiantes, profesionales e investigadores.
                    </p>
                    <button className='w-full md:w-auto my-4 px-8 py-5 rounded-md bg-primary text-white font-bold'>
                        Probar Ahora
                    </button>
                    <button className='w-full md:w-auto my-4 px-8 py-5 rounded-md bg-white text-black border-black font-bold ml-2'>
                        Guía de Uso
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CTA;
